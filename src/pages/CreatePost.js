import React, { useState, useContext} from 'react'
import {Navigate} from 'react-router-dom'
import Editor from '../components/Editor';
import { UserContext } from '../components/UserContext';


const CreatePost = () => {

    const {REACT_APP_API_URL} = useContext(UserContext);
    const [title,setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [files,setFiles]=useState('');
    const [redirect,setRedirect]=useState(false); 
    async function createNewPost(e){
        e.preventDefault();
        const data = new FormData();
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('file',files[0]);
        const response = await fetch(`${REACT_APP_API_URL}post`,{
            method:'POST',
            body: data,
            credentials: 'include',
            withCredentials: true,
            mode: 'cors',
        });
        if(response.ok){
            setRedirect(true);
            alert('posted') ;
          }
        else{
          alert('Posting failed' );
        }
    }
  if(redirect){
    return <Navigate to={'/'}/>
  }
    

  return (
    <form onSubmit={createNewPost} >
        <input type="title"
            placeholder={'Title'}
            value={title}
            onChange={e=>setTitle(e.target.value)} />
        <input type="summary" 
            placeholder={'Summary'}
            value={summary}
            onChange={e=>setSummary(e.target.value)} />
        <input type="file"
            onChange={e=>setFiles(e.target.files)}/>
        <Editor value={content} onChange={setContent}/>    
        <button style={{marginTop:'5px'}} type='submit'>Create Post</button>
    </form>
  )
}

export default CreatePost