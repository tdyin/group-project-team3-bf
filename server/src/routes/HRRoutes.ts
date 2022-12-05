import { Router } from 'express';
import { post_email, get_hiring, get_userinfo, post_feedback, get_feedback,
        get_userdocument, get_useraddress, get_usercontact, get_userdata, get_useremergency, get_userlegal,
        get_accepted, get_rejected, getAllDoc, put_status
        } from '../controllers/HRController';
//Set variable to import
const hrRoutes = Router();

//Hiring Management
hrRoutes.get('/hr/hiring', get_hiring);
hrRoutes.post('/hr/hiring/confirmation', post_email);
hrRoutes.get('/hr/hiring/pending', get_userinfo);
hrRoutes.get('/hr/hiring/accepted', get_accepted);
hrRoutes.get('/hr/hiring/rejected', get_rejected);
hrRoutes.post('/hr/hiring/:userid/feedback', post_feedback);
hrRoutes.get('/hr/hiring/:userid/feedback', get_feedback);

//Get specific User Data, display to HR
hrRoutes.get('/hr/hiring/:userid/userinfo', get_userdata);
hrRoutes.get('/hr/hiring/:userid/address', get_useraddress);
hrRoutes.get('/hr/hiring/:userid/contact', get_usercontact);
hrRoutes.get('/hr/hiring/:userid/documents', get_userdocument);
hrRoutes.get('/hr/hiring/:userid/emergencycontact', get_useremergency);
hrRoutes.get('/hr/hiring/:userid/documents', get_userdocument);
hrRoutes.get('/hr/hiring/:userid/employment', get_userlegal);

//---
hrRoutes.get('/emp/info/visa', getAllDoc);
hrRoutes.put('/emp/info/visa/:uid', put_status);

export default hrRoutes;