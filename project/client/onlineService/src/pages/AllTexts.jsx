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
    
                if (isFavourite) {
                    removeText.style.display = 'block';
                    addText.style.display = 'none';
                } else {
                    removeText.style.display = 'none';
                    addText.style.display = 'block';
                }
            });
        }
    }, [user, texts]);
    

    useEffect(() => {


    }, [favourite])



    function displayText (text) {      
        navigate('/display_one_text',{
            state: {
              text: text,
            }
          });
    }
                            

   function addToFavourites(textId){

        if(user){
            try{                console.log(user,user._id)

                console.log("id: ",user._id)
                try{
                    axios.post('/add_to_favourites', { user: user, textId: textId }).then((data)=>{
                        // setUser(data.data)
                        console.log("resadd: ",user)
                    })
      
                }catch(e){
                    console.log(e)
                }
                

            }catch(err){
                console.log(err)
            }
 
        }
        const removeText=document.getElementById(`remove_${textId}`);
        const addText=document.getElementById(`add_${textId}`);
        removeText.style.display='block';
        addText.style.display='none';    

    setFavourite(1-favourite)}

    async function removeFromFavourites(textId){

        if(user){
            try{
                console.log(user)
                console.log("id rem: ",user._id)
                const res= await axios.post('/remove_from_favourites', { user: user, textId: textId })
                // const done=await setUser(res.data);
                console.log("res: ",user)

            }catch(err){
                console.log(err)
            }
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
                       
                        <button id={`remove_${text._id}`} onClick={() => removeFromFavourites(text._id)} >Remove from favourites</button>
                        <button id={`add_${text._id}`} onClick={() => addToFavourites(text._id)} >Add to favourites</button>  
                   </div>
                ))}

            </div>
        ) : (null)}
    </div>
  )
}