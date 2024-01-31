import { UserContext } from '../../context/userContext'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
// import {DeleteConfirmation} from './CancelAlert'
import {Card, Button,Image}from 'react-bootstrap'
import { truncateText } from '../util/textUtil'
import NothingYet  from '../components/NothingYet'
import YourTextsContent from '../components/YourTextsContent'


export default function YourTexts() {
    const { user,setUser } = useContext(UserContext)
    const [texts, setTexts] = useState(null);
    const [textDeleted, setTextDeleted]=useState(0);



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
    }, [user,textDeleted])




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
                <NothingYet newLoc={'/create_text'} buttonText={'Create Text'} text={'Start over and create your first text!'} />
            )}
        </div>
    )
}
