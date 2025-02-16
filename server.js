const express = require('express');
const allrouter = require('./src/routes');
const database = require('./src/config/database');
const app = express();
var cors = require('cors');
const { sendEmail } = require('./src/service/mailer');
app.use(cors());

const port = process.env.PORT || 9000;

app.use(express.json());
app.use(allrouter);

database
  .then(() => {
    console.log('connect database successfully !');
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log('server running at http://localhost:' + port);
});

// setInterval(() => { 
//   console.log ('email reminder akan dikirim');
//   const info = sendEmail('reminder', 'rhmagstn08@gmail.com', 'isi tracking mu', {
//     name : 'john' , greeting : 'selamat pagi'
//   });
//   console.log (info);
// }, 7 * 24 * 60 * 60 * 1000);

require ("./src/service/cron")

module.exports = app;

