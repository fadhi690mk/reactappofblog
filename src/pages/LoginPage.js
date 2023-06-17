import React, { useContext, useState } from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../components/UserContext';


const LoginPage = () => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false); 
  const {setUserInfo,REACT_APP_API_URL}= useContext(UserContext);

  async function login(e){
    e.preventDefault();
        const response = await fetch(`${REACT_APP_API_URL}login`,{
            method:'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
            withCredentials: true,
            mode: 'cors',
        });
        if(response.ok){
          response.json().then(async userInfo =>{
            await setUserInfo(userInfo);
            setRedirect(true);
            alert(`welcome ${username}` );
          });
        }else{
          alert(`Login failed,sorry ${username}` );
        }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <div>
        <form className='login' onSubmit={login}>
            <h1>Login</h1>
            <input type='text'
                placeholder='username'
                value={username}
                onChange={e=>setUsername(e.target.value)}/>
            <input type='password'
                placeholder='password'
                value={password}
                onChange={e=>setPassword(e.target.value)}/>
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default LoginPage