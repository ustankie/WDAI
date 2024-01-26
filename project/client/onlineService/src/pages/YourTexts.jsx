import { UserContext } from '../../context/userContext'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'



export default function YourTexts() {
    const { user } = useContext(UserContext)
    const [texts, setTexts] = useState(null);

    useEffect(() => {
        if (user) {
            axios.get('/your_texts', { params: { userId: user.id } })
                .then(({ data }) => {
                    setTexts(data);
                })
                .catch(error => {
                    console.error('Error fetching texts:', error);
                });
        }
    }, [user,texts])
    const navigate = useNavigate();

   function displayText (text) {
        console.log('Text clicked:', text);
        
        navigate('/display_one_text',{
            state: {
              text: text,
            }
          });
    }

    async function deleteText(textId){
        try {
            console.log(textId)
            const { data } = await axios.post(
                '/delete_text',{textId})

            if (data.error) {
                toast.error(data.error)
            } else {
                toast.success('Text deleted successfully')
            }
        } catch (error) {
            console.log(error)
        }   
    }


    async function modifyText(text){
        navigate('/modify_text',{
            state: {
              text: text,
            }
          })
    }

    return (
        <div>
            <h1>Your texts</h1>
            <div>
                {texts ? (
                    <div>
                        {texts.map((text) => (
                            <div key={text._id}>
                                <h3 onClick={() => displayText(text)} >{text.title}</h3>
                                <p>Author: {text.author_name} </p>
                                <p>Published on: {text.published}</p>
                                <button onClick={()=>deleteText(text._id)} >Delete</button>
                                <button onClick={()=>modifyText(text)}>Modify</button>
                            </div>
                        ))}

                    </div>
                ) : (null)}
            </div>
        </div>
    )
}
