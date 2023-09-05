
import {User} from '../Models/userModel.js';
import { Post } from '../Models/usersPost.js';
import  {sendEmail}  from '../utils/sendEmail.js';
import { sendToken } from '../utils/sendTokens.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
dotenv.config({path:'./Config/config.env'});

export const register= async(req,res,next)=>{
    try{
        const name=req.body.name;
        const email=req.body.email;
        const password=req.body.password;
        const dob=req.body.date;
        const gender=req.body.gender;
        console.log(gender);
        const image=req.file.filename;
        let user=await User.findOne({email});
        if(user){
          return res.json({msg:'User already exist', status:false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const otp =Math.floor(Math.random()*1000000);
      console.log('suuccess-2');
         user = await User.create({
            name,
            email,
            password:hashedPassword,
            image,
            dob,
            gender,
            otp,
            otp_expiry:new Date(Date.now()+process.env.OTP_EXPIRE*60*1000),
        });
        

    console.log('success-1');    
          

  const message = `Verify Your Account Your OTP is ${otp}`;

    await sendEmail({
      email: user.email,
      subject: `Typo Verification Email`,
      message,
    });
    const token = user.getJWTToken();
     console.log('success1');
    res.json({
      status: true,
      msg:`OTP sent to ${user.email} successfully, Valid for 5 minutes.`,
      user,
      token,
    });
    console.log('success');
   
   

    }
    catch(error){
        console.log('e');
        return res.json({msg:error.message,status:false});
    }
};

export const verify= async (req,res,next)=>{
      const {otp}=req.body;
      const tictac=req.body.finItem;
  
    try{
      if (!tictac){
        return res.json({status:false,msg:'Please login to access this'});
    
      } 
      const decoded = jwt.verify(tictac, process.env.JWT_SECRET);
      req.user = await User.findById(decoded._id);
       
    const user = await User.findById(req.user._id).select("+otp");
    if (!user){
      return res.json({msg:"User not found in database", status:false});
    } 

    if (user.otp != otp || user.otp_expiry < Date.now()) {
      return res.json({ status: false, msg: "Invalid OTP or has been Expired" });
    }

    user.verified = true;
    user.otp = null;
    user.otp_expiry = null;

    await user.save();

    sendToken(res, user, `Successfully Verified , Welcome ${user.name}`);
  } catch (error) {
    res.json({ status: false, msg: error.message });
  }
};

export const login= async(req,res,next)=>{
    const {email,password}=req.body;

      try{
        console.log(email);
        const user=await  User.findOne({email});
        if(!user){
          console.log(user);
          return res.json({status:false,msg:'Incorrect Email or Password'});
        }
       bcrypt.compare(password,user.password).then((isPasswordValid)=>{
        if(!isPasswordValid){
          return res.json({ msg: "Incorrect Password", status: false });
        }
        else{
          
          sendToken(res, user, `Welcome back, ${user.name}`);
        }         
      })
    .catch(error=>{
      
      res.json({status:false,msg:error.message});
});
      }
      catch(error){
        res.json({ status: false, msg: error.message });
      }
      
    
};

export const logout = async (req, res, next) => {
  res.json({
      status: true,
      msg: "Logged Out Successfully ",
    });
};

export const getMyProfile=async (req,res,next)=>{

  const tictac=req.body.finItem;
  if (!tictac){
    return res.json({status:false,msg:'Please login to access this'});

  } 

  const decoded = jwt.verify(tictac, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  const user = await User.findById(req.user._id);
  try{
    // const post = await Post.find();

  res.json({
    status: true,
    user,
    msg:`Welcome Back ${user.name}`,
  });
}
catch(error){
  res.json({status:false,msg:error.message});
}



  
    

    
};
export const forgetPassword=async (req,res,next)=>{
  try{
    const {email}=req.body;

    const user=await User.findOne({email});
    if(!user){
      return res.json({status:false,msg:'user not found'});
    }
    const resetToken= await user.getResetToken();
    await user.save();

    const resetPasswordUrl = `http://localhost:3000/resetpassword/${resetToken}`;
    
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
    try{
    await sendEmail({
      email:email,
      subject:'Tic Tac Toe Recovery email',
      message,
    })

        res.json({
            status: true,
            msg: `Email sent to ${user.email} successfully`,
          });
        } catch (error) {
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;
      
          await user.save({ validateBeforeSave: false });
      
          return res.json({status:false,msg:error.message});
        }

  }
  catch(error){
    console.log(error);
  }
    

};
export const resetPassword=async (req,res,next)=>{
  const {token} =req.params;   
  const {password}=req.body;

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });
   if(!user){
    res.json({status:false,msg:'Token is invalid or has been expired'})
   }
  const hashedPassword = await bcrypt.hash(password, 10);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.json({
    status: true,
    msg: "Password Changed Successfully",
  });
};

export const getAllUsers= async (req,res,next)=>{
  try{
      let allusers=await User.find();

      return res.json({status:true,allusers});
  }
  catch(error){
    res.json({status:false,msg:error.message});
  }
}

export const follow= async (req,res,next)=>{
  try{
    console.log(req.body.friendId)
    await User.findByIdAndUpdate(req.body.friendId,{
      $push:{followers:req.body.userID},
    },
    {new:true},
    );

    await User.findByIdAndUpdate(req.body.userID,{
     $push:{following:req.body.friendId}, 
    },{
      new:true,
    });
    

    

  }
  catch(error){
    res.json({status:false,msg:error.message});
  }
}

// export const forgetPassword = catchAsyncError(async (req, res, next) => {
//   const { email } = req.body;

//   const user = await User.findOne({ email });

//   if (!user) return res.json({status:false,msg:'User not found'});

//   const resetToken = await user.getResetToken();

//   await user.save();

//   // const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

//   // const message = `Click on the link to reset your password. ${url}. If you have not request then please ignore.`;

//   const resetPasswordUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

//   // const resetPasswordUrl = `${req.protocol}://${req.get(
//   //   "host"
//   // )}/resetpassword/${resetToken}`;

//   const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

//   // Send token via email

//   try {
//     await sendEmail({
//       email: user.email,
//       subject: `Tic Tac Toe Password recovery`,
//       message,
//     });

//     res.status(200).json({
//       success: true,
//       message: `Email sent to ${user.email} successfully`,
//     });
//   } catch (error) {
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save({ validateBeforeSave: false });

//     return next(new ErrorHandler(error.message, 500));
//   }

//   // await sendEmail(user.email, "CourseBundler Reset Password", message);

//   // res.status(200).json({
//   //   success: true,
//   //   message: `Reset Token has been sent to ${user.email}`,
//   // });
// });

// export const resetPassword = catchAsyncError(async (req, res, next) => {
//   const { token } = req.params;

//   const resetPasswordToken = crypto
//     .createHash("sha256")
//     .update(token)
//     .digest("hex");

//   const user = await User.findOne({
//     resetPasswordToken,
//     resetPasswordExpire: {
//       $gt: Date.now(),
//     },
//   });

//   if (!user)
//     return next(new ErrorHandler("Token is invalid or has been expired", 401));

//   user.password = req.body.password;
//   user.resetPasswordToken = undefined;
//   user.resetPasswordExpire = undefined;

//   await user.save();

//   res.status(200).json({
//     success: true,
//     message: "Password Changed Successfully",
//   });
// });


