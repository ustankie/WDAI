import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


export default function NothingYet({ newLoc, buttonText, text }) {
    const navigate = useNavigate()

    return (
        <div className='nothingYet'>
            <h2>Nothing yet</h2>
            <p>{text}</p>
            <Button onClick={() => navigate(newLoc)}>{buttonText}</Button>
        </div>
    )
}