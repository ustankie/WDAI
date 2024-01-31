import {useContext} from 'react'
import { UserContext } from '../../context/userContext'
import AllTextsContent from '../components/AllTextsContent'
import YourTextsContent from '../components/YourTextsContent'
import {useNavigate} from 'react-router-dom'
import { Card, Button, Image } from 'react-bootstrap'

'use strict'

export default function Dashboard() {
    const {user} = useContext(UserContext)
    const navigate=useNavigate()
    

  return (
    <div className='pageComponent' >
        <div className='title-photo' id='dashboard'>
          <h1>BestBlog</h1>
          {!!user && (<h2>Hi {user.user_type} {user.name}!</h2>)}
        </div>
        <div style={{display:'flex', flexDirection: 'column', rowGap: '20px'}}>
          <Card>
            <Card.Header>All texts</Card.Header>
            <Card.Body>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <AllTextsContent len={3}/>
                <p className='textTitleCard'  onClick={()=>navigate('/all_texts')} >More...›</p>
              </div>
            </Card.Body>         
          </Card>
          {(user!=null && (user.user_type==="admin"||user.user_type==="author")) ? (
                <>
                  <Card >
                    <Card.Header style={{ display: 'flex', flexDirection: 'row',justifyContent: 'space-between', 
                        alignItems: 'center', alignContent: 'center',marginBottom: '0',paddingBottom:'0'}}>
                      <p>Your texts </p>
                      <p  className='textTitleCard'  onClick={()=>navigate('/create_text')} >Create</p>
                    </Card.Header>
                    <Card.Body>
                      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <YourTextsContent len={3}/>
                          <p className='textTitleCard'  onClick={()=>navigate('/your_texts')} >More...›</p>
                      </div>
                    </Card.Body>         
                  </Card>
                </>

          ):        null
          }
          {(user!=null && (user.user_type==="admin")) ? (
                <div>                
                    <button onClick={()=>navigate('/users')}>View users</button>
                </div>
          ):        null
          }

          
          
          {user ?
            (<button  onClick={()=>navigate('/favourite_texts')} >Favourite texts</button>)
            : null
          }
      </div>
    </div>
  )
}
