import React, { useEffect } from 'react'
import { UserContext } from '../../context/userContext'
import { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function MyNavbar() {
  const { user, setUser } = useContext(UserContext)
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
    try {
      const response2 = await axios.get('/profile', { email, password });
      {
        setData({ email: '', password: '' });
        toast.success('Logout successful');
        navigate('/dashboard');
      }
      setUser(null)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
  }, [user])

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/dashboard">BestBlog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Home</Nav.Link>
            <Nav.Link href="/all_texts">All texts</Nav.Link>
            {!user ? null : (
              <>
                <Nav.Link href="/favourite_texts">Favourites</Nav.Link>
                {(user != null && (user.user_type === "admin" || user.user_type === "author")) ? (
                  <>
                    <Nav.Link href='/your_texts'>Your texts</Nav.Link>
                    <Nav.Link href='/create_text' >Create text</Nav.Link>
                  </>
                ) : null
                }
                {(user != null && (user.user_type === "admin")) ? (
                  <Nav.Link href='/users'>View users</Nav.Link>
                ) : null
                }
              </>
            )
            }
          </Nav>
          <Nav>
            {!user ? (
              <div className='navbar-parts'>
                <button onClick={() => { navigate('/register') }}>Register</button>
                <button onClick={() => { navigate('/login') }}  >Login</button >
              </div>
            ) : (
              <button onClick={logoutUser} >Logout</button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // <nav>
    //   {/* <Link to='/'>Home</Link> */}
    //   <Link to='/dashboard'>Dashboard</Link>
    //   {!user ? (
    //     <div>
    //       <Link to='/register'>Register</Link>
    //       <Link to='/login'  >Login</Link>

    //     </div>
    //   ) : (
    //     <div>
    //       <button onClick={logoutUser} >Logout</button>

    //     </div>
    //   )}


    // </nav>
  )
}
