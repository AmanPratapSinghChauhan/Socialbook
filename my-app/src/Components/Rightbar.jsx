import React from 'react';
import './Rightbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/UserActions';


const Rightbar = () => {
    const {user}=useSelector((state)=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    console.log(user.image);
    const handleLogout=(e)=>{
           e.preventDefault();
           dispatch(logout());
           navigate('/')
    }
    const imgpath='http://localhost:4000/Images/'+user.image;
  return (
    <div className='right-bar'>
        <div className='r-b-user'>
            <img src={imgpath}/><span> Aman Thakur</span> 
        </div>
        <div className='r-b-options'>
           <div className='r-b-item'>
              <span>Setting</span>
           </div>
           <div className='r-b-item'> 
              <span onClick={handleLogout}>Logout</span>
           </div>

        </div>
    </div>
  )
}

export default Rightbar