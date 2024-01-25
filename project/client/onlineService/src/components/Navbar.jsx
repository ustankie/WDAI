  import React, { useEffect } from 'react'
  import { Link } from 'react-router-dom'
  import { UserContext } from '../../context/userContext'
  import { useContext } from 'react'
  import { useState } from 'react'
  import axios from 'axios'
  import { useNavigate } from 'react-router-dom'
  import { toast } from 'react-hot-toast'
  // import LogoutUser from '../pages/Logout'

  export default function Navbar() {
    const { user,setUser } = useContext(UserContext)
    const navigate = useNavigate();
    const [data, setData] = useState({
      email: '',
      password: ''
    });

    const logoutUser = async (e) => {
      const { email, password } = data;

      try {
        const response = await axios.post('/logout', { email, password });
        if (response.data.error) {
          toast.error(response.data.error);
        } else {
          setData({ email: '', password: '' });
          navigate('/');
        }
        
      } catch (error) {
        console.error(error);
      }
      try{   
        const response2 = await axios.get('/profile', { email, password });
        {
          setData({ email: '', password: '' });
          toast.success('Logout successful');
          navigate('/');
        }
        setUser(null)
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(()=>{
    },[user])

    return (
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/dashboard'>Dashboard</Link>
        {!user ? (
          <div>
            <Link to='/register'>Register</Link>
            <Link to='/login'  >Login</Link>

          </div>
        ) : (
          <div>
            <button onClick={logoutUser} >Logout</button>

          </div>
        )}


      </nav>
    )
  }
