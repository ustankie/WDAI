
const User = require('../model/user')


const displayUsers = async (req, res) => {

    try {
        const userCollection = await User.find();
        if (!userCollection) {
            return res.json({
                error: 'Error loading users'
            })
        }

        res.json(userCollection);
    } catch (err) {
        console.log(err);
    }
}

const updateUsers = async (req, res) => {
    try {
        const { user, newType } = req.body;
        const updatedUser = await User.updateOne(
            { _id: user._id },
            { $set: { user_type: newType } },
            { new: true }
        )
        console.log(updatedUser)
        res.json(updatedUser)
    } catch (error) {
        console.error('Error updating user:', error);
    }

}


module.exports = {
    displayUsers,
    updateUsers
}