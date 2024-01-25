import axios from 'axios'
import {  useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "react-widgets/styles.css";
import Combobox from "react-widgets/Combobox";

export default function ViewUsers() {
    const [users, setUsers] = useState(null);
    const [userToChange, setUserToChange] = useState(null);
    const [newType, setNewType] = useState(null);
    const navigate=useNavigate()


    useEffect(() => {
        axios.get('/users')
            .then(({ data }) => {
                setUsers(data);
            })
            .catch(error => {
                console.error('Error fetching texts:', error);
            });
    }, [])


    function updateUser(){
        console.log (userToChange);
        if(userToChange){
            axios.post('/update_users', { user: userToChange, newType: newType })
            .catch(error => {
                console.error('Error updating user:', error);
            });
        }
        setUserToChange(null)

    }
  return (
    <div>
        <h1>Users</h1>
        {users ? (
            <div>
                {users.map((user) => (
                    <div key={user._id}>
                        <h3 >Name: {user.name}</h3>
                        <p>Email: {user.email} </p>
                        <p>User type: </p>
                        <Combobox onChange={(value)=>{
                            setUserToChange(user)
                            setNewType(value)
                            console.log(value)
                        }}
                            defaultValue={user.user_type}
                            data={["client", "author", "admin"]}
                            />
                        <button onClick={updateUser} >Update</button>
                    </div>
                ))}
                

            </div>
        ) : (null)}
    </div>
  )
}