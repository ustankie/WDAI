import axios from 'axios'
import { useLocation } from "react-router-dom";
import { UserContext, UserContextProvider } from '../../context/userContext'
import { useContext, useState, useEffect } from 'react'
import {Card, Image}from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive';


export default function DisplayOneText() {
  const { user, setUser } = useContext(UserContext)
  const [isFavourite, setFavourite] = useState(false);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
  const customMaxWidth=isSmallScreen ? '100vw' : '50vw';
  const location = useLocation();

  let text = location.state.text;
  useEffect(() => {

    if (user)
      setFavourite(user.favourites.includes(text._id))

  }, [user])



  function addToFavourites(textId) {

    if (user) {

      axios.post('/add_to_favourites', { user: user, textId: textId })
        .then((data) => {

          setFavourite(true)
          if (data.data != null) {

            setUser(data.data);
          }
        })
        .catch(error => {
          console.error('Error updating user:', error);
        });
    }


  }

  function removeFromFavourites(textId) {

    if (user) {
      axios.post('/remove_from_favourites', { user: user, textId: textId })
        .then((data) => {
          setFavourite(false)
          if (data.data != null) {
            setUser(data.data);
          }




        }).then(
      )
        .catch(error => {
          console.error('Error updating user:', error);
        });
    }



  }

  return (
    <div className='pageComponent'>
      <div className='title-photo' id='displayOneText' >
        <h1>{text.title}</h1>
        <h3>Author: {text.author_name}</h3>
        
      </div>
      <Card className='pageCard' id='displayOneText' style={{maxWidth: customMaxWidth}}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'left',width: 'fit-content'}}>
          <p style={{ fontSize: '1em', fontStyle: 'italic' }}>Published on: {new Date(text.published).toLocaleDateString()}</p>
          {user ?(isFavourite ? (
          <Image src="../../resources/full_star.png" id={`remove_${text._id}`} onClick={() => removeFromFavourites(text._id)} 
          style={{height: '23px', marginLeft: '10px'}} />) :(
          <Image src="../../resources/empty_star.png" id={`add_${text._id}`} onClick={() => addToFavourites(text._id)} 
          style={{height: '23px', marginLeft: '10px'}} />
          )):null}
        </div>
        <p className='textContentOneText'>{text.text}</p>
      </Card>

    </div>
  )
}
