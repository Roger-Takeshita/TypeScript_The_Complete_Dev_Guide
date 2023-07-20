import axios, { AxiosResponse } from 'axios';

const userRoute = 'http://localhost:3000/users';

interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

type Callback = () => void;

export class User {
    events: { [key: string]: Callback[] } = {};

    constructor(private data: UserProps) {}

    get(propName: string): number | string {
        return this.data[propName];
    }

    set(update: UserProps): void {
        Object.assign(this.data, update);
    }

    on(eventName: string, callback: Callback): void {
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }

    trigger(eventName: string): void {
        const handlers = this.events[eventName];

        if (!handlers || !handlers.length) return;

        handlers.forEach((handler) => {
            handler();
        });
    }

    async fetch(): Promise<void> {
        const response: AxiosResponse = await axios.get(`${userRoute}/${this.get('id')}`);
        this.set(response.data);
    }

    async save(): Promise<void> {
        const id = this.get('id');
        if (id) {
            const update: AxiosResponse = await axios.put(`${userRoute}/${id}`, this.data);
            this.set(update.data);
        } else {
            const newUser: AxiosResponse = await axios.post(`${userRoute}`, this.data);
            this.set(newUser.data);
        }
    }
}
