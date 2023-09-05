import React, { useEffect, useState } from 'react';
import './Userchat.css';
import axios from 'axios';
import { server } from '../../store';
import io from 'socket.io-client';

var socket;

const Userchat = (props) => {

  
  const ENDPOINT='http://localhost:4000';
  const [message,setMessage]=useState([]);
  const [newMessage,setNewMessage]=useState("");
  const [chats,setChats]=useState();
  const [sender,setSender]=useState();
  const [reciever,setReciever]=useState();
  const [socketConnected,setSocketConnected]=useState();
  const [typing ,setTyping]=useState(false);
  const chatId=props.chatId;
  const userAccessToken=localStorage.getItem('userAccessToken');
  const finItem=JSON.parse(userAccessToken);

  const handleGetMessages=async (chatID)=>{
    try{
      const {data}=await axios.post(`${server}/getmessage`,{
        chatID
      });
      if(data.success){
        setMessage(data.messages);
        socket.emit("join chat",chatID);
      }
      else{
  
      }
    }
    catch(error){
      console.log(error);
    }
  }


  const sendMessage=async (event)=>{
    if (newMessage&&chats) {
      const chatID=chats._id;
      socket.emit("stop typing", chatID);
      try {
        setNewMessage("");
        const { data } = await axios.post(
          `${server}/sendmessage`,
          {
            content: newMessage,
            chatID,
            finItem
          }
        );
        socket.emit("new message",data.message);
        setMessage([...message, data.message]);
      } catch (error) {
        console.log(error);
      }
    }
  }


  

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup",props.userId);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setTyping(true));
    socket.on("stop typing", () => setTyping(false));

    // eslint-disable-next-line
  }, []);


  useEffect( () => {
    socket.on("message recieved", (newMessageRecieved) => {
      if(chats){
      const chatID=chats._id;
      if ( chatID != newMessageRecieved.chat._id) {
        if (!newMessageRecieved) {
          
        }
      } else {
        setMessage([...message, newMessageRecieved]);
      }
    }
    });
  
  },[message]);



  useEffect( async ()=> {
    try{
      const {data}= await  axios.post(`${server}/getchat`,{
        chatId,finItem
  });
      if(data.success){
        setChats(data.FullChat);
        setSender(data.sender);
        setReciever(data.reciever);
        const chatID=data.FullChat._id;
        handleGetMessages(chatID);
       
      }
      else{
        
      }

    }
    catch(error){
      console.log(error);
    }
  },[]);


  const typingHandler=(e)=>{

    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      console.log('typing');
      setTyping(true);
      socket.emit("typing", chatId);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chatId);
        setTyping(false);
      }
    }, timerLength);

  }


  const handlePrevMessage=(m)=>{
    if(m){
      const datetime=m.createdAt.split("T");
      const date=datetime[0].split("-");
      const time=datetime[1].split(":");
      var hour=(Number(time[0])+5)%12;
      if(Number(time[1])>=30){
        hour=hour+1;
      }
      const minute=(Number(time[1])+30)%60;
      var timeString='';
      if(time[0]>12){
          timeString=String(hour)+":";
          if(minute<10){
            timeString=timeString+"0"+String(minute)+" pm";
          }
          else{
            timeString=timeString+String(minute)+" pm";
          }
      }
      else{
        timeString=String(hour)+":";
        if(minute<10){
          timeString=timeString+"0"+String(minute)+" am";
        }
        else{
          timeString=timeString+String(minute)+" am";
        }
      }
      
      const t=String([time[1]]);
      console.log(typeof(t));
      return(<div>
      {m.sender._id==props.userId? 
         <div className='sender-message-container'>
           <span className='s-m-message'>{m.content} </span>
           <span className='s-m-time'> {timeString}</span>
           
         </div>
         :
         <div className='reciever-message-container'>
         <span className='r-m-message'>{m.content} </span>
           <span className='r-m-time'> {timeString}</span>
         </div>
        }
      </div>)
    }
  }
 
  return (<>{!sender?"":
   <div className='chatting-body'>
   <div className='user-header'>
      <img src={'http://localhost:4000/Images/'+reciever.image}></img>
      <span>{reciever.name}</span>

   </div>

    <div className='chat-p-message'>
    {message?message.map(handlePrevMessage):''}

    </div>
   
    <div className='chat-input'>
    
    <input type='text' value={newMessage} onChange={typingHandler}/>
    
    
  
    <button type='button' onClick={sendMessage}>Send</button>
    

    </div>
        
    </div>
   

  }</>
   
  )
}

export default Userchat;