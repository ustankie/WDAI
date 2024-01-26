import { UserContext } from '../../context/userContext'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
// or less ideally
import { Modal,Button } from 'react-bootstrap';
import {DeleteConfirmation} from './CancelAlert'

export default function YourTexts() {
    const { user } = useContext(UserContext)
    const [texts, setTexts] = useState(null);
    const [showAlert, setShowAlert] = useState(false);


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

     function deleteText(textId){
        
        setShowAlert(true)
        // try {
        //     console.log(textId)
        //     const { data } = await axios.post(
        //         '/delete_text',{textId})

        //     if (data.error) {
        //         toast.error(data.error)
        //     } else {
        //         toast.success('Text deleted successfully')
        //     }
        // } catch (error) {
        //     console.log(error)
        // }   
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
                                <button onClick={()=>setShowAlert(true)} >Delete</button>
                                <button onClick={()=>modifyText(text)}>Modify</button>
                                <DeleteConfirmation  message={'Are you sure you want to delete this text?'}/>
                            
                            </div>
                        ))}

                    </div>
                ) : (null)}
            </div>
        </div>
    )
}
