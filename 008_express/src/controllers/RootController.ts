import { Request, Response, NextFunction } from 'express';
import { get, controller, use } from './decorators';

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (req.session?.loggedIn) return next();

    res.status(403).send('Not permitted');
};

@controller('')
class RootController {
    @get('/')
    getRoot(req: Request, res: Response) {
        if (req.session?.loggedIn) {
            res.send(`
            <div>
                <div>You are logged in</div>
                <a href="/logout">Logout</a>
            </div>
        `);
        } else {
            res.send(`
            <div>
                <div>You are not logged in</div>
                <a href="/login">Login</a>
            </div>
        `);
        }
    }

    @get('/protected')
    @use(requireAuth)
    getProtected(req: Request, res: Response) {
        res.send('Welcome to protected route');
    }
}
