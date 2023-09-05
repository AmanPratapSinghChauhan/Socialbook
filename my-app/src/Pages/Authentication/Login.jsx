import React, { useState } from 'react';
import './Authentication.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { login } from '../../actions/UserActions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast,{Toaster} from 'react-hot-toast';

const Login = () => {
    const {loading,isAuthenticated,isVarified}=useSelector((state)=>state.user);
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleEmail=(e)=>{
      setEmail(e.target.value);
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value);
    }

    const validateLoginForm = (email,password) => {
        if(email=="" && password==""){
          toast.error("Email and Password is required");
          return false;
        }
        else if(email == "") {
          toast.error("Email is required.");
          return false;
        } else if (password == "") {
          toast.error("Password is required.");
          return false;
        }
        return true;
        
      };

    const handleLogin=(e)=>{
        e.preventDefault();
        if(validateLoginForm(email,password)){
          console.log('run');
            dispatch(login(email,password));
            navigate('/');   
        }
        
    }
  return (
    <div className='authentication-box'>
    <div className='authentication-item'>
    <div className='auth-icon'>
    <i class="fa fa-user" aria-hidden='true'></i> 
    </div>
    <div className='auth-input'>
    <input className=' authentication-input' type='email'
    value={email}
    onChange={handleEmail}
    disabled={loading}
    placeholder='Email Address'
     />

    </div>
    

    </div>
    <div className='authentication-item'>
       <div className='auth-icon'>
          <i class="fa fa-lock" aria-hidden='true'></i>
       </div>
       <div>
       <input className='authentication-input' type='password'
        value={password}
        onChange={handlePassword}
        placeholder='Password'
        disabled={loading}
       />
       </div>
        

    </div>
    <div className='authentication-button'>
        <button className='login-button' type='submit' onClick={handleLogin}>Log in</button>

    </div>
    <div className='authentication'>
        <Link to={"/forgot"}className='authentication-link' > Forgotten Password</Link>
    </div>

    <div className='authentication-bottom'>
        <button className='register-button' type='submit' onClick={(e)=>{e.preventDefault();navigate('/register')}} >create new account</button>

    </div>
    <Toaster toastOptions={{duration:5000}}/>

    </div>
  )
}

export default Login;