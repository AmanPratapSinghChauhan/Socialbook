import {Chat} from '../Models/chatModel.js';
import {User} from '../Models/userModel.js';
import jwt from 'jsonwebtoken';

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected
export const accessChat = async (req, res) => {
  const tictac=req.body.finItem;
  if (!tictac){
    return res.json({status:false,msg:'Please login to access this'});

  } 

  const decoded = jwt.verify(tictac, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);
  
  const { chatId } = req.body;
  const userId=req.user._id;

  if (!chatId) {
    console.log("UserId param not sent with request");
    return res.json({success:true,msg:'User Id param not sent with request'});
  }

  var isChat = await Chat.find({
    $and:[
       {users: { $elemMatch: { $eq: userId } }} ,
      
       {users: { $elemMatch: { $eq: chatId } }} ]
    
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name image email",
  });
  
   if (isChat.length > 0) {
    var FullChat=isChat[0];
    var sender ={name:isChat[0].users[0].name,
    image:isChat[0].users[0].image,};
    var reciever={name:isChat[0].users[1].name,
      image:isChat[0].users[1].image,};
    
    res.json({success:true,FullChat,sender,reciever});
   
  } else {
    var chatData = {
      chatName: "sender",
      users: [userId, chatId],
    };

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.json({success:true,FullChat})
    } catch (error) {
      res.json({success:false,msg:error.message});
      
    }
  }
};