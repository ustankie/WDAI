import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Card } from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive';


export default function Login() {
  const navigate = useNavigate()
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const formWidth = isSmallScreen ? '75vw' : '20vw'
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const loginUser = async (e) => {
    e.preventDefault()
    // axios.get('/')

    const { email, password } = data

    try {
      const { data } = await axios.post(
        '/login', { email, password }
      )
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Login successful')
        navigate('/dashboard')
        window.location.reload(false)
      }

    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div className='loginDiv'>
      <Card onSubmit={loginUser} className='loginCard' >
        <Card.Body className='cardBodyLogin'>
          <Card.Title className='loginRegisterCardTitle'>Login</Card.Title>
          <form className='loginRegisterForm' style={{ width: formWidth }}>
            <div className='labelAndInput'>
              <label>Email</label>
              <br />
              <input type="email" style={{ width: formWidth }} placeholder='Enter email...' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            </div>
            <div className='labelAndInput'>
              <label>Password</label>
              <br />
              <input type="password" style={{ width: formWidth }} placeholder='Enter password...' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
            </div>
            <button type="submit">Login</button>
          </form>
        </Card.Body>
      </Card>
    </div>

  )
}
