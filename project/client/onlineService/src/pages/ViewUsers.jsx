import "react-widgets/styles.css";
import ViewUsersContent from '../components/ViewUsersContent';


export default function ViewUsers() {

  return (
    <div className='pageComponent' id='viewUsers'>
      <div className='title-photo' id='viewUsers' >
        <h1>Users</h1>
        <p>Update user types if you want</p>
      </div>
      <ViewUsersContent />
    </div>
  )
}