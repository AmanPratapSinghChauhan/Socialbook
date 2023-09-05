import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard';
import './Middlewar.css';

const Middlebar = () => {
  const [pics,setPics]=useState([]);
  const postCreate=(pic)=>{
    return(
      <PostCard postInfo={pic} />
    )
  }
  useEffect( ()=>{
     axios.get('http://localhost:4000/api/s1/getposts')
     .then(res => { setPics(res.data.post); })
     .catch(err => { console.log(err); });
  });
  var size=pics.length;
  var run=size>0;

  return (<>
  {!run 
  ?<div></div>
   :<div className='middle-bar'>Middlebar
  {pics.map(postCreate)}
  </div>
  }
    
</>  )
}

export default Middlebar;