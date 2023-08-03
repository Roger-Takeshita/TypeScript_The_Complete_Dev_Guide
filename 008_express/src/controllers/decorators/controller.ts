import 'reflect-metadata';
import { AppRouter } from '../../AppRouter';
import { Methods } from './Methods';
import { MetadataKeys } from './MetadataKeys';
import { Request, Response, NextFunction, RequestHandler } from 'express';

function bodyValidators(keys: string[]): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
        if (!req.body) {
            return res.status(422).send('Invalid Request');
        }

        for (const key of keys) {
            if (!req.body[key]) {
                return res.status(422).send(`Missing property ${key}`);
            }
        }

        next();
    };
}

export function controller(routePrefix: string) {
    return function (target: Function) {
        const router = AppRouter.getInstance();

        Object.getOwnPropertyNames(target.prototype).forEach((key) => {
            const routeHandler = target.prototype[key];
            const path = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
            const method: Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];
            const requireBodyProps = Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) || [];
            const validator = bodyValidators(requireBodyProps);

            if (path) router[method](`${routePrefix}/${path}`, ...middlewares, validator, routeHandler);
        });
    };
}
