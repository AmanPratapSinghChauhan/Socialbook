import React from 'react';
import Header from '../../Components/Header';
import Rightbar from '../../Components/Rightbar';
import Leftsidebar from '../../Components/Leftsidebar';
import Middlebar from '../../Components/Middlebar';
import './Socialhome.css';

const Socialhome = () => {
  return (
    <div className='social-home'>
       <div className='social-header'>
       <Header/>
       </div>
       <div className='social-body'>
          
          <Leftsidebar/>
         
          <Middlebar/>
    
          
          <Rightbar/>
          
         
          
          
       </div>
        
        
    </div>
  )
}

export default Socialhome;