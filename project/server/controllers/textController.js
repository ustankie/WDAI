
const Text = require('../model/texts')
const User = require('../model/user')
const jwt = require('jsonwebtoken')


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

const deleteText = async (req, res) => {
    const { textId } = req.body
    try {
        const textRemoved = await Text.deleteOne({ _id: textId });

        res.json(textRemoved);
    } catch (err) {
        console.log(err);
    }
}

const modifyText = async (req, res) => {
    try {
        const { _id, title, author_name, author, text, published, edited } = req.body
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

        const textObject = await Text.findByIdAndUpdate(_id, {
            title: title, text: text, edited: edited
        })

        return res.json(textObject)
    } catch (error) {
        console.log(error)
    }
}

const addToFavourites = async (req, res) => {
    const { user, textId } = req.body
    if (!user) {
        return res.json(user)
    }
    try {

        if (user.favourites.includes(textId)) {
            return res.json(user)
        } else {
            user.favourites.push(textId)

            const updatedUser = await User.findOneAndUpdate(
                { _id: user.id },
                { $addToSet: { favourites: textId } },
                { new: true }
            );

            return res.json(user)
        }
    } catch (error) {
        console.log(error)
        return res.json(user)
    }
}
const removeFromFavourites = async (req, res) => {
    const { user, textId } = req.body
    if (!user) {
        return res.json(user)
    }
    try {

        if (!user.favourites.includes(textId)) {
            return res.json(user)
        } else {

            user.favourites = user.favourites.filter(text => text !== textId);

            const updatedUser = await User.findOneAndUpdate(
                { _id: user.id },
                { favourites: user.favourites },
                { new: true }
            )

            return res.json(user)
        }
    } catch (error) {
        console.log(error)
        return res.json(user)
    }
}

const displayFavourites = async (req, res) => {
    try {
        const favourites = req.query.favourites;

        const textCollection = await Text.find({ _id: { $in: favourites } });
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
    displayFavourites,
    deleteText,
    modifyText
}