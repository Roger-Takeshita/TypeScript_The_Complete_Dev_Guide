import { AxiosPromise, AxiosResponse } from 'axios';

type Callback = () => void;

interface ModelAttributes<T> {
    set(update: T): void;
    getAll(): T;
    get<K extends keyof T>(key: K): T[K];
}

interface HasId {
    id?: number;
}

interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}

interface Events {
    on(eventName: string, callback: Callback): void;
    trigger(eventName: string): void;
}

export class Model<T extends HasId> {
    constructor(
        private attributes: ModelAttributes<T>,
        private events: Events,
        private sync: Sync<T>
    ) {}

    on = this.events.on;

    trigger = this.events.trigger;

    get = this.attributes.get;

    set(update: T): void {
        this.attributes.set(update);
        this.events.trigger('change');
    }

    async fetch(): Promise<void> {
        const id = this.attributes.get('id');
        if (typeof id !== 'number') throw new Error('Cannot fetch without an id');
        const response: AxiosResponse = await this.sync.fetch(id);
        this.set(response.data);
    }

    async save(): Promise<void> {
        try {
            await this.sync.save(this.attributes.getAll());
            this.trigger('save');
        } catch (e) {
            this.trigger('error');
        }
    }
}
