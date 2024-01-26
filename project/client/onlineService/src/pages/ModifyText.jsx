import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useNavigate,useLocation } from 'react-router-dom'

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
            <form onSubmit={saveText}>
                <label>Title</label>
                <input type="text" placeholder='Enter title...' value={data.title} onChange={(e) => setData({ ...data, title: e.target.value })} />
                <label>Text</label>
                <input type="text" placeholder='Enter text...' value={data.text} onChange={(e) => setData({ ...data, text: e.target.value })} />
                <button type="submit">Save</button>
            </form>
        </div>
    )
}
