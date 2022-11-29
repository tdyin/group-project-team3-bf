import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const loginCheck = async (req: Request, res: Response, next: NextFunction) => {

    const token: any = req.cookies.token;
    
    console.log('this is token=', token)
    try {
        if (!token) {
            res.redirect('/login');
        }
        const decoded: any = jwt.verify(token, process.env.JWT_KEY!);
        console.log('this is decoded',decoded)
        if(!decoded) {
            res.status(401).send({message: "You are not authorized"});
        }
        req.body.token = decoded
        next();
    } catch (err) {
        console.log(err);
    }
}

export default loginCheck;