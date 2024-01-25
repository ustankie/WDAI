const express = require('express');
const router = express.Router()
const cors = require('cors')
const { test, registerUser,loginUser,getProfile, logoutUser } = require('../controllers/authController');
const { createText, displayUserTexts, displayAllTexts, addToFavourites, removeFromFavourites }=require('../controllers/textController');
const { displayUsers, updateUsers }=require('../controllers/userController');

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get("/", test)
router.post('/register', registerUser)
router.post('/login',loginUser)
router.get('/profile',getProfile)
router.post('/logout',logoutUser)
router.post('/create_text',createText)
router.get('/your_texts',displayUserTexts)
router.get('/all_texts',displayAllTexts)
router.get('/users',displayUsers)
router.post('/update_users',updateUsers)
router.post('/add_to_favourites',addToFavourites)
router.post('/remove_from_favourites',removeFromFavourites)

module.exports = router