import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../context/userContext'
import {Card, Button,Image}from 'react-bootstrap'
import {truncateText} from '../util/textUtil'



export default function FavouriteTexts() {
    const { user, setUser } = useContext(UserContext)
    const [texts, setTexts] = useState(null);
    const navigate=useNavigate()


    useEffect(() => {
        if(user){
            axios.get('/favourite_texts', { params: { favourites: user.favourites } })
            .then(({ data }) => {
                setTexts(data);
            })
            .catch(error => {
                console.error('Error fetching favourite texts:', error);
            });
        }

    }, [user])

    function displayText (text) {      
        navigate('/display_one_text',{
            state: {
              text: text,
            }
          });
    }

    function removeFromFavourites(textId) {

        if (user) {
          axios.post('/remove_from_favourites', { user: user, textId: textId })
            .then((data) => {
              if (data.data != null) {
                setUser(data.data);
              }
    
            }).then(
          )
            .catch(error => {
              console.error('Error removing from favourites:', error);
            });
        }
    }
    
  return (
    <div className='pageComponent'>
        <div className='title-photo' id='favouriteTexts' >
            <h1>Favourite texts</h1>
            <p>Delights chosen by you</p>
      </div>
        <Card className='pageCard' id='favouriteTexts' >
            {texts ? (
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
                    {texts.map((text) => (
                        <Card key={text._id} style={{ width: '18rem',margin: '7px'}} >
                            <Card.Body className='oneTextCardBody'>
                                <div style={{ display: 'flex', flexDirection: 'column'}}>
                                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                                        <Card.Title className='textTitleCard' onClick={() => displayText(text)}>{text.title} </Card.Title> 
                                    </div>
                                    <div className='oneTextCard'>
                                        <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.9em'}}>Author: {text.author_name}</Card.Subtitle>
                                        <Card.Subtitle className="mb-3 " style={{ fontSize: '0.7em', fontStyle: 'italic' }}>Published on: {new Date(text.published).toLocaleDateString()}</Card.Subtitle>
                                        
                                        <Card.Text>
                                            {truncateText(text.text,50)}
                                        </Card.Text>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'row', columnGap: '5px' }}>
                                    <Button className='unlikeButtonFavouriteTexts' id={`remove_${text._id}`} onClick={() => removeFromFavourites(text._id)} >Dislike</Button>
                                    <Button className='readMoreButtonFavouriteTexts' onClick={() => displayText(text)}>Read more</Button>
                                </div>
                                

                            </Card.Body>
                        </Card>
                    ))}

                </div>
            ) : (null)}
        </Card>
    </div>
  )
}
