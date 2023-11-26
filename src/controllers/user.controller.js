const User = require('../models/user');
const { tokenReturned } = require('../middleware/token');
const { getLevelActivity, hitungBMI } = require('../service');


const getUserProfile = async (req, res) => {
    try {
        const { data } = tokenReturned(req, res);

        const currentUser = await User.findById(data._id);

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
    try {
        const { data } = tokenReturned(req, res);

        // Get new data from the request
        const {
            username,
            gender,
            tinggi,
            berat,
            levelAktivitas,
            umur
        } = req.body;

        // Find the user by ID
        const currentUser = await User.findById(data._id)
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's profile data
        if (username) currentUser.username = username;
        if (gender) currentUser.gender = gender;
        if (tinggi) currentUser.tinggi = tinggi;
        if (berat) currentUser.berat = berat;
        if (umur) currentUser.umur = umur;
        if (levelAktivitas) currentUser.levelAktivitas = levelAktivitas;

        // Recalculate BMI and nutrition needs based on new data
        const statusBMI = hitungBMI(berat, tinggi);
        const bmr = gender === 'pria' ? 665 + 13.7 * berat + 5 * tinggi - 6.8 * umur :
            gender === 'perempuan' ? 655 + 9.5 * berat + 1.8 * tinggi - 4.7 * umur : 0;

        const levActivicty = getLevelActivity(levelAktivitas);
        const caloriNeeded = bmr * levActivicty;
        const carboNeeded = (caloriNeeded * 0.65) / 4;
        const proteinNeeded = (caloriNeeded * 0.15) / 4;
        const fatNeeded = (caloriNeeded * 0.2) / 9;

        currentUser.caloriNeeded = caloriNeeded;
        currentUser.carboNeeded = carboNeeded;
        currentUser.proteinNeeded = proteinNeeded;
        currentUser.fatNeeded = fatNeeded;
        currentUser.status = statusBMI;

        // Save the updated user profile
        await currentUser.save();

        // Respond with updated user data
        return res.json({
            message: "profile has been changed successfully",
            changeSuccess: currentUser,
        });
    } catch (error) {
        res.status(500).send({ message: 'error' });
        console.log(error);
    }
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
