import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/userContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Card } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';


export default function CreateText() {
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
    const rows = isSmallScreen ? 10 : 15;
    const formWidth = isSmallScreen ? '75vw' : '45vw'
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()

    const [data, setData] = useState({
        title: '',
        author_name: user ? user.name : null,
        author: user ? user.id : null,
        text: '',
        published: new Date()
    });

    useEffect(() => {
        if (user)
            setData((prevData) => ({
                ...prevData,
                author_name: user.name,
                author: user.id,
            }))
    }, [user])

    const createText = async (e) => {
        e.preventDefault();
        setData((prevData) => ({
            ...prevData,
            author_name: user.name,
            author: user._id,
            published: Date.now()
        }));

        const { title, author_name, author, text, published } = data

        try {
            const { data } = await axios.post(
                '/create_text', {
                title, author_name, author, text, published
            })
            if (data.error) {
                toast.error(data.error)
            } else {
                setData({})
                toast.success('Text created successfully')
                navigate('/your_texts')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='title-photo' id='createText'>
            <Card className='pageCard' id='createText'>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right', justifyContent: 'right' }}>
                    <Card.Title>Create Text</Card.Title>
                    <Form className='createTextForm' >
                        <Form.Group className="mb-3" >

                            <div className='labelAndInput'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title..." style={{ width: formWidth }}
                                    value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
                            </div>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <div className='labelAndInput'>
                                <Form.Label>Text</Form.Label>
                                <Form.Control className='textAreaCreateText' as="textarea" rows={rows} style={{ width: formWidth }}
                                    placeholder='Enter text...' value={data.text} onChange={(e) => setData({ ...data, text: e.target.value })} />
                            </div>
                        </Form.Group>
                    </Form>

                </div>
                <Button type="submit" onClick={createText} className='saveButton' >Save</Button>

            </Card>
        </div>
    )
}
