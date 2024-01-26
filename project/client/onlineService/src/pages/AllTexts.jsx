import axios from 'axios'
import { useLocation } from "react-router-dom";
import { UserContext } from '../../context/userContext'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {Card, Button}from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'; // Add this line


export default function AllTexts() {
    const [texts, setTexts] = useState(null);
    const { user, setUser } = useContext(UserContext)
    const [favourite, setFavourite]=useState(null);
    const navigate=useNavigate()




    useEffect(() => {
        axios.get('/all_texts')
            .then(({ data }) => {
                setTexts(data);
            })
            .catch(error => {
                console.error('Error fetching texts:', error);
            });
    }, [])

    useEffect(() => {

        if (user && texts) {
            console.log("fav: ",user)
            texts.forEach((text) => {
                const textId = text._id;
                const isFavourite = user.favourites.includes(textId);
    
                const removeText = document.getElementById(`remove_${textId}`);
                const addText = document.getElementById(`add_${textId}`);
    
                if (isFavourite && removeText) {
                    removeText.style.display = 'block';
                    addText.style.display = 'none';
                } else if(removeText){
                    removeText.style.display = 'none';
                    addText.style.display = 'block';
                }
            });
        }
    }, [user, texts]);
    





    function displayText (text) {      
        navigate('/display_one_text',{
            state: {
              text: text,
            }
          });
    }
                            
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
        const removeText=document.getElementById(`remove_${textId}`);
        const addText=document.getElementById(`add_${textId}`);
        removeText.style.display='block';
        addText.style.display='none';  
        setFavourite(1-favourite)

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
    const removeText=document.getElementById(`remove_${textId}`);
    const addText=document.getElementById(`add_${textId}`);
        removeText.style.display='none';
        addText.style.display='block';
        setFavourite(1-favourite)

  }
  const truncateText = (text, maxChars) => {
    if (text.length <= maxChars) {
      return text;
    } else {
      return text.slice(0, maxChars) + '...';
    }
  };


  return (
    <div>
        <h1>All texts</h1>
        <div style={{ display: 'flex', flexDirection: 'column',flexWrap: 'wrap' }}>
          {texts ? (
              <div>
                  {texts.map((text) => (
                    
                      // <div >
                          <Card key={text._id} style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                              <Card.Title onClick={() => displayText(text)}>{text.title}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.9em'}}>Author: {text.author_name}</Card.Subtitle>
                              <Card.Subtitle className="mb-3 " style={{ fontSize: '0.7em', fontStyle: 'italic' }}>Published on: {text.published}</Card.Subtitle>
                              <Card.Text>
                                {truncateText(text.text,50)}
                              </Card.Text>
                                {user ?(
                                  <div>
                                      <Button id={`remove_${text._id}`} onClick={() => removeFromFavourites(text._id)} >Remove from favourites</Button>
                                      <Button id={`add_${text._id}`} onClick={() => addToFavourites(text._id)} >Add to favourites</Button>
                                  </div>
                                  ):null

                                }
                            </Card.Body>
                          </Card>
                          /* <h3 onClick={() => displayText(text)} >{text.title}</h3>
                          <p>Author: {text.author_name} </p>
                          <p>Published on: {text.published}</p> */
                        /* {user ?(
                          <div>
                              <button id={`remove_${text._id}`} onClick={() => removeFromFavourites(text._id)} >Remove from favourites</button>
                              <button id={`add_${text._id}`} onClick={() => addToFavourites(text._id)} >Add to favourites</button>
                          </div>
                          ):null

                        }
                          
                    </div> */
                  ))}

              </div>
          ) : (null)}
        </div>
    </div>
  )
}