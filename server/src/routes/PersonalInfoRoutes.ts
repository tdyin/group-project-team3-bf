import { Router, Request, Response } from 'express';
import { put_userinfo, put_address, put_contact, put_document, put_emergency, put_legal,
        get_address, get_contact, get_document, get_emergency, get_legal, get_userinfo, getUserDoc, 
    } from '../controllers/PersonalInfoController';
import verifyToken from '../middleware/auth';
import loginCheck from '../middleware/loginCheck';


//Set variable to import
const personalRoutes = Router();

//Update UserInfo
personalRoutes.put('/emp/info/userinfo', put_userinfo);
personalRoutes.put('/emp/info/address', put_address);
personalRoutes.put('/emp/info/contact', put_contact);
personalRoutes.put('/emp/info/document', put_document);
personalRoutes.put('/emp/info/emergency', put_emergency);
personalRoutes.put('/emp/info/legal', put_legal);

//Send data to routes
personalRoutes.get('/emp/info/userinfo', get_userinfo);
personalRoutes.get('/emp/info/address', get_address);
personalRoutes.get('/emp/info/contact', get_contact);
personalRoutes.get('/emp/info/document', get_document);
personalRoutes.get('/emp/info/emergency', get_emergency);
personalRoutes.get('/emp/info/legal', get_legal);

//adjust later
personalRoutes.get('/emp/info/docStatus', loginCheck, getUserDoc);



export default personalRoutes;