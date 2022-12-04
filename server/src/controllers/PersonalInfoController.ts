import { Request, Response } from 'express';
import User from '../models/User';
import UserInfo from '../models/UserInfo';
import Address from '../models/Address';
import Contact from '../models/Contact';
import EmContact from '../models/EmContact';
import Legal from '../models/Legal';
import UserDocs from '../models/UserDocs';
import jwt from 'jsonwebtoken';
import WorkAuthStatus from '../models/WorkAuthStatus';


export const put_userinfo = async(req: Request, res: Response) => {
    try {
        const findUser = await User.findOne({ username: req.body.username });

        if (!findUser) {
            res.status(400).send("Cannot find user");
        }

        //use req.files.profilePic for profile pic?
        const updateData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            preferredName: req.body.preferredName,
            profilePic: req.body.profilePic,
            email: req.body.email,
            ssn: req.body.ssn,
            dob: req.body.dob,
            gender: req.body.gender
        }

        const filter = findUser?.userInfo;

        //Update UserInfo
        await UserInfo.findOneAndUpdate(filter, updateData);
    } catch (err) {
        res.status(404).send(err);
    }
}

export const get_userinfo = async (req: Request, res: Response) => {
    try {
        const token: any = req.headers.authorization;
        const verify: any = await jwt.verify(token, process.env.JWT_KEY);

        const findUser = await User.findOne({ username: verify.username });

        if (!findUser) {
            res.status(400).send("Cannot find user");
        }

        const filter = findUser?.userInfo;

        //Send User Info JSON Data
        const foundData = await UserInfo.findOne({_id: filter});

        res.status(200).send(foundData);
    } catch (err) {
        res.status(400).send(err);
    }

}

export const put_address = async(req: Request, res: Response) => {
    try {
        const findUser = await User.findOne({ username: req.body.username });

        if (!findUser) {
            res.status(400).send("Cannot find user");
        }

        const updateData = {
            bldgApt: req.body.bldgApt,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip
        }

        const filter = findUser?.address;

        //Update Address
        await Address.findOneAndUpdate(filter, updateData);

    } catch (err) {
        res.status(404).send(err);
    }
}

export const get_address = async (req: Request, res: Response) => {
    try {
        //Token will find no Cookie currently and will stop getting data
        const token: any = req.headers.authorization;
        const verify: any = await jwt.verify(token, process.env.JWT_KEY);

        const findUser = await User.findOne({ username: verify.username });

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

export const put_contact = async(req: Request, res: Response) => {
    try {
        const findUser = await User.findOne({ username: req.body.username })

        if (!findUser) {
            res.status(400).send("Cannot find user");
        }

        const updateData = {
            cellPhone: req.body.cellPhone,
            workPhone: req.body.workPhone
        }

        const filter = findUser?.contact

        await Contact.findOneAndUpdate(filter, updateData);
    } catch (err) {
        res.status(404).send(err);
    }
}

export const get_contact = async (req: Request, res: Response) => {
    try {
        const token: any = req.headers.authorization;
        const verify: any = await jwt.verify(token, process.env.JWT_KEY);

        const findUser = await User.findOne({ username: verify.username });

        if (!findUser) {
            res.status(400).send("Cannot find user");
        }

        const filter = findUser?.contact;

        //Send Contact JSON Data
        const foundData = await Contact.findOne({_id: filter});

        res.status(200).send(foundData);
    } catch (err) {
        res.status(400).send(err);
    }
}

export const put_emergency = async(req: Request, res: Response) => {
    try {
        const findUser = await User.findOne({ username: req.body.username })

        if (!findUser) {
            res.status(400).send("Cannot find user");
        }

        //TODO: Figure out how to add ARRAY of emergency data
        const updateData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            phone: req.body.phone,
            email: req.body.email,
            relationship: req.body.relationship
        }

        const filter = findUser?.emContact;

        await EmContact.findOneAndUpdate(filter, updateData);
    } catch (err) {
        res.status(400).send(err);
    }
}

export const get_emergency = async (req: Request, res: Response) => {
    try {
        const token: any = req.headers.authorization;
        const verify: any = await jwt.verify(token, process.env.JWT_KEY);

        const findUser = await User.findOne({ username: verify.username });

        if (!findUser) {
            res.status(400).send("Cannot find user");
        }

        const filter = findUser?.emContact;

        //Send Emergency JSON Data
        const foundData = await EmContact.findOne({_id: filter});

        res.status(200).send(foundData);
    } catch (err) {
        res.status(400).send(err);
    }
}

export const put_legal = async (req: Request, res: Response) => {
    try {
        const findUser = await User.findOne({ username: req.body.username });

        if (!findUser) {
            res.status(400).send("Cannot find user");
        }

        const updateData = {
            visaTitle: req.body.visaTitle,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        }

        const filter = findUser?.legal

        await Legal.findOneAndUpdate(filter, updateData);
    } catch (err) {
        res.status(404).send(err);
    }
}

export const get_legal = async (req: Request, res: Response) => {
    try {
        const token: any = req.headers.authorization;
        const verify: any = await jwt.verify(token, process.env.JWT_KEY);

        const findUser = await User.findOne({ username: verify.username });

        if (!findUser) {
            res.status(400).send("Cannot find user");
        }

        const filter = findUser?.legal;

        //Send Legal JSON Data
        const foundData = await Legal.findOne({_id: filter});

        res.status(200).send(foundData);
    } catch (err) {
        res.status(400).send(err);
    }
}

export const put_document = async (req: Request, res: Response) => {
    try {
        const findUser = await User.findOne({ username: req.body.username });

        if (!findUser) {
            res.status(400).send("Cannot find user");
        }

        const updateData = {
            driverlicense: req.body.driverlicense,
            workAuth: req.body.workAuth
        }

        const filter = findUser?.userDocs;

        //Try push instead since multiple documents?
        await UserDocs.findOneAndUpdate(filter, updateData);

    } catch (err) {
        res.status(404).send(err);
    }
}

export const get_document = async (req: Request, res: Response) => {
    try {
        const token: any = req.headers.authorization;
        const verify: any = await jwt.verify(token, process.env.JWT_KEY);

        const findUser = await User.findOne({ username: verify.username });

        if (!findUser) {
            res.status(400).send("Cannot find user");
        }

        const filter = findUser?.userDocs;

        //Send Document JSON Data
        const foundData = await UserDocs.findOne({_id: filter});

        res.status(200).send(foundData);
    } catch (err) {
        res.status(400).send(err);
    }
}



//---------
export const getAllDoc = async(req: Request, res: Response) => {
    try{
        // const users = await User.find({}).populate('userInfo').populate('legal');
        // console.log('this is user:',users)
        const status = await WorkAuthStatus.find({}).populate({path:'user', populate:{path:'userInfo'}}).populate({path:'user', populate:{path:'legal'}});
        res.send(status);
    } catch(err) {
        res.status(400).send(err);
    }
}

export const getUserDoc = async(req: Request, res: Response) => {
    try{
        const user = await User.find({ username: req.body.username}).populate('legal').populate('workAuthStatus');
        res.send(user);
    } catch(err) {
        res.status(400).send(err);
    }
}

export const put_status = async(req: Request, res: Response) => {
    const filter = {_id: req.params.uid}
    console.log(req.body)
    try{
        const user = await WorkAuthStatus.findOne({ _id: req.params.uid })
        // for (let key in user) {
        //     if (user[key] === 'pending') {
        //         console.log(req.body.move)
        //        await WorkAuthStatus.updateOne({ key: req.body.move});
        //        await user.save();
        //     }
        // }
        console.log(user)
    } catch(err) {
        res.status(400).send(err);
    }
}