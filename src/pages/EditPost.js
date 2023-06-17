import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../components/Editor';
import { UserContext } from '../components/UserContext';


const EditPost = () => {
  const {REACT_APP_API_URL} = useContext(UserContext);
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [redirectTwo, setRedirectTwo] = useState(false);

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setSummary(postInfo.summary);
        setContent(postInfo.content);
        setFiles(postInfo.files);
      });
    });
  }, [id,REACT_APP_API_URL,setTitle,setSummary,setContent,setFiles]);

  async function updatePost(e) {
    e.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch(`${REACT_APP_API_URL}post/`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
      mode: 'cors',
    });
    if (response.ok) {
      setRedirect(true);
      alert('Posted');
    } else {
      alert('Posting failed');
    }
  }

  async function deletePost(e) {
    e.preventDefault();
    const response = await fetch(`${REACT_APP_API_URL}post/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      mode: 'cors',
    });
    if (response.ok) {
      setRedirectTwo(true);
      alert('Post deleted');
    } else {
      alert('Deleting failed');
    }
  }

  if (redirect) {
    return <Navigate to={'/post/' + id} />;
  }
  if (redirectTwo) {
    return <Navigate to={'/'} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder={'Title'}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: '5px' }} type="submit">
        Edit Post
      </button>
      <button style={{ marginTop: '5px' }} onClick={deletePost}>
        Delete Post
      </button>
    </form>
  );
};

export default EditPost;
