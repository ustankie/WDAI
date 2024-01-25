
const Text = require('../model/texts')
const User = require('../model/user')

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

        res.json(textCollection);
    } catch (err) {
        console.log(err);
    }
}

const addToFavourites = async (req, res) => {
    try {
        const { user, textId } = req.body;

        // const user = await User.findById(userId);
        // console.log("upda: ",user,userId)

        // if (!user) {
        //     return res.json({
        //         error: 'User not found ${userId}'
        //     });
        // }
        console.log(user)
        user.favourites.push(textId);
        try{
            const updatedUser = await user.save()
            console.log("udpatedUser:",updatedUser)
            res.json(updatedUser);
        }catch(e){
            res.json(user);
            console.error('Error saving user:');
        }

        // if (!user.favourites.includes(textId)) {
        //     user.favourites.push(textId);

        //     try {
        //         const updatedUser = await user.save();
        //         console.log("udpatedUser:",updatedUser)

        //         res.json(updatedUser);
        //     } catch (saveError) {
        //         console.error('Error saving user:', saveError);
        //         res.status(500).json({ error: 'Error saving user' });
        //     }

            
        // } else {
        //     res.json(user);
        // }
    } catch (err) {
        console.log(err);
    }
}
const removeFromFavourites = async (req, res) => {
    try {
        const { user, textId } = req.body;
        console.log(user)
        user.favourites = user.favourites.filter(fav => fav !== textId);
        console.log(user.favourites)
        try{
            const updatedUser = await user.save()
            console.log("udpatedUser:",updatedUser)
            res.json(updatedUser);
        }catch(e){
            res.json(user);
            console.error('Error saving user:');
        }
        // const user = await User.findById(userId);
        // console.log("upda: ",user)

        // if (!user) {
        //     return res.json({
        //         error: 'User not found'
        //     });
        // }

        // if (user.favourites.includes(textId)) {
        //     user.favourites = user.favourites.filter(fav => fav.toString() !== textId);
        //     console.log('user:', user);
        //     try {
        //         const updatedUser = await user.save();
        //         console.log('updatedUser:', updatedUser);
        //         res.json(updatedUser);
        //         console.log("udpatedUser:",updatedUser)

        //     } catch (saveError) {
        //         console.error('Error saving user:', saveError);
        //         res.status(500).json({ error: 'Error saving user' });
        //     }

        // } else {
        //     res.json(user);
        // }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createText,
    displayUserTexts,
    displayAllTexts,
    addToFavourites,
    removeFromFavourites
}