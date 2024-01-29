import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import {Card}from 'react-bootstrap'


export default function Register() {
  const navigate=useNavigate()

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data
    try {
      const { data } = await axios.post(
        '/register', {
        name, email, password
      })
      if(data.error){
        toast.error(data.error)
      }else{
        setData({})
        toast.success('Registration successful')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className='registerDiv'>
      <Card className='registerCard' >
        <Card.Body>
          <Card.Title className='loginRegisterCardTitle'>Register</Card.Title>
          <form onSubmit={registerUser} className='loginRegisterForm'>
            <div className='labelAndInput'>
              <label>Name</label>
              <input type="text" placeholder='Enter name...' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
            </div>
            <div className='labelAndInput'>
              <label>Email</label>
              <input type="email" placeholder='Enter email...' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
            </div>
            <div className='labelAndInput'>
              <label>Password</label>
              <input type="password" placeholder='Enter password...' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
            </div>
            <button type="submit">Submit</button>
          </form>
        </Card.Body>
      </Card>
    </div>
  )
}
