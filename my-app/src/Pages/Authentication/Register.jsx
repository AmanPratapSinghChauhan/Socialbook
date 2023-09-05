import React,{useState} from 'react';
import { useDispatch } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import { register } from '../../actions/UserActions';
import toast,{Toaster} from 'react-hot-toast';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import Loader from '../../Components/Loader/Loader';


const Register = () => {
  const {loading}=useSelector((state)=>state.user);
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [date,setDate]=useState('');
  const [file,setFile]=useState();
  const [gender,setGender]=useState();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const registerValidation = (email,password,confirmPassword,date,file,gender) => {
    if (email === ""||password===""||confirmPassword===""||date==""||file==""||gender=="") {
      toast.error("Please enter all fields.");
      return false;
    }
    else if (password.length < 6) {
      toast.error(
        "Password should be equal or greater than 6 characters."
      );
      return false;
    } 
    else if(name.length < 4 ){
      toast.error("Name should be equal or greater than 3 characters");
      return false;
    }
    else if(name.length > 30){
      toast.error("Name should be less than 30 characters");
      return false;
    }
    

    return true;
  };

  const handleImage = (e) => {
    console.log(e.target.files);
      setFile(e.target.files[0]);
   }

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(gender);
    if(registerValidation(name,email,password,date,file,gender)){
      const formdata=new FormData();
      formdata.append("file",file);
      formdata.append('name',name);
      formdata.append('email',email);
      formdata.append('password',password);
      formdata.append('gender',gender);
      formdata.append('date',date);
      dispatch(register(formdata));
      navigate('/register');
    }
  }

 
  return(<>
    {loading?<Loader/>:
    <div className='register-background'>
      <div className='register-box'>
         <div className='register-item'>
           <h1>Socialbook</h1>
         </div>
         <div className='register-item'>
            <input className='authentication-input'
            placeholder='Name'
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            type='text'/>
         </div>
         <div className='register-item'>
           <input className='authentication-input'
           placeholder='Email'
           value={email}
           onChange={(e)=>{setEmail(e.target.value)}}
            type='email'/>
         </div>
         <div className='register-item'>
            <input className='authentication-input' 
            placeholder='Password'
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            type='password'/>
         </div>
         <div className='register-item'>
           <span>Date Of Birth:</span><input className='authentication-input'
           value={date}
           onChange={(e)=>{setDate(e.target.value)}} 
           type='date' />
         </div>
         <div className='register-item'>
         <span>Gender:</span>
          <select onChange={(e)=>{setGender(e.target.value);console.log(e.target.value);}}>
            <option >Male </option>
            <option >Female</option>
            <option >Custom</option>
          </select>
            </div>
            <div className='register-item'>
        
            <span>Profile Picture:</span><input type='file'  onChange={handleImage}/>

            </div>
         <div className='register-item'>
           <button type='button' onClick={handleSubmit}> Sign Up</button>
         </div>

      </div>
    <Toaster toastOptions={{duration:5000}}/>
    </div>
 }</> )
}

export default Register;
