import React, { useState } from 'react';
import Header from '../../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postCreater } from '../../actions/UserActions';
import './Post.css';

const Post = () => {
    const {user}=useSelector((state)=>state.user);
    const [description,setDescription]=useState();
    const [file,setFile]=useState();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleFile=(e)=>{
        setFile(e.target.files[0]);
    }
    const handlePost=(e)=>{
        e.preventDefault();
        const formdata=new FormData;
        formdata.append('file',file);
        formdata.append('description',description);
        formdata.append('name',user.name);
        formdata.append('email',user.email);
        formdata.append('profilepic',user.image);
        dispatch(postCreater(formdata));
        navigate('/home');
    }
  return (
    <>
    <Header/>
      <div className='post-box'>
      <div className='p-b-form'>

      
      <div className='post-item'>
          <span>Create Post</span>
      </div>
      <div className='post-item'>
          <input type='file'
            onChange={handleFile}

          />
      </div>
      <div className='post-item'>
         <input type='text'
            placeholder='Description'
            onChange={(e)=>{setDescription(e.target.value)}}
            value={description}
         />

      </div>
      <div className='post-item'>
         <button type='button' onClick={handlePost}>
            Upload
         </button>
      </div>
      </div>

      </div>
    </>
    
  )
}

export default Post;