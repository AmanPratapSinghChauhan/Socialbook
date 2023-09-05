import React, { useState,useEffect } from 'react';
import  ReactDOM  from 'react-dom/client';
import './Message.css';
import axios from 'axios';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Header from '../../Components/Header';
import { server } from '../../store';
import Userchat from '../../Components/UserChats/Userchat';
var root='';
const handleRun=()=>{
  root=ReactDOM.createRoot(document.getElementById('chat-right'));
}

const Message = () => {
    
    const [data,setDatas]=useState([]);
    const {user,isAuthenticated}=useSelector((state)=>state.user);
    var userID='';
    var userFollowers=[];
    if(isAuthenticated){
       userID=user._id;
       userFollowers=user.followers;
    }
    


    useEffect(()=>{
        axios.get(`${server}/getallusers`).then((res)=>{
          var nluser=res.data.allusers.filter((auser)=>!auser._id.includes(userID));
          var nfuser= nluser.filter((nuser) =>userFollowers.some((follower) => nuser._id.includes(follower)));
          setDatas(nfuser);
        }).catch((error)=>{
          console.log(error);
        });
      });
      const handleChat=  (chatUser)=>{
      
        
        if(isAuthenticated){
          handleRun();
          root.render(<div><Userchat chatId={chatUser} userId={user._id}/></div>);
        }
              
      }

      const followerCreater=(data)=>{
        return(
          <div className='l-s-item' onClick={()=>handleChat(data._id)}>
          <img src={'http://localhost:4000/Images/'+data.image}/><span>{data.name}</span>
         </div>
        )
  }
  return (
    <>
        <Header/>
        <div className='for-header'>

        </div>
        <div className='chat-page'>
           <div className='chat-left'>
                {data.map(followerCreater)}
           </div>
           <div id='chat-right'>

           </div>

        </div>
    </>
  )
}

export default Message;