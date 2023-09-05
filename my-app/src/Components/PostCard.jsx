import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { server } from '../store';
import axios from 'axios';
import './Postcard.css';


const PostCard = (props) => {
  const {user}=useSelector((state)=>state.user);
  const [data,setData]=useState(props.postInfo.likes);

    const handleLike=async (index)=>{
          var userId=user._id;
          var postId=index;
          const {data}=await axios.post(`${server}/like`,{
           userId,postId
          });
          if(data.status){
             setData(data.likes);
          }    
    }
    const handleUnlike=async (index)=>{
      var userId=user._id;
          var postId=index;
          const {data}=await axios.post(`${server}/unlike`,{
           userId,postId
          });
          if(data.status){
             setData(data.likes);
          }   

    }


    var path='http://localhost:4000/Images/'+props.postInfo.image;
    var userpath='http://localhost:4000/Images/'+props.postInfo.profilepic;
    
  return (
    <div className='p-c-container'>

    <div className='p-c-box'>
     <div className='pc-item'>
        <img className='p-c-pic' src={userpath} /><span>{props.postInfo.name}</span> 
     </div>
     <div className='pc-item'>
        <p>{props.postInfo.description}</p>

     </div>
     <div className='pc-item'>
        <img className='p-c-img' src={path}/>
     </div>
     <div className='pc-item'>
     <span className='like-button'  >
     {data.includes(user._id)
     ?
     <i class="fa fa-thumbs-down" onClick={()=>handleUnlike(props.postInfo._id)} aria-hidden="true"></i>
     :
     <i class="fa fa-thumbs-o-up" onClick={()=>handleLike(props.postInfo._id)} aria-hidden='true'></i>
     
     }
     
     
     </span>
     <span>
      {data.length}
     </span>
      
     </div>

    </div>
    </div>
  )
}

export default PostCard;