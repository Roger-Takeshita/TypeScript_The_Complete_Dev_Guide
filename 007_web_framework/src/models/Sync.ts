import axios, { AxiosResponse, AxiosPromise } from 'axios';

interface HasId {
    id?: number;
}

export class Sync<T extends HasId> {
    constructor(public routeUrl: string) {}

    async fetch(id: number): AxiosPromise {
        const response: AxiosResponse = await axios.get(`${this.routeUrl}/${id}`);
        return response;
    }

    async save(data: T): AxiosPromise {
        const { id } = data;

        if (id) {
            const update: AxiosResponse = await axios.put(`${this.routeUrl}/${id}`, data);
            return update;
        } else {
            const newUser: AxiosResponse = await axios.post(`${this.routeUrl}`, data);
            return newUser;
        }
    }
}
