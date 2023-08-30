import { Request, Response, RequestHandler } from 'express';
import { get, controller, use } from './decorators';

const delay = (ms: number = 1): Promise<number> => {
    return new Promise((resolve) => setTimeout((res) => res(ms), ms, resolve));
};

const checkPermissions = (access: string[]): RequestHandler => {
    return async (req, res, next) => {
        try {
            const { auth = '' } = req.params;

            if (access.includes(auth) && req.session && req.session.loggedIn) {
                await delay(500);
                return next();
            }

            res.send(`
                <div>
                    Unauthorized
                    <ul>
                        <li><a href="/">Back</a></li>
                    </ul>
                </div>
            `);
        } catch (e: any) {
            throw e;
        }
    };
};

@controller('')
class RootController {
    @get('/')
    getRoot(req: Request, res: Response) {
        if (req.session && req.session.loggedIn) {
            res.send(`
            <div>
                <div>You are logged in</div>
                <ul>
                    <li><a href="/protected/ADMIN">/protected/ADMIN</a></li>
                    <li><a href="/protected/NORMAL_USER">/protected/NORMAL_USER</a></li>
                </ul>
                <ul>
                    <li><a href="/auth/logout">Logout</a></li>
                </ul>
            </div>
          `);
        } else {
            res.send(`
            <div>
                <div>You are not logged in</div>
                <ul>
                    <li><a href="/protected/ADMIN">/protected/ADMIN</a></li>
                    <li><a href="/protected/NORMAL_USER">/protected/NORMAL_USER</a></li>
                </ul>
                <ul>
                    <li><a href="/auth/login">Login</a></li>
                </ul>
            </div>
            `);
        }
    }

    @get('/protected/:auth')
    @use(checkPermissions(['ADMIN']))
    getProtected(_: Request, res: Response) {
        const date = new Date().toString();
        res.send(`
            <div>
                Welcome to protected route, logged in user - ${date}
            </div>
            <ul>
                <li><a href="/">Back</a></li>
            </ul>
        `);
    }
}
