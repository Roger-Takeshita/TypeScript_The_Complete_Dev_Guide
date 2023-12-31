import { Request, Response, NextFunction } from 'express';
import { get, post, controller, use, bodyValidator } from './decorators';

function logger(req: Request, res: Response, next: NextFunction) {
    console.log('Request was made');
    next();
}

@controller('/auth')
class LoginController {
    @get('/login')
    @use(logger)
    getLogin(req: Request, res: Response): void {
        res.send(`
        <form method="POST">
            <div>
                <label>Email</label>
                <input name="email"/>
            </div>
            <div>
                <label>Password</label>
                <input name="password" type="password"/>
            </div>
            <button>Submit</button>
        </form>
    `);
    }

    @post('/login')
    @use(logger)
    @bodyValidator('email', 'password')
    postLogin(req: Request, res: Response) {
        const { email, password } = req.body;

        if (email === 'fake@email.com' && password === '123') {
            req.session = { loggedIn: true };
            res.redirect('/');
        } else {
            res.send('Invalid email or password');
        }
    }

    @get('/logout')
    @use(logger)
    getLogout(req: Request, res: Response) {
        req.session = undefined;
        res.redirect('/');
    }
}
