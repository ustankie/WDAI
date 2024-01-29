import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

import { Routes, Route } from 'react-router-dom'
import MyNavbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
// import Logout from './pages/Logout'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { UserContextProvider } from '../context/userContext'
import CreateText from './pages/CreateText'
import YourTexts from './pages/YourTexts'
import DisplayOneText from './pages/DisplayOneText'
import AllTexts from './pages/AllTexts'
import ViewUsers from './pages/ViewUsers'
import FavouriteTexts from './pages/FavouriteTexts'
import ModifyText from './pages/ModifyText'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  

  return (
    <div className={`dark-mode`}>
      <UserContextProvider className='provider'>
        <MyNavbar />
        <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/create_text' element={<CreateText />} />
          <Route path='/your_texts' element={<YourTexts />} />
          <Route path='/display_one_text' element={<DisplayOneText />} />
          <Route path='/all_texts' element={<AllTexts />} />
          <Route path='/users' element={<ViewUsers />} />
          <Route path='/favourite_texts' element={<FavouriteTexts />} />
          <Route path='/modify_text' element={<ModifyText />} />

        </Routes>
      </UserContextProvider>
    </div>
  )
}

export default App
