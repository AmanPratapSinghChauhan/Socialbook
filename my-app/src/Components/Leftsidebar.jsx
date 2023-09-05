import React, { useEffect,useState } from 'react';
import './Leftsidebar.css';
import { server } from '../store';
import axios from 'axios';
import { useSelector } from 'react-redux';


const Leftsidebar = () => {
  const {user}=useSelector((state)=>state.user);
  const userID=user._id;
  const userFollowers=user.following;
  const [datas,setDatas]=useState([]);
  const followerCreater=(data)=>{
        return(
          <div className='l-s-item'>
          <img src={'http://localhost:4000/Images/'+data.image}/><span>{data.name}</span>
         </div>
        )
  }
  useEffect(()=>{
    axios.get(`${server}/getallusers`).then((res)=>{
      var nluser=res.data.allusers.filter((auser)=>!auser._id.includes(userID));
      var nfuser= nluser.filter((nuser) =>userFollowers.some((follower) => nuser._id.includes(follower)));
      setDatas(nfuser);
    });
  });
  return (
    <div className='left-sidebar'>
       <div className='l-s-heading'>
        Following
       </div>
       <div className='l-s-contacts'>
         {datas.map(followerCreater)}
       </div>

    </div>
  )
}

export default Leftsidebar;