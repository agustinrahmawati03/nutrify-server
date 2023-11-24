const { tokenReturned } = require('../middleware/token');
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
    res.status(500).send({ error: error.message });
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
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getTrackingByDate = async (req, res) => {
  const { data } = tokenReturned(req, res);
  const userId = data._id;

  let { date } = req.body;
  let dateTrack = null;
  try {
    // throw err when date not found
    if (!date) {
      return res
        .status(400)
        .send({ message: 'please choose the date !' });
    }
    // get data tracking by user
    const tracking = await Tracking.findOne({
      user: userId,
    }).populate({
      path: 'tracking',
      populate: {
        path: 'food',
        populate: 'foodId',
      },
    });

    // handle res when tracking null
    if (tracking === null) {
      return res.status(500).json({ message: 'tracking not found' });
    }

    // find data tracking by date

    const dateTracking = findByDate(tracking.tracking, date);
    if (dateTracking < 0) {
      return res.status(500).json({ message: 'tracking not found' });
    }

    if (dateTracking > -1) {
      dateTrack = tracking.tracking[dateTracking];
    }
    const result = totalNutri(dateTrack);

    return res.status(200).json({
      message: 'success',
      body: {
        _id: tracking._id,
        user: tracking.user,
        tracking: dateTrack,
        result,
      },
    });

    //
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = { addTracking, getTrackingToday, getTrackingByDate };
