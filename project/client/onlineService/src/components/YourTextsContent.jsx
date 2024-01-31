import { UserContext } from '../../context/userContext'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { Card, Button, Image } from 'react-bootstrap'
import { truncateText } from '../util/textUtil'
import NothingYet from '../components/NothingYet'


export default function YourTextsContent({ len }) {
    const { user, setUser } = useContext(UserContext)
    const [texts, setTexts] = useState(null);
    const [textDeleted, setTextDeleted] = useState(0);
    const [favourite, setFavourite] = useState(null);
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
    }, [user, textDeleted])


    useEffect(() => {

        if (user && texts) {
            console.log("fav: ", user)
            texts.forEach((text) => {
                const textId = text._id;

                const isFavourite = user.favourites.includes(textId);
                const removeText = document.getElementById(`your_remove_${textId}`);
                const addText = document.getElementById(`your_add_${textId}`);
                console.log(textId, isFavourite, removeText)

                if (isFavourite && removeText) {
                    removeText.style.display = 'block';
                    addText.style.display = 'none';
                    console.log(textId, isFavourite, addText)
                } else if (removeText) {
                    removeText.style.display = 'none';
                    addText.style.display = 'block';
                }
            });
        }
    }, [user, texts]);

    const navigate = useNavigate();

    function displayText(text) {
        console.log('Text clicked:', text);

        navigate('/display_one_text', {
            state: {
                text: text,
            }
        });
    }

    function deleteText(textId) {

        setShowAlert(true)
        try {
            console.log(textId)
            const { data } = axios.post(
                '/delete_text', { textId })
            console.log(data)
            // if (data.error) {
            //     toast.error(data.error)
            // } else 
            {
                toast.success('Text deleted successfully')
            }
        } catch (error) {
            console.log(error)
        }
        setTextDeleted(1 - textDeleted);
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
        const removeText = document.getElementById(`your_remove_${textId}`);
        const addText = document.getElementById(`your_add_${textId}`);
        removeText.style.display = 'block';
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
        const removeText = document.getElementById(`your_remove_${textId}`);
        const addText = document.getElementById(`your_add_${textId}`);
        removeText.style.display = 'none';
        addText.style.display = 'block';
        setFavourite(1 - favourite)

    }


    async function modifyText(text) {
        navigate('/modify_text', {
            state: {
                text: text,
            }
        })
    }

    return (
        <>
            {(texts && texts.length > 0) ? (
                <>
                    {texts ? (
                        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {texts.map((text, index) => (!len || index < len) ? (
                                <Card key={text._id} style={{ width: '18rem', margin: '7px' }} >
                                    <Card.Body className='oneTextCardBody'>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                <Card.Title className='textTitleCard' onClick={() => displayText(text)}>{text.title} </Card.Title>
                                                {user ? (
                                                    <div>
                                                        <Image src="../../resources/full_star.png" id={`your_remove_${text._id}`} onClick={() => removeFromFavourites(text._id)} style={{ width: '23px', marginLeft: '10px' }} />
                                                        <Image src="../../resources/empty_star.png" id={`your_add_${text._id}`} onClick={() => addToFavourites(text._id)} style={{ width: '23px', marginLeft: '10px' }} />
                                                    </div>
                                                ) : null

                                                }

                                            </div>
                                            <div className='oneTextCard'>
                                                <Card.Subtitle className="mb-2 text-muted" style={{ fontSize: '0.9em' }}>Author: {text.author_name}</Card.Subtitle>
                                                <Card.Subtitle className="mb-3 " style={{ fontSize: '0.7em', fontStyle: 'italic' }}>Published on: {new Date(text.published).toLocaleDateString()}</Card.Subtitle>

                                                <Card.Text>
                                                    {truncateText(text.text, 50)}
                                                </Card.Text>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'row', columnGap: '5px' }}>
                                                <Button className='unlikeButtonFavouriteTexts' onClick={() => deleteText(text._id)} >Delete</Button>
                                                <Button className='readMoreButtonFavouriteTexts' onClick={() => modifyText(text)}>Modify</Button>
                                                {/* <DeleteConfirmation message={'Are you sure you want to delete this text?'} /> */}
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ) : null)}

                        </div>
                    ) : (null)}
                </>)
                : (
                    <NothingYet newLoc={'/create_text'} buttonText={'Create Text'} text={'Start over and create your first text!'} />
                )}

        </>)

}