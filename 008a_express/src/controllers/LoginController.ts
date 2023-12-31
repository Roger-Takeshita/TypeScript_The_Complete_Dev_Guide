import { Request, Response } from 'express';
import { get, controller, bodyValidator, post } from './decorators';

@controller('/auth')
class LoginController {
    @get('/login')
    getLogin(_: Request, res: Response): void {
        res.send(`
        <form method="POST">
            <div>
               <label>Email</label>
               <input name="email" />
               <label>test@email.com</label>
            </div>
            <div>
               <label>Password</label>
               <input name="password" type="password" />
               <label>123</label>
            </div>
            <button>Submit</button>
        </form>
        `);
    }

    @post('/login')
    @bodyValidator('email', 'password')
    postLogin(req: Request, res: Response) {
        const { email, password } = req.body;

        if (email === 'test@email.com' && password === '123') {
            req.session = { loggedIn: true };
            res.redirect('/');
        } else {
            res.send('Invalid email or password');
        }
    }

    @get('/logout')
    getLogout(req: Request, res: Response) {
        req.session = undefined;
        res.redirect('/');
    }
}
