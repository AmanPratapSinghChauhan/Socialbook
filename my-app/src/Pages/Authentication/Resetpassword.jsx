import React, { useState } from 'react'
import './Authentication.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '../../actions/UserActions';

const Resetpassword = () => {
    const [password,setPassword]=useState('');
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleReset=(e)=>{
        e.preventDefault();
        dispatch(resetPassword());
        navigate('/resetpassword');
    }
  return (
    <div className='social-auth-container'>
      <div className='social-auth-box'>
        <div className='social-auth-item'>
           <h1>Socialbook</h1>
        </div>
        <div className='social-auth-item'>
           <p>Reset Password</p>
        </div>
        <div className='social-auth-item'>
           <input type='password'
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
           />
        </div>
        <div className='social-auth-item'>
          
          <button type='button'
          onClick={handleReset}
          >Submit</button>
          
          
        </div>

      </div>

    </div>
  )
}


export default Resetpassword;