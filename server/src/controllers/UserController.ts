import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';

//User Registration
export const post_register = async(req : Request, res: Response) => {
    try {
        const hashPass = await bcrypt.hash(req.body.password, 10);
        const key = process.env.JWT_KEY;

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPass
        })

        //Save details to Mongo
        await user.save();

        if(!key) {
            throw new Error('Mongo Token incorrect')
        }

        //Encrypt
        const token: unknown = jwt.sign({
            username: user.username,
            email: user.email
        }, key, {expiresIn: "30m"});

        //Set Status
        res.status(200).cookie('token', token, {httpOnly: true})
    } catch (err) {
        res.status(409).send(err);
    }
}

export const get_register = async (req: Request, res: Response) => {
    const token: any = req.cookies.token;
    const verify: any = await jwt.verify(token, process.env.JWT_KEY!);

    //Open token and send Email to Register link
    res.status(200).send(verify.email);
}


export const post_login = async(req: Request, res: Response) => {
    try{
        const hashPass = await bcrypt.hash(req.body.password, 10);
        const user = await User.find({username: req.body.username, password: hashPass});

        if (user.length === 0) {
            res.status(404).send('Invalid username/password');
        } else {
            res.setHeader(
                'Set-Cookie',
                `isLoggedin=true;
                _id=${user[0]._id};
                username=${user[0].username};
                isHr=true;
                max-age=1800;
                HttpOnly
                `
            );
            // req.session.username = req.body.username;
            // req.session.user_id = user.id;
            // req.session.isLoggedIn = true;
            res.status(200).send('You are logged in')
        }
    } catch(err) {
        res.status(400).send(err);
    }
}

