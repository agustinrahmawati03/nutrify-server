const User = require('../models/user');
const Tracking = require('../models/tracking');
const Reminder = require('../models/reminder');
const { sendEmail } = require('../service/mailer');

const collectUsers = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Find users with no tracking in the last 7 days
    const usersWithoutTracking = await User.find({
      _id: {
        $nin: await Tracking.distinct('user', {
          'tracking.date': { $gte: sevenDaysAgo },
        }),
      },
    });

    // Add users to the Reminder collection
    const reminders = usersWithoutTracking.map((user) => ({
      userId: user._id,
      email: user.email,
      replacer: {
        username: user.username,
      },
      isSent: false,
    }));

    await Reminder.insertMany(reminders);
    if (res) {
      res.status(200).json({
        message: "Reminder collected successfully",
        data: { reminders }
      })
    } else {
      return reminders;
    }
  } catch (error) {
    throw error;
  }
};

const sendReminders = async (limit = 2) => {
  try {
    const remindersToSend = await Reminder.find({ isSent: false }).limit(limit);

    for (const reminder of remindersToSend) {
      const { email, replacer } = reminder;
      
      try {
        replacer.link = "http://localhost:5173/"
        const info = await sendEmail ("reminder", email , "ayo tracking", replacer);
        
      } catch (error) {
        console.error (error.message);
      }

      await Reminder.updateOne(
        { _id: reminder._id },
        { $set: { isSent: true } }
      );
    }

  } catch (error) {
    console.error('Error sending reminders:', error);
  }
};

module.exports = {
  collectUsers, sendReminders,
};
