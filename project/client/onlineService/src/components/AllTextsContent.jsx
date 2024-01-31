import axios from 'axios'
import { UserContext } from '../../context/userContext'
import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Button, Image } from 'react-bootstrap'
import { truncateText } from '../util/textUtil'

export default function AllTextsContent({ len }) {
    const [texts, setTexts] = useState(null);
    const { user, setUser } = useContext(UserContext)
    const [favourite, setFavourite] = useState(null);
    const navigate = useNavigate()



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
            console.log("fav: ", user)
            texts.forEach((text) => {
                const textId = text._id;
                const isFavourite = user.favourites.includes(textId);

                const removeText = document.getElementById(`remove_${textId}`);
                const addText = document.getElementById(`add_${textId}`);

                if (isFavourite && removeText && addText) {
                    removeText.style.display = 'block';
                    addText.style.display = 'none';
                } else if (removeText && addText) {
                    removeText.style.display = 'none';
                    addText.style.display = 'block';
                }
            });
        }
    }, [user, texts]);



    function displayText(text) {
        navigate('/display_one_text', {
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
        const removeText = document.getElementById(`remove_${textId}`);
        const addText = document.getElementById(`add_${textId}`);
        if (removeText)
            removeText.style.display = 'block';
        if (addText)
            addText.style.display = 'none';
        setFavourite(1 - favourite)

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
        const removeText = document.getElementById(`remove_${textId}`);
        const addText = document.getElementById(`add_${textId}`);
        removeText.style.display = 'none';
        addText.style.display = 'block';
        setFavourite(1 - favourite)

    }

    return (
        <>
            {texts ? (
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {texts.map((text, index) => (!len || index < len) ? (
                        <Card key={text._id} style={{ width: '18rem', margin: '7px' }} >
                            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                            <Card.Body className='oneTextCardBody'>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Card.Title className='textTitleCard' onClick={() => displayText(text)}>{text.title} </Card.Title>
                                        {user ? (
                                            <div>
                                                <Image src="../../resources/full_star.png" id={`remove_${text._id}`} onClick={() => removeFromFavourites(text._id)} style={{ width: '23px', marginLeft: '10px' }} />
                                                <Image src="../../resources/empty_star.png" id={`add_${text._id}`} onClick={() => addToFavourites(text._id)} style={{ width: '23px', marginLeft: '10px' }} />
                                            </div>
                                        ) : null

                                        }
                                    </div>
                                </div>
                                <div className='oneTextCard'>
                                    <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.9em' }}>Author: {text.author_name}</Card.Subtitle>
                                    <Card.Subtitle className="mb-3 " style={{ fontSize: '0.7em', fontStyle: 'italic' }}>Published on: {new Date(text.published).toLocaleDateString()}</Card.Subtitle>

                                    <Card.Text>
                                        {truncateText(text.text, 50)}
                                    </Card.Text>
                                </div>
                                <Button className='readMoreButton' onClick={() => displayText(text)}>Read more</Button>
                            </Card.Body>
                        </Card>

                    ) : null)}

                </div>
            ) : (null)}
        </>
    )
}