import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { UserContext } from '../../context/userContext'
import { Card } from 'react-bootstrap'
import FavouriteTextsContent from '../components/FavouriteTextsContent'



export default function FavouriteTexts() {
    const { user, setUser } = useContext(UserContext)
    const [texts, setTexts] = useState(null);


    useEffect(() => {
        if (user) {
            axios.get('/favourite_texts', { params: { favourites: user.favourites } })
                .then(({ data }) => {
                    setTexts(data);
                })
                .catch(error => {
                    console.error('Error fetching favourite texts:', error);
                });
        }

    }, [user])

    return (
        <div className='pageComponent'>
            <div className='title-photo' id='favouriteTexts' >
                <h1>Favourite texts</h1>
                <p>Delights chosen by you</p>
            </div>
            {(texts && texts.length > 0) ? (
                <>
                    <Card className='pageCard' id='favouriteTexts' >
                        <FavouriteTextsContent />
                    </Card>
                </>) : (
                <FavouriteTextsContent />
            )}
        </div>
    )
}
