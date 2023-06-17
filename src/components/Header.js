import React, { useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from './UserContext';

const Header = () => {
  const {setUserInfo,userInfo,REACT_APP_API_URL} = useContext(UserContext);
  useEffect(()=>{
    fetch(`${REACT_APP_API_URL}profile`,{
      credentials: 'include',
      withCredentials: true,
      mode:'cors',
    }).then(response =>{
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        console.log(userInfo);
      });
    });
  },[REACT_APP_API_URL,setUserInfo]);

  async function logout(){
    await fetch(`${REACT_APP_API_URL}logout`,{
      credentials: 'include',
      withCredentials: true,
      method:'POST',
      mode:'cors',
    }).then(() => {
      setUserInfo(" ");
    });
  }
  const username= userInfo?.username;

  return (
    <header>
        <Link to="/" className="logo">Myblogs</Link>
        <nav>
          {username && (
            <>
              <Link className='duplicate-button' to='/create'>Create a new post</Link>
              <Link className='duplicate-button'  to='/' onClick={logout}>Logout {username}</Link>
            </>
          )}
          {!username && (
            <>
              <Link className='duplicate-button' to="/login">Login</Link>
              <Link className='duplicate-button' to="/register">Register</Link>
            </>
          )}
          
        </nav>
      </header>
  )
}

export default Header