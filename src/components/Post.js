import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import {formatISO9075} from 'date-fns'
import { UserContext } from './UserContext';

const Post = ({title,summary,cover,likedIds,createdAt,author,_id,postFilter}) => {
  const {REACT_APP_API_URL,userInfo} = useContext(UserContext);
  likedIds.some(id => id._id === userInfo.id)

  if(postFilter==="myposts" && userInfo.id)return(
     userInfo.id===author._id &&(
    <div className="post">
      <div className="image" >
      <hr/>
      <Link to={`/post/${_id}`}>
          <img alt="" src={`${REACT_APP_API_URL}`+cover} />
        </Link>
      </div>
      <div className='texts'>
        <p className="info">
          <Link className="author">{likedIds.length} likes</Link>
        </p>
        <p className="info likedinfo">
          <Link className="author">likde by {likedIds.map(username =>(`${username.username}, `))}</Link>
        </p>
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <Link className="author">{author.username}</Link>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  )
  )
  else if(postFilter==="likedposts" && userInfo.id)return(
    likedIds.some(id => id._id === userInfo.id) &&(
    <div className="post">
      <div className="image" >
        <hr/>
        <Link to={`/post/${_id}`}>
          <img alt="" src={`${REACT_APP_API_URL}`+cover} />
        </Link>
      </div>
      <div className='texts'>
        <p className="info">
          <Link className="author">{likedIds.length} likes</Link>
        </p>
        <p className="info likedinfo">
          <Link className="author">likde by {likedIds.map(username =>(`${username.username},`)) }</Link>
        </p>
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <Link className="author">{author.username}</Link>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
   </div>
 )
 )
  else return (
    <div className="post">
      <div className="image" >
        <hr/>
        <Link to={`/post/${_id}`}>
          <img alt="" src={`${REACT_APP_API_URL}`+cover} />
        </Link>
      </div>
      <div className='texts'>
        <p className="info">
          <Link className="author">{likedIds.length} likes</Link>
        </p>
        <p className="info likedinfo">
          <Link className="author">likde by {likedIds.map(username =>(`${username.username},`)) }</Link>
        </p>
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <Link className="author">{author.username}</Link>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  )
}

export default Post