import React, { useState,useEffect,useContext } from 'react'
import { Link, useParams ,Navigate} from 'react-router-dom'
import 'react-quill/dist/quill.snow.css';
import {formatISO9075} from 'date-fns'
import { UserContext } from '../components/UserContext';
 



const PostPage = () => {
    const [postInfo,setPostInfo] = useState(null);
    const [likeInfo,setLikeInfo] = useState(false);
    const [likeNumber,setLikeNumber] = useState('0');
    const {userInfo,REACT_APP_API_URL} = useContext(UserContext);
    const [redirect,setRedirect]=useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const {id} = useParams();

    const fetchData = async () => {
      try {
        const response = await fetch(`${REACT_APP_API_URL}post/${id}`);
        if (response.ok) {
          const postInfo = await response.json();
          setPostInfo(postInfo);
          console.log(postInfo);
          setComments(postInfo?.comments);
          if (postInfo?.likedIds?.some((id) => id._id === userInfo.id)) {
            setLikeInfo(true);
            setLikeNumber(postInfo.likedIds.length);
            
          } else {
            setLikeInfo(false);
            setLikeNumber(postInfo?.likedIds?.length);
          }
        } else {
          console.error('Failed to fetch post:', response.status);
        }
      } catch (error) {
        console.error('Error while fetching post:', error);
      }
    };
    useEffect(() => {
        fetchData();
      }, []);
      
    async function liked(e) {
        const response = await fetch(`${REACT_APP_API_URL}post/${id}/like`, {
          method: 'POST',
          credentials: 'include',
          withCredentials: true,
          mode: 'cors',
        });
        setLikeInfo(true);
        fetchData();
        if (response.status === 401){
            alert(`please login` );
            setRedirect(true);
            
        }
      }
      async function unliked(e) {
        const response = await fetch(`${REACT_APP_API_URL}post/${id}/unlike`, {
          method: 'DELETE',
          credentials: 'include',
          withCredentials: true,
          mode: 'cors',
        });
        setLikeInfo(false);
        fetchData();
        
      }
      const submitComment = async () => {
        try {
          const response = await fetch(`${REACT_APP_API_URL}post/${id}/comment`, {
            method: 'POST',
            credentials: 'include',
            withCredentials: true,
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: newComment }),
          });
          if (response.ok) {
            const comment = await response.json();
            setComments([...comments, comment]);
            setNewComment('');
            fetchData();
          }
          else if (response.status === 401){
            alert(`please login` );
            setRedirect(true);
        } else {
            console.error('Failed to submit comment:', response.status);
          }
        } catch (error) {
          console.error('Error while submitting comment:', error);
        }
      };
         
      const deleteComment = async (commentId) => {
        try {
          const response = await fetch(`${REACT_APP_API_URL}post/${id}/comment/${commentId}`, {
            method: 'DELETE',
            credentials: 'include',
            withCredentials: true,
            mode: 'cors',
          });
      
          if (response.ok) {
            setComments(comments.filter(comment => comment._id !== commentId));
          } else if (response.statusText === 'Unauthorized') {
            alert('Please login');
            setRedirect(true);
          } else {
            console.error('Failed to delete comment:', response.status);
          }
        } catch (error) {
          console.error('Error while deleting comment:', error);
        }
      };

if(redirect){
    return <Navigate to={'/login'}/>
  }


  if (!postInfo) return '';  
  return (
    <div className='post-page'>
        <h1 className='title'>{postInfo.title}</h1>
        <p className='time'>{formatISO9075(new Date(postInfo.createdAt))}</p>
        <p className='author'>by @{postInfo.author?.username}</p>
        {userInfo.id === postInfo.author?._id && (
            <div className='edit-post'>
                <Link to={`/edit/${postInfo._id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" style={{ fill: '#ddd', transform: '', msFilter: '' ,marginBottom:'-3px',marginRight:'3px'}}>
                        <path d="M18.988 2.012 21.988 5.012 19.701 7.3l-3-3zM8 16h3l7.287-7.287-3-3L8 13z" />
                        <path d="M19 19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .896-2 2v14c0 1.104.897 2 2 2h14a2 2 0 0 0 2-2v-8.668l-2 2V19z" />
                    </svg>
                    Edit this post
                </Link>
            </div>
        )}
        {likeInfo && (
            <div className='edit-post'>
                <Link onClick={unliked}>{likeNumber}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style={{ fill: '#f53639', transform: '', msFilter: '' ,marginBottom:'-6px',marginRight:'-5px',marginLeft:'6px'}}>
                        <path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path>
                    </svg>
                </Link>
            </div>
        )}
        {!likeInfo && (
            <div className='edit-post'>
                <Link onClick={liked}>{likeNumber}
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style={{ fill: '#fff', transform: '', msFilter: '' ,marginBottom:'-6px',marginRight:'-5px',marginLeft:'6px'}}>
                        <path d="M20.205 4.791a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595a5.904 5.904 0 0 0-3.996-1.558 5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416z"></path>
                    </svg>
                </Link>
            </div>
        )}
        <div className='image'>
            <img src={`${REACT_APP_API_URL}${postInfo.cover}`} alt='img'/>
        </div>
        <h3>{postInfo.summary}</h3>
        <div dangerouslySetInnerHTML={{__html:postInfo.content}} />
        <h2>Comments</h2>
        <div className='add-comment'>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
            ></textarea>
            <button onClick={submitComment}>Submit Comment</button>
        </div>
        {comments?.length > 0 ? (
        <ul className='comments'>
            {comments?.map((comment) => (
            <li key={comment._id}>
                <p>
                {userInfo.id === comment.author?._id  ? (
                <>
                  <Link onClick={() => deleteComment(comment._id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" style={{ fill: '#000', transform: '', msFilter: '' ,marginBottom:'-2px',marginRight:'0px',marginLeft:'0px'}}>
                      <path d="M8.132 2.504 4.42 9H3a1.001 1.001 0 0 0-.965 1.263l2.799 10.263A2.004 2.004 0 0 0 6.764 22h10.473c.898 0 1.692-.605 1.93-1.475l2.799-10.263A.998.998 0 0 0 21 9h-1.42l-3.712-6.496-1.736.992L17.277 9H6.723l3.145-5.504-1.736-.992zM14 13h2v5h-2v-5zm-6 0h2v5H8v-5z"></path>
                    </svg>
                  </Link>
                  <span>@you: </span>
                </>
                ):(<span>@{comment?.author?.username}: </span>)}
                {comment?.content}
                
              </p>
            </li>
            ))}
        </ul>
        ) : (
        <p>No comments yet.</p>
        )}

    </div>
  )
}

export default PostPage