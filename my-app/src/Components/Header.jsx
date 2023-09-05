import React from 'react';
import './Header.css';
import { NavLink,Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
    const {user,loading}=useSelector((state)=>state.user);
    if(user){
        var image=user.image;
    }
   
    return (<>
        {loading?'':
        <div className='header-box'>
            <div className='header-left'>
                <p> S</p>
                <div className='search'>
                    <i class="fa fa-search" aria-hidden="true"></i>
                    <input type='search' placeholder='Search Socialbook' />
                </div>




            </div>
            <div className='header-middle'>
                <div className='mid-item'>
                   <NavLink to={'/home'} className='nav-link'><i class="fa fa-home" aria-hidden="true"></i></NavLink>
                </div>
                <div className='mid-item'>
                <NavLink to={'/friends'} className='nav-link'><i class="fa fa-user" aria-hidden="true"></i></NavLink>
                </div>
                <div className='mid-item'>
                <NavLink to={'/messaging'} className='nav-link'><i class="fa fa-comments" aria-hidden="true"></i></NavLink>
                </div>
                <div className='mid-item'>
                <NavLink to={'/dlfj'} className='nav-link'><i class="fa fa-bell" aria-hidden="true"></i></NavLink>
                </div>
                <div className='mid-item'>
                <NavLink to={'/post'} className='nav-link'><i class="fa fa-images" aria-hidden='true'></i></NavLink>
                </div>
            </div>
            <div className='header-right'>
               <div className='user-img'>
               <Link to={'/profile'} ><img src={'http://localhost:4000/Images/'+image}/></Link>
               </div>
               
            </div>

        </div>
    }
    </>
    )
}

export default Header;