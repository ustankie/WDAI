const User = require('../model/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt =require('jsonwebtoken')

const test = (req, res) => {
    res.json("test is working")
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name) {
            return res.json({
                error: 'name is required'
            })
        }
        if (!password || password.length < 6) {
            return res.json({
                error: 'at least 6 characters password is required'
            })
        }
        const exist = await User.findOne({ email })
        if (exist) {
            return res.json({
                error: 'Account with this email already exists'
            })
        }

        const hashedPassword = await hashPassword(password)


        const user = await User.create({
            name, email, password: hashedPassword
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.json({
                error: 'This user does not exist'
            })
        }

        const match = await comparePassword(password, user.password)
        if (match) {
            jwt.sign({email: user.email,id: user._id,name: user.name, user_type: user.user_type,favourites: user.favourites},process.env.JWT_SECRET,{},(err,token)=>{
                if(err) throw err;
                res.cookie('token',token).json(user)
            })
        }
        if (!match) {
            res.json({
                error: 'Passwords don\'t match'
            })
        }

    } catch (error) {
        console.log(error)
    }
}

const logoutUser = (req, res) =>{
    res.clearCookie('token'); 
    // console.log('logout');
    res.json({ message: 'Logout successful' });
}

const getProfile=(req,res)=>{
    const{token}=req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
            if(err) throw err;
            const user2=user
            User.findById(user.id).then((data)=>{
                user2.favourites=data.favourites

                res.json(user2)
            })
            
        })
    }else{
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
}
