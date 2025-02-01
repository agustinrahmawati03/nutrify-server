const cron = require('node-cron');
const { collectUsers, sendReminders } = require('../controllers/reminder.controller');

// Run the collector every Sunday at 12:00 AM
cron.schedule('0 0 * * 0', async () => {
  try {
    console.log('Running reminder collector...');
    await collectUsers();
  } catch (err) {
    console.error('Error collecting reminder: ', err.message)
  }
});

// Run the sender every minute on Sunday
cron.schedule('* * * * 0', async () => {
  try {
    console.log('Running reminder sender...');
    await sendReminders();
  } catch (error) {
    console.error('Error sending reminder: ', err.message)
  }
});

console.log('Cron jobs have been set up.');
