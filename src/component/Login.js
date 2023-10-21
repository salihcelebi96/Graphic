import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';


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
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default LoginButton;
