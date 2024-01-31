import { UserContext } from '../../context/userContext'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import YourTextsContent from '../components/YourTextsContent'


export default function YourTexts() {
    const { user, setUser } = useContext(UserContext)
    const [texts, setTexts] = useState(null);
    const [textDeleted, setTextDeleted] = useState(0);

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


    return (
        <div className='pageComponent' >
            <div className='title-photo' id='yourTexts'>
                <h1>Your texts</h1>
                <p>Outcomes of your work</p>
            </div>

            {(texts && texts.length > 0) ? (
                <>
                    <Card className='pageCard' id='yourTexts'>
                        <YourTextsContent />
                    </Card>
                </>) : (
                <YourTextsContent />
            )}
        </div>
    )
}
