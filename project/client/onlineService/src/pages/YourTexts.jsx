import { UserContext } from '../../context/userContext'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'




export default function YourTexts() {
    const { user } = useContext(UserContext)
    const [texts, setTexts] = useState(null);

    // if (user) {
    //     axios.get('/your_texts')
    //       .then(({ data }) => {
    //         setTexts(data);
    //       })
    //       .catch(error => {
    //         console.error('Error fetching texts:', error);
    //       });
    //   }
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


    }, [user])
    const navigate = useNavigate();

   function displayText (text) {
        console.log('Text clicked:', text);
        
        navigate('/display_one_text',{
            state: {
              text: text,
            }
          });
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
                            </div>
                        ))}

                    </div>
                ) : (null)}
            </div>
        </div>
    )
}
