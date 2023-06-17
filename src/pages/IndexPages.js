import React, { useEffect, useState ,useContext} from 'react'
import Post from '../components/Post'
import { UserContext } from '../components/UserContext';
import { Link } from 'react-router-dom';


const IndexPages = () => {
  const {REACT_APP_API_URL} = useContext(UserContext);
  const [posts,setPosts] = useState([]);
  const [postFilter,setPostFilter] = useState('allPosts');
  useEffect(()=>{
    fetch(`${REACT_APP_API_URL}post`).then(response =>{
      response.json().then(posts =>{
        setPosts(posts);
        console.log(posts);
      })
    })
  },[REACT_APP_API_URL,setPosts]);
  function allposts(e){
    e.preventDefault();
    setPostFilter('allposts')
  };
  function myposts(e){
    e.preventDefault();
    setPostFilter('myposts')
  };
  function likedposts(e){
    e.preventDefault();
    setPostFilter('likedposts')
  };

  return (
    <>
    <div className='filter-page'>
      <div className='filter-post'>
        <Link  onClick={allposts}>all post</Link>
      </div>
      <div className='filter-post'>
        <Link onClick={myposts}>my post</Link>
      </div>
      <div className='filter-post'>
        <Link onClick={likedposts}>liked post</Link>
      </div>
      
      
    </div>
    {posts.length > 0 && posts.map(post =>(
        <Post key={post._id} {...post} postFilter={postFilter} setPostFilter={setPostFilter} />
      ))}
    </>
  )
}

export default IndexPages