import React, { useContext, useState } from 'react'
import {Navigate} from 'react-router-dom'
import { UserContext } from '../components/UserContext';

const RegisterPage = () => {
    const {REACT_APP_API_URL} =useContext(UserContext);
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
  const [redirect,setRedirect]=useState(false); 

    async function register(e){
        e.preventDefault();
        const response = await fetch(`${REACT_APP_API_URL}register`,{
            method:'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
            mode: 'cors',
            
        });
        console.log(response);
        if (response.status === 200){
            alert('Registration success')
            setRedirect(true);
        }
        else{
            alert('Registration failed')

        }
    }

if(redirect){
    return <Navigate to={'/login'}/>
  }

  return (
    <div>
        <form className='register' onSubmit={register}>
            <h1>Register</h1>
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

export default RegisterPage