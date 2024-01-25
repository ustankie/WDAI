import axios from 'axios'
import { useLocation } from "react-router-dom";
import { UserContext } from '../../context/userContext'
import { useContext, useState, useEffect } from 'react'


export default function DisplayOneText() {
    const { user, refreshUser } = useContext(UserContext)
    const [isFavourite, setFavourite]=useState(false);
    // useEffect(() => {
    //     if (user) {
    //         axios.get('/your_texts', { params: { userId: user.id } })
    //             .then(({ data }) => {
    //                 setTexts(data);
    //             })
    //             .catch(error => {
    //                 console.error('Error fetching texts:', error);
    //             });


    //     }


    // }, [user])
    const location = useLocation();

    let text = location.state.text;
    useEffect(() => {
      
      if(user)
      setFavourite(user.favourites.includes(text._id))
    // console.log(isFavourite)
    // console.log(text._id)
    },[user])
    


    function addToFavourites(textId){

      if(user){
          axios.post('/add_to_favourites', { userId: user.id, textId: textId })
          .catch(error => {
              console.error('Error updating user:', error);
          });
      }
      console.log(user)
      setFavourite(true)

  }

  function removeFromFavourites(textId){

    if(user){
        axios.post('/remove_from_favourites', { userId: user.id, textId: textId })
        .then((data)=>{
          refreshUser;
        })
        .catch(error => {
            console.error('Error updating user:', error);
        });
    }
    console.log(user)

    setFavourite(false)

}
  return (
    <div>
        <h1>{text.title}</h1>
        <h3>Author: {text.author_name}</h3>
        <p>Published on: {text.published}</p>
        
        {isFavourite ? (<button onClick={() => removeFromFavourites(text._id)} >Remove from favourites</button>):
        (<button onClick={() => addToFavourites(text._id)} >Add to favourites</button>)}

        <p>{text.text}</p>
        
    </div>
  )
}
