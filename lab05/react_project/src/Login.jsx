// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { setAuthToken } from './setAuthToken';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log(username,password);
    axios.post("http://localhost:3000/login", {username,password})
    .then(response => {
        
      //get token from response
      const token  =  response.data.token;

      //set JWT token to local
      localStorage.setItem("token", token);

      //set token to axios common header
      setAuthToken(token);

//redirect user to home page
      window.location.href = '/'
    })
    .catch(err => console.log(err));
  };
  

  return (
    <div>
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
