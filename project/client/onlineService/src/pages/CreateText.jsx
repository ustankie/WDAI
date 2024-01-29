import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Form,Button } from 'react-bootstrap';


export default function CreateText() {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    const [data, setData] = useState({
        title: '',
        author_name: user ? user.name:null,
        author: user ? user.id: null,
        text: '',
        published: new Date()
    });

    const createText = async (e) => {
        e.preventDefault();
        setData((prevData) => ({
            ...prevData,
            published: Date.now(),
        }));

        const { title, author_name, author, text, published } = data

        console.log("creating text")
        console.log(user.id)
        console.log(data)

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
                navigate('/dashboard')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            {/* <form onSubmit={createText}> */}
                <Form>
                    <Form.Group className="mb-3" controlId="modifyForm.title">
                    <Form.Control
                        type='file'
                        id='image-file'
                        label='Choose File'
                        />

                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title..."  
                        value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="modifyForm.text">
                        <Form.Label>Text</Form.Label>
                        <Form.Control as="textarea" rows={7} placeholder='Enter text...' value={data.text} onChange={(e) => setData({ ...data, text: e.target.value })} />
                    </Form.Group>
                </Form>
                {/* <label>Title</label>
                <input type="text" placeholder='Enter title...' value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
                <label>Text</label>
                <input type="text" placeholder='Enter text...' value={data.text} onChange={(e) => setData({ ...data, text: e.target.value })} />
                <button type="submit">Save</button> */}
                <Button type="submit" onClick={createText} >Save</Button>

            {/* </form> */}
        </div>
    )
}
