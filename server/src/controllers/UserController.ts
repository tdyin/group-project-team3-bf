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