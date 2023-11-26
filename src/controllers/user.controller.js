const User = require('../models/user');
const { tokenReturned } = require('../middleware/token');
const { log } = require('console');


const getUserProfile = async (req, res) => {
    try {
        const { data } = tokenReturned(req, res);


        console.log("id : " + data);
        const currentUser = await User.findOne({
            _id: data._id
        });

        return res.status(200).send(
            {
                message: 'Success',
                profile: currentUser,
            }
        )
    } catch (error) {
        res.status(200).send(
            {
                message: error
            }
        )
    }
};

const editUserProfile = async (req, res) => { 

};

const editUserAccount = async (req, res) => { 

};

const changeUserPassword = async (req, res) => { 

};

module.exports = {
    getUserProfile,
    editUserProfile,
    editUserAccount,
    changeUserPassword
}
