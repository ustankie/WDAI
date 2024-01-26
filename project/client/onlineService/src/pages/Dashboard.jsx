import {useContext} from 'react'
import { UserContext } from '../../context/userContext'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

'use strict'

export default function Dashboard() {
    const {user} = useContext(UserContext)
    const navigate=useNavigate()
    

  return (
    <div>
        <h1>Dashboard</h1>
        {!!user && (<h2>Hi {user.user_type} {user.name}!</h2>)}
        {(user!=null && (user.user_type==="admin"||user.user_type==="author")) ? (
              <div>                
                  <button onClick={()=>navigate('/your_texts')}>Your texts</button>
                  <button onClick={()=>navigate('/create_text')} >Create text</button>
              </div>
        ):        null
        }
        {(user!=null && (user.user_type==="admin")) ? (
              <div>                
                  <button onClick={()=>navigate('/users')}>View users</button>
              </div>
        ):        null
        }
        <button  onClick={()=>navigate('/all_texts')} >All texts</button>
        <button  onClick={()=>navigate('/favourite_texts')} >Favourite texts</button>

    </div>
  )
}
