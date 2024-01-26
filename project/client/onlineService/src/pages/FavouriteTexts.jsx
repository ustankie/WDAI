import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../../context/userContext'


export default function FavouriteTexts() {
    const { user } = useContext(UserContext)
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
  return (
    <div>
    <h1>Favourite texts</h1>
    {texts ? (
        <div>
            {texts.map((text) => (
                <div key={text._id}>
                    <h3 onClick={() => displayText(text)} >{text.title}</h3>
                    <p>Author: {text.author_name} </p>
                    <p>Published on: {text.published}</p>
                   
                    {/* <button id={`remove_${text._id}`} onClick={() => removeFromFavourites(text._id)} >Remove from favourites</button>
                    <button id={`add_${text._id}`} onClick={() => addToFavourites(text._id)} >Add to favourites</button>   */}
               </div>
            ))}

        </div>
    ) : (null)}
</div>
  )
}
