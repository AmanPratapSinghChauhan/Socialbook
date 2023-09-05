import express from 'express';
import {register,verify,login,logout,getMyProfile,forgetPassword,resetPassword, getAllUsers,follow} from '../Controllers/userController.js';
import singleUpload from '../middlewares/multer.js';
import { createpost, getAllPosts, like,unlike} from '../Controllers/postController.js';
import { accessChat } from '../Controllers/chatController.js';
import { sendMessage,allMessages } from '../Controllers/messageController.js';
const router =express.Router();
router.route('/register').post(singleUpload,register);
router.route('/verify').post(verify);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/loaduser').post(getMyProfile);
router.route('/forgetpassword').post(forgetPassword);
router.route('/resetpassword').put(resetPassword);
router.route('/getallusers').get(getAllUsers);
router.route('/follow').post(follow);


router.route('/createpost').post(singleUpload,createpost);
router.route('/getposts').get(getAllPosts);
router.route('/like').post(like);
router.route('/unlike').post(unlike);

// chat routes

router.route('/getchat').post(accessChat);

// message routes
router.route('/getmessage').post(allMessages);
router.route('/sendmessage').post(sendMessage);


export default router;