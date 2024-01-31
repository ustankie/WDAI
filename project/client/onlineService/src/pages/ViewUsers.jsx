import axios from 'axios'
import {  useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "react-widgets/styles.css";
import Combobox from "react-widgets/Combobox";
import {Card, Button,Image}from 'react-bootstrap'
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-hot-toast'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'



export default function ViewUsers() {
    const [users, setUsers] = useState(null);
    const { user, setUser } = useContext(UserContext)
    const [userToChange, setUserToChange] = useState(null);
    const [newType, setNewType] = useState(null);
    const navigate=useNavigate()
    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });
    const customMaxWidth=isSmallScreen ? '100vw' : '30vw';
    

    useEffect(() => {
        axios.get('/users')
            .then(({ data }) => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error fetching texts:', error);
            });
    }, [])


    async function updateUser(){
        console.log (userToChange);
        if(userToChange){
            const { data } = await axios.post('/update_users', { user: userToChange, newType: newType })
            .catch(error => {
                console.error('Error updating user:', error);
            });
            if (data.error) {
                toast.error(data.error)
            } else {
                toast.success('User '+ userToChange.name +' updated successfully')
            }
        }
        setUserToChange(null)

    }
  return (
    <div className='pageComponent' id='viewUsers'>
        <div className='title-photo' id='viewUsers' >
            <h1>Users</h1>
            <p>Update user types if you want</p>
        </div>
        {users && user ? (
            <div>
                {users.map((currUser) => ((currUser._id)=== user.id ?(
                    <Card key={currUser._id} style={{ width: customMaxWidth,margin: '7px', padding:'50px', rowGap: '15px'}} >
                        <div style={{ display: 'flex', flexDirection: 'column'}}>
                            <div className='labelAndOutput'>
                                <h4 className='boldLabel'>Name: </h4>
                                <h4> {currUser.name}</h4>
                                <h4 style={{fontWeight: '300'}}>(You)</h4>
                            </div>
                            <div className='labelAndOutput'>
                                <p className='boldLabel'>Email:  </p>
                                <p>{currUser.email}</p>
                            </div>
                            <div className='labelAndOutput'>
                                <p className='boldLabel'>User type: </p>
                                <Combobox  onChange={(value)=>{
                                    setUserToChange(currUser)
                                    setNewType(value)
                                    console.log(value)
                                    }}
                                    defaultValue={currUser.user_type}
                                    data={["client", "author", "admin"]}
                                />
                            </div>
                        </div>
                        <Button onClick={updateUser} id='updateUserButton' >Update</Button>
                    </Card>
                    ):null
                ))}

                {users.map((currUser) => ((currUser._id)!== user.id ?(
                    <Card key={currUser._id} style={{ width: customMaxWidth,margin: '7px', padding:'50px', rowGap: '15px'}} >
                        <div style={{ display: 'flex', flexDirection: 'column'}}>
                            <div className='labelAndOutput'>
                                <h4 className='boldLabel'>Name: </h4>
                                <h4> {currUser.name}</h4>
                            </div>
                            <div className='labelAndOutput'>
                                <p className='boldLabel'>Email:  </p>
                                <p>{currUser.email}</p>
                            </div>
                            <div className='labelAndOutput'>
                                <p className='boldLabel'>User type: </p>
                                <Combobox  onChange={(value)=>{
                                    setUserToChange(currUser)
                                    setNewType(value)
                                    console.log(value)
                                    }}
                                    defaultValue={currUser.user_type}
                                    data={["client", "author", "admin"]}
                                />
                            </div>
                        </div>
                        <Button onClick={updateUser} id='updateUserButton' >Update</Button>
                    </Card>
                    ):null
                ))}
                

            </div>
        ) : (null)}
    </div>
  )
}