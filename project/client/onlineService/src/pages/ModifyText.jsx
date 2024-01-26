import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate,useLocation } from 'react-router-dom'
import { Form,Button } from 'react-bootstrap';


export default function ModifyText() {
    const { user } = useContext(UserContext)
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

        const {_id, title, author_name, author, text, published, edited } = data


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
        <div>
            {/* <form onSubmit={saveText}> */}
                <Form>
                    <Form.Group className="mb-3" controlId="modifyForm.title">
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
                <input type="text" placeholder='Enter text...' value={data.text} onChange={(e) => setData({ ...data, text: e.target.value })} /> */}
                <Button type="submit" onClick={saveText} >Save</Button>
            {/* </form> */}
        </div>
    )
}
