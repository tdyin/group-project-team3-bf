import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Status from '../models/Status';
import { createDefaultDocs } from '../utils/dbUtils';


//User Registration
export const post_register = async(req : Request, res: Response) => {
    try {
        const hashPass = await bcrypt.hash(req.body.password, 10);
        const key = process.env.JWT_KEY;

        const docIds = await createDefaultDocs()

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPass,
            address: docIds.addressId,
            car: docIds.carId,
            contact: docIds.contactId,
            emContact: [docIds.emContactId],
            legal: docIds.legalId,
            referInfo: docIds.referInfoId,
            userDocs: docIds.userDocsId,
            userInfo: docIds.userInfoId
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

        const update = {status: true}
        //Update Status Model to show that user has registered
        await Status.findOneAndUpdate({email: req.body.email}, update)

        //Set Status
        res.status(200).cookie('token', token, {httpOnly: true})
    } catch (err) {
        res.status(409).send(err);
    }
}

export const get_register = async (req: Request, res: Response) => {
    const {token}: any = req.params;
    console.log(token);
    const verify: any = await jwt.verify(token, process.env.JWT_KEY);

    //Open token and send Email to Register link if E-mail exists
    if(verify.email) {
        res.redirect('/register')
    }
    
    res.status(403).send("403 Forbidden");
}



export const post_login = async(req: Request, res: Response) => {

    try{
        const user = await User.find({username: req.body.username});
        if (user.length === 0) {
            res.status(404).send(`${req.body.username} is not exist`);
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, data) => {
                if (err) {
                    throw err
                }
                if (data) {
                    // console.log('this is user',user[0], user[0].username)
                    console.log(process.env.JWT_KEY);
                    const key: any = process.env.JWT_KEY;
                    const token: any = jwt.sign({
                        id: user[0]._id,
                        username: user[0].username,
                    }, key, {expiresIn: '5m'});
                    console.log(token)
                    res.cookie('token', token, {httpOnly: true});
                    // console.log('this is cookies',req.cookies)
                    res.send('you are loggined successfully');
                } else {
                    res.status(401).send('Invalid password')
                }
            })
        }
    } catch(err) {
        res.status(400).send(err);
    }
}

export const put_logout = async(req: Request, res: Response) => {
  const authHeader: any = req.headers["authorization"];
  jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
  if (logout) {
        res.send({msg : 'You have been Logged Out' });
    } else {
        res.send({msg:'Error'});
    }
  });

}



