import { Post } from "../Models/usersPost.js";
import {User} from '../Models/userModel.js';
export const createpost= async (req,res,next)=>{
    try{
        const image=req.file.filename;
        const {description,name,email,profilepic}=req.body;
        console.log(image,description,name,email,profilepic);
        const post=await Post.create({
            image,
            name,
            email,
            description,
            profilepic,
        });
        let user;
        await User.findOneAndUpdate(
            { email: email },
            { $push: {posts:post._id} },
            { returnOriginal: false }
          )
            .then((value) => {
              user=value;
            })
            .catch((error) => {
              console.log(error);
            });
        
        return res.json({status:true,user,msg:'Post created successfully'});
    }
    catch(error){
        res.json({status:false,msg:error.message});
    }
}


export const getAllPosts=async (req,res,next)=>{
    try{
        const post=await Post.find();
        res.json({status:true,post});

    }
    catch(error){
        res.json({status:false,msg:error.message});
    }
}

export const like= async (req,res,next)=>{
try{
    await Post.findByIdAndUpdate(req.body.postId,{
       $push:{likes:req.body.userId}, 
    },{
        new:true,
    }
    ).then((value)=>{
        var likes=value.likes;
        res.json({status:true,likes});
    }).catch((error)=>{
        res.json({status:false,msg:error.message});
    })

}
catch(error){
    res.json({status:false,msg:error.message});
}
}

export const unlike= async (req,res,next)=>{
    try{
        await Post.findByIdAndUpdate(req.body.postId,{
           $pull:{likes:req.body.userId}, 
        },{
            new:true,
        }
        ).then((value)=>{
            var likes=value.likes;
            res.json({status:true,likes});
        }).catch((error)=>{
            res.json({status:false,msg:error.message});
        })
    
    }
    catch(error){
        res.json({status:false,msg:error.message});
    }
    }