import axios from 'axios'
import { useLocation } from "react-router-dom";
import { UserContext } from '../../context/userContext'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'



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


  return (
    <div>
        <h1>All texts</h1>
        {texts ? (
            <div>
                {texts.map((text) => (
                    <div key={text._id}>
                        <h3 onClick={() => displayText(text)} >{text.title}</h3>
                        <p>Author: {text.author_name} </p>
                        <p>Published on: {text.published}</p>
                       {user ?(
                        <div>
                            <button id={`remove_${text._id}`} onClick={() => removeFromFavourites(text._id)} >Remove from favourites</button>
                            <button id={`add_${text._id}`} onClick={() => addToFavourites(text._id)} >Add to favourites</button>
                        </div>
                        ):null

                       }
                        
                   </div>
                ))}

            </div>
        ) : (null)}
    </div>
  )
}