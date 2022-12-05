import { Request, Response } from 'express';
import Status from '../models/Status';
import User from '../models/User';
import Feedback from '../models/Feedback';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import UserInfo from '../models/UserInfo';
import Address from '../models/Address';
import Contact from '../models/Contact';
import EmContact from '../models/EmContact';
import Legal from '../models/Legal';
import UserDocs from '../models/UserDocs';

export const get_hiring = async (req: Request, res: Response) => {
    try {
        //Get full list of Status Data, and display to front end
        const status = await Status.find({});
        res.status(200).send(status);
    } catch (err) {
        console.log("Error in get_hiring: ", err);
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

//Get all users regardless of stage
export const get_allusers = async (req: Request, res: Response) => {
    try {
        const users = await User.find({}).populate('userInfo').populate('legal').populate('contact');
        console.log(users);
        res.status(200).send(users);
    } catch (err) {
        console.log("get_allusers Error: ", err);
    }
}

//Get all users in pending state
export const get_pending = async (req: Request, res: Response) => {
    try {
        const users = await User.find({stage: 1});
        res.status(200).send(users);
    } catch (err) {
        console.log("get_pending HR Error: ", err);
    }
}

//Get all users in Accepted state
export const get_accepted = async (req: Request, res: Response) => {
    try {
        const users = await User.find({stage: 3});
        res.status(200).send(users);
    } catch (err) {
        console.log("get_accepted HR Error: ", err);
    }
}

//Get all users in Rejected
export const get_rejected = async (req: Request, res: Response) => {
    try {
        const users = await User.find({stage: 2});
        res.status(200).send(users);
    } catch (err) {
        console.log("get_rejected HR Error: ", err);
    }
}

export const post_feedback = async (req: Request, res: Response) => {
    try {

        console.log("Received Feedback post_feedback: " , req.body.feedback)
        console.log("User Params: " , req.params.userid)
        //Create new feedback object
        const feedback = new Feedback({
            user: req.params.userid,
            feedback: req.body.feedback
        })

        //Save feedback to Mongo
        await feedback.save();
        console.log("Feedback successfully saved to mongo");

        const update = {stage: req.body.status}

        //Update Stage of User
        await User.findOneAndUpdate({_id: req.params.userid}, update);
    } catch (err) {
        console.log("Error in post_feedback: ", err);
    }
}

export const get_feedback = async (req: Request, res: Response) => {
    try {
        const feedback = await Feedback.findOne({user: req.params.userid});
        console.log("Feedback being sent from get_feedback: " ,feedback)
        console.log("User Params get_feedback: " , req.params.userid)
        res.status(200).send(feedback);
    } catch (err) {
        console.log("Error in get_feedback: " , err);
    }
}

export const get_userdata = async (req: Request, res: Response) => {
    const user: any = req.params.userid;
    
    try {
        const findUser = await User.findOne({ _id: user });

        if(!findUser) {
            console.log("get_userdata Error: Cannot find user");
        }

        const filter = findUser?.userInfo;
        //Find user's info based on ID provided
        const foundData = await UserInfo.findOne({ _id: filter })
        res.status(200).send(foundData);
    } catch (err) {
        console.log("Error in get_userdata: ", err);
    }
}

export const get_useraddress = async (req: Request, res: Response) => {
    const user: any = req.params.userid;

    try {
        const findUser = await User.findOne({ _id: user });

        if (!findUser) {
            res.status(400).send("Cannot find user");
        }

        const filter = findUser?.address;

        //Send Address JSON Data
        const foundData = await Address.findOne({_id: filter});

        res.status(200).send(foundData);
    } catch (err) {
        console.log(err);
    }
}

export const get_usercontact = async (req: Request, res: Response) => {
    const user: any = req.params.userid;

    try {
        const findUser = await User.findOne({ _id: user });

        if (!findUser) {
            res.status(400).send("Cannot find user");
        }

        const filter = findUser?.contact;

        //Send Contact JSON Data
        const foundData = await Contact.findOne({_id: filter});

        res.status(200).send(foundData);
    } catch (err) {
        console.log(err);
    }
}

export const get_useremergency = async (req: Request, res: Response) => {
    const user: any = req.params.userid;

    try {
        const findUser = await User.findOne({ _id: user });

        if (!findUser) {
            res.status(400).send("Cannot find user");
        }

        const filter = findUser?.emContact;

        //Send Emergency Contact JSON Data
        const foundData = await EmContact.findOne({_id: filter});

        res.status(200).send(foundData);
    } catch (err) {
        console.log(err);
    }
}

export const get_userlegal = async (req: Request, res: Response) => {
    const user: any = req.params.userid;

    try {
        const findUser = await User.findOne({ _id: user });

        if (!findUser) {
            res.status(400).send("Cannot find user");
        }

        const filter = findUser?.legal;

        //Send Legal JSON Data
        const foundData = await Legal.findOne({_id: filter});

        res.status(200).send(foundData);
    } catch (err) {
        console.log(err);
    }
}

export const get_userdocument = async (req: Request, res: Response) => {
    const user: any = req.params.userid;

    try {
        const findUser = await User.findOne({ _id: user });

        if (!findUser) {
            res.status(400).send("Cannot find user");
        }

        const filter = findUser?.userDocs;

        //Send Legal JSON Data
        const foundData = await UserDocs.findOne({_id: filter});

        res.status(200).send(foundData);
    } catch (err) {
        console.log(err);
    }
}