import { Router, Request, Response } from 'express';
import { put_userinfo, put_address, put_contact, put_document, put_emergency, put_legal } from '../controllers/PersonalInfoController';

//Set variable to import
const personalRoutes = Router();

//Update UserInfo
personalRoutes.put('/emp/info/userinfo', put_userinfo);
personalRoutes.put('/emp/info/address', put_address);
personalRoutes.put('/emp/info/contact', put_contact);
personalRoutes.put('/emp/info/document', put_document);
personalRoutes.put('/emp/info/emergency', put_emergency);
personalRoutes.put('/emp/info/legal', put_legal);

export default personalRoutes;