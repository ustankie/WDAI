import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';


export default function ModifyText() {
    const { user } = useContext(UserContext)
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
    const rows = isSmallScreen ? 10 : 15;
    const navigate = useNavigate()
    const location = useLocation();
    const initialText = location.state.text;
    // console.log(initialText)

    const [data, setData] = useState({
        _id: initialText._id,
        title: initialText.title,
        author_name: initialText.author_name,
        author: initialText.author,
        text: initialText.text,
        published: initialText.published,
        edited: new Date()
    });
    console.log(data)

    const saveText = async (e) => {
        e.preventDefault();
        setData((prevData) => ({
            ...prevData,
            edited: Date.now(),
        }));

        const { _id, title, author_name, author, text, published, edited } = data


        try {
            const { data } = await axios.post(
                '/modify_text', {
                _id, title, author_name, author, text, published, edited
            })
            if (data.error) {
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Text saved successfully')
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='title-photo' id='createText'>
            <Card className='pageCard' id='createText'>
                <Card.Title>Modify Text</Card.Title>
                <Form className='createTextForm'>
                    <Form.Group className="mb-3">
                        <div className='labelAndInput'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter title..."
                                value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <div className='labelAndInput'>
                            <Form.Label>Text</Form.Label>
                            <Form.Control as="textarea" className='textAreaCreateText' rows={rows} placeholder='Enter text...' value={data.text} onChange={(e) => setData({ ...data, text: e.target.value })} />
                        </div>
                    </Form.Group>
                </Form>

                <Button type="submit" onClick={saveText} className='saveButton'>Save</Button>
            </Card>
        </div>
    )
}
