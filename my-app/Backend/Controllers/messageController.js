import { Message } from "../Models/messageModel.js";
import { User } from "../Models/userModel.js";
import { Chat } from "../Models/chatModel.js";
import jwt  from "jsonwebtoken";

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
export const allMessages = async (req, res) => {
  try {
    const {chatID}=req.body;
    const messages = await Message.find({ chat: chatID })
    .populate("sender","name image ")
    .populate("chat");
    res.json({success:true,messages});
  } catch (error) {
    res.json({success:false,msg:error.message});
  }
};

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
export const sendMessage = async (req, res) => {
  const { content, chatID } = req.body;
  
  const tictac=req.body.finItem;
  if (!tictac){
    return res.json({status:false,msg:'Please login to access this'});

  } 

  const decoded = jwt.verify(tictac, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  if (!content || !chatID) {
    console.log("Invalid data passed into request");
    return res.json({success:false,msg:'Invalid data passed into request'});
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatID,
  };
  

  try {
    
    var message = await Message.create(newMessage)
    message=await message.populate("sender", "name image")
    message=await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name image ",
    });

    await Chat.findByIdAndUpdate(req.body.chatID,{ latestMessage: message });
    res.json({success:true,message});
  } catch (error) {
    res.json({success:false,msg:error.message});
  }
};


