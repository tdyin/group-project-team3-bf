import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

//Middleware to check if JWT from e-mail has the e-mail encrypted
const verifyRegister = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: any = req.cookies.token;
        const verify: any = await jwt.verify(token, process.env.JWT_KEY!);
    
        //Redirect user to login page if no token, or if there's no e-mail in the token
        if (!token || !verify.email) {
            res.redirect('/login');
        }

        next();
    } catch (err) {
        next(err);
    }
}

export default verifyRegister;