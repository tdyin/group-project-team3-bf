import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { nextTick } from 'process';

interface Token extends Request {
    token: string | jwt.JwtPayload
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: any = req.cookies.token;

        //Redirect user to login page if no token
        if (!token) {
            res.redirect('/login');
        }

        if(!process.env.JWT_KEY) {
            console.log("No JWT Key found!")
        }

        //Verify token
        const verify: any = await jwt.verify(token, process.env.JWT_KEY!);

        if(!verify) {
            res.status(401).send({message: "401 Forbidden. You are not authorized to view this link"});
        }

        (req as Token).token = verify;
        next();
    } catch (err) {
        next(err);
    }
}

export default verifyToken;