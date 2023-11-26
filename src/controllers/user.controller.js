const User = require('../models/user');
const { tokenReturned } = require('../middleware/token');
const bcrypt = require('bcryptjs');
const { getLevelActivity, hitungBMI, validateUserProfileData } = require('../service');

const getUserProfile = async (req, res) => {
    try {
        const { data } = tokenReturned(req, res);
        const currentUser = await User.findById(data._id);
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password, ...userWithoutPassword } = currentUser.toObject();
        return res.status(200).json({ message: 'Success', profile: userWithoutPassword });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
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

        if (!validateUserProfileData(req.body)) {
            return res.status(400).json({ message: 'Invalid user profile data' });
        }

        const currentUser = await User.findById(data._id);
        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        currentUser.username = username;
        currentUser.gender = gender;
        currentUser.tinggi = tinggi;
        currentUser.berat = berat;
        currentUser.umur = umur;
        currentUser.levelAktivitas = levelAktivitas;

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

        await currentUser.save();

        const { password, ...updatedUser } = currentUser.toObject();
        return res.json({
            message: "Profile updated successfully",
            changeSuccess: updatedUser
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const changeUserPassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const { data } = tokenReturned(req, res);
        const currentUser = await User.findById(data._id);

        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, currentUser.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password' });
        }
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'New passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        currentUser.password = hashedPassword;
        await currentUser.save();

        const { password, ...userWithoutPassword } = currentUser.toObject();
        res.json({
            message: 'Password updated successfully',
            changeSuccess: userWithoutPassword

        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getUserProfile,
    editUserProfile,
    changeUserPassword
};
