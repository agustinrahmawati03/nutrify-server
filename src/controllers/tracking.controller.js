const { tokenReturned } = require('../middleware/token');
const foodModel = require('../models/food');
const Tracking = require('../models/tracking');
const { findByDate, totalNutri } = require('../service');

const addTracking = async (req, res) => {
  try {
    // validasi user is login
    const { data } = tokenReturned(req, res);

    // get data from request
    const userId = data._id;
    let food = req.body.food;

    // find user
    const trackExist = await Tracking.findOne({ user: userId });
    const tanggal = new Date();
    let today = tanggal.toLocaleDateString('fr-CA');

    const tracking = {
      date: today,
      food: food,
    };

    // cek apakah ada track sebelumnya
    if (trackExist) {
      const trackingIndex = findByDate(trackExist.tracking, today);

      // jika track sebelumnya sudah terdapat tracking dihari yang sama

      if (trackingIndex >= 0) {
        trackExist.tracking[trackingIndex].food.push(food);

        await trackExist.save();

        return res
          .status(200)
          .json({ message: 'tracking success', body: trackExist });
      }
      trackExist.tracking.push(tracking);

      await trackExist.save();
      return res
        .status(200)
        .json({ message: 'add success', body: trackExist });
    }
    // cek apakah merupakan track baru

    const newTrack = {
      user: userId,
      tracking: [tracking],
    };
    const dataSaved = new Tracking(newTrack);

    await dataSaved.save();
    res
      .status(200)
      .json({ message: 'add new tracking success', body: dataSaved });
    // tambahkan kedatabase
  } catch (error) {
    console.log(error);
  }
};

const getTrackingToday = async (req, res) => {
  // validitasi token
  const { data } = tokenReturned(req, res);
  const userId = data._id;
  // get date

  const tanggal = new Date();
  let today = tanggal.toLocaleDateString('fr-CA');
  let todayTrack = null;

  try {
    const tracking = await Tracking.findOne({
      user: userId,
    }).populate({
      path: 'tracking',
      populate: {
        path: 'food',
        populate: 'foodId',
      },
    });

    // if today tracking is null
    if (tracking === null) {
      return res.status(201).json({
        message: 'belum ada tracking',
      });
    }

    // if today tracking is found
    const todayTracking = findByDate(tracking.tracking, today);

    if (todayTracking > -1) {
      todayTrack = tracking.tracking[todayTracking];
    }

    const result = totalNutri(todayTrack);

    res.status(200).json({
      message: 'Get tracking success',
      body: {
        _id: tracking._id,
        user: tracking.user,
        tracking: todayTrack,
        result,
      },
    });

    // response tracking
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addTracking, getTrackingToday };
