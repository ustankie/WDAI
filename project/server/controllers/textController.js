
const Text = require('../model/texts')
const User = require('../model/user')
const jwt =require('jsonwebtoken')


const createText = async (req, res) => {
    try {
        const { title, author_name, author, text, published } = req.body
        if (!text) {
            return res.json({
                error: 'Text content is required'
            })
        }
        if (!title) {
            return res.json({
                error: 'title is required'
            })
        }

        const textObject = await Text.create({
            title, author_name, author, text, published
        })

        return res.json(textObject)
    } catch (error) {
        console.log(error)
    }
}

const displayUserTexts = async (req, res) => {

    try {
        const userId = req.query.userId;
        const textCollection = await Text.find({ author: userId });
        if (!textCollection) {
            return res.json({
                error: 'Error loading texts'
            })
        }

        res.json(textCollection);
    } catch (err) {
        console.log(err);
    }
}

const displayAllTexts = async (req, res) => {
    try {
        const textCollection = await Text.find();
        if (!textCollection) {
            return res.json({
                error: 'Error loading texts'
            })
        }
        console.log(textCollection)
        res.json(textCollection);
    } catch (err) {
        console.log(err);
    }
}

const addToFavourites = async (req, res) => {
    const { user, textId } = req.body
    if(!user){
        return res.json(user)
    }
    try {
        
        if(user.favourites.includes(textId)){
            return res.json(user)
        }else{
            const updatedUser = await User.findOneAndUpdate({_id: user.id},{$addToSet :
                {favourites: textId}}, {new:true}
            )
            console.log(user)
            console.log(updatedUser)
            return res.json(updatedUser)
        }
    } catch (error) {
        console.log(error)
        return res.json(user)
    }
}
const removeFromFavourites = async (req, res) => {
    const { user, textId } = req.body
    if(!user){
        return res.json(user)
    }
    try {
        
        if(!user.favourites.includes(textId)){
            console.log("not there")
            return res.json(user)
        }else{
            console.log("there")
            var updUser='';
            const updatedUser = await User.updateOne({_id: user.id},{$pull :
                {favourites: textId}}   ,{new:true}
            )
            
            console.log(user)
            console.log(updatedUser)
            
            console.log("upduser:",updUser)
            jwt.sign({email: updUser.email,id: updUser._id,name: updUser.name, user_type: updUser.user_type,favourites: updUser.favourites},process.env.JWT_SECRET,{},(err,token)=>{
                if(err) throw err;
            res.cookie('token',token).json(updUser)
            })
            // res.cookie('token',token).json(updUser)
            
            return res.json(updatedUser)
        }
    } catch (error) {
        console.log(error)
        return res.json(user)
    }
}

const displayFavourites=async(req,res)=>{
    try {
        const favourites = req.query.favourites;

        const textCollection = await Text.find({ _id: { $in: favourites }});
        if (!textCollection) {
            return res.json({
                error: 'Error loading texts'
            })
        }

        res.json(textCollection);
    } catch (err) {
        console.log(err);
    }

}

module.exports = {
    createText,
    displayUserTexts,
    displayAllTexts,
    addToFavourites,
    removeFromFavourites,
    displayFavourites
}