import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function LogoutUser(){
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const logoutUser = async (e) => {
    e.preventDefault();

    const { email, password } = data;
    console.log('logging out');

    try {
      const response = await axios.post('/logout', { email, password });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({ email: '', password: '' });
        toast.success('Logout successful');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return logoutUser;
};

