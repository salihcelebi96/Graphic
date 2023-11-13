import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import "../css/login.css"


const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, logout: auth0Logout } = useAuth0();
  
  const dispatch = useDispatch();
  
  const handleLogin = () => {
    loginWithRedirect();
    
    
    
  };

  const handleLogout = () => {
    auth0Logout({returnTo: window.location.origin});
    
    
    
  };
  
  return (
    <div className=' text-2xl   font-serif border-none p-2  rounded-md   hover:bg-gray-300 border bg-white  '>
    {isAuthenticated ? (
      <button className='text-black' onClick={handleLogout}>Logout</button>
    ) : (
      <button onClick={handleLogin}
       className={`login-button      ${isAuthenticated ? '' : 'blinking'}`}  >Login</button>
    )}
  </div>
  );
};

export default LoginButton;
