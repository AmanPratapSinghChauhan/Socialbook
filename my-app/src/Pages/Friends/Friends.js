import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';
import { server } from '../../store';
import axios from 'axios';
import './Friends.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { follow } from '../../actions/UserActions';
import { useNavigate } from 'react-router-dom';

const Friends = () => {
    const {user}=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userID=user._id;
    const userFollowers=user.following;

    const handleFollow=async (friendId)=>{
        console.log(friendId);
         dispatch(follow(friendId,userID));
         navigate('/friends');
    }
    const friendBox=(friend)=>{
        return (
        <div className='fb-container'>
        <div className='fb-item'>
           <img src={'http://localhost:4000/Images/'+friend.image}/><span>{friend.name}</span>
        </div>
        <div className='fb-item'>
           <button type='button' onClick={()=>handleFollow(friend._id)}>Follow</button>
        </div>

        </div>
      

        )
    }
    const [friends,setFriends]=useState([]);
    useEffect(()=>{
       
       axios.get(`${server}/getallusers`).then(
            (res)=>{
                if(res.data.status){
                    var nluser=res.data.allusers.filter((auser)=>!auser._id.includes(userID));
                   var nfuser= nluser.filter((nuser) =>!userFollowers.some((follower) => nuser._id.includes(follower)));
                   console.log(nfuser);
                    setFriends(nfuser);
                }
                
            }
        ).catch((error)=>{
              console.log(error);
        })
    },[]);
    
  return (
    <>
        <Header/>
        <div className='friend-container'>
        <div className='friend-box'>
            {friends.map(friendBox)}
            </div>
        </div>
    </>
  )
}

export default Friends;