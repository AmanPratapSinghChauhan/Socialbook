import React from 'react';
import './Home.css';
import Login from '../Authentication/Login';

export const Home = () => {
  return (
    <div className='home-background'>
    <div className='home-page'>
     <div className='about-home'>
        <div className='about-heading'>
            Socialbook
        </div>
        <div className='about-content'>
        Socialbook helps you connect and share<br/> with the people in your life

        </div>
     </div>
     <div className='login-page'>
         <Login/>
     </div>

    </div>
   </div>
  )
}
export default Home;