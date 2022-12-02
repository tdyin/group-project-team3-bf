import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const loginCheck = async (req: Request, res: Response, next: NextFunction) => {

    const token: any = req.headers.authorization || '';
    try {
        if (!token) {
            res.redirect('/login');
        }
        const decoded: any = await jwt.verify(token, process.env.JWT_KEY!);
        if(!decoded) {
            res.status(401).send({message: "You are not authorized"});
        }
        req.body.username = decoded.username;
        next();
    } catch (err) {
        console.log(err);
    }
}

export default loginCheck;