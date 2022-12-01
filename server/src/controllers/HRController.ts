import { Request, Response } from 'express';
import Status from '../models/Status';
import User from '../models/User';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export const get_hiring = async (req: Request, res: Response) => {
    try {
        //Get full list of Status Data, and display to front end
        await Status.find({}, (err: unknown, users: any ) => {
            res.status(200).send(users);
        })
    } catch (err) {
        res.status(409).send(err);
    }
}

export const post_email = async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const name: string = req.body.name;
    let status: boolean = false;

    //Create JWT Token that lasts 3 hrs
    const token = jwt.sign({
        email: email,
        name: name
    }, process.env.JWT_KEY, {expiresIn: '3h'});

    //Check if E-mail exists in User Schema; If not, then status is false, otherwise true
    const user: any = await User.findOne({email: email});

    if(user) {
        status = true;
    }

    //Save User to Status Schema; Used to determine if user is registered or not
    const statusData = new Status ({
        email: email,
        name: name,
        status: status,
        token: token
    })

    //Save Status Data
    await statusData.save();

    //Login to E-mail
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASS
        }
    });

    
    const mailConfig = {
        from: 'beaconfire.team3@gmail.com',
        to: `${email}`,
        subject: 'Register an Account to begin Onboarding',
        text: 
                `Hello ${name},\n\n` +
                `You are receiving this e-mail as an invitation to register with our company\n` + 
                `Please click http://localhost:3000/register/${token} \n` +
                `to begin your application process.`
            
    }

    transport.sendMail(mailConfig, (err: any, info: any) => {
        if (err) { 
            console.error("An error has occurred when sending e-mail: ", err);
        }
        else {
            console.log("E-mail successfully sent: ", info);
            res.status(200).send(token);
        }
    })
}