import React, { useEffect, useState } from 'react';
import './Profile.css';
import PostCard from '../../Components/PostCard';
import { useSelector } from 'react-redux';
import Header from '../../Components/Header';
import { server } from '../../store';
import axios from 'axios';

const Profile = () => {
    const { user } = useSelector((state) => state.user);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get(`${server}/getposts`).then(
            (res) => {
                const pics = res.data.post;
                const myPosts = user.posts;
                const posts = pics.filter((post) =>
                    myPosts.some((myPost) => post._id.includes(myPost)));
                setPosts(posts);

            }
        ).catch((error) => {
            console.log(error);
        })
    })
    const size = posts.length;
    const run = size > 0;
    if(user){
        var path='http://localhost:4000/Images/'+user.image;
    }
    
    const createPost = (post) => {
        return (
            <PostCard postInfo={post} />
        )
    }

    return (
        <>
           <Header /> 
           
            {!user ? '' :

                

                <div className='profile-container'>
                    <div className='profile-box'>
                        <div className='user-info'>
                           <div className='user-item'>
                               <img className='p-user-pic' src={path}/>
                           </div>
                           <div className='user-item'>
                               <span>{user.name}</span>
                           </div>

                        </div>
                        <div className='user-followers'>

                        </div>

                        <div className='user-posts'>
                            {posts.map(createPost)}
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default Profile;