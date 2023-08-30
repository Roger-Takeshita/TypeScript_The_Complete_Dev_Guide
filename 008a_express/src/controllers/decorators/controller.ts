import 'reflect-metadata';
import { Request, Response, RequestHandler, NextFunction } from 'express';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';

const bodyValidators =
    (keys: string[]): RequestHandler =>
    (req: Request, res: Response, next: NextFunction) => {
        if (!req.body) return res.status(422).send('Invalid request');

        keys.forEach((key) => {
            if (!req.body[key]) return res.status(422).send(`Missing property ${key}`);
        });

        next();
    };

export const controller = (routePrefix: string) => (target: Function) => {
    const router = AppRouter.getInstance();

    Object.getOwnPropertyNames(target.prototype).forEach((key) => {
        const routeHandler = target.prototype[key];
        const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
        const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
        const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
        const requiredBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];
        const validator = bodyValidators(requiredBodyProps);

        if (path) router[method](`${routePrefix}${path}`, ...middlewares, validator, routeHandler);
    });
};
