const express = require('express');
const allrouter = require('./routes');
const database = require('./config/database');
const app = express();
var cors = require('cors');
const { sendEmail } = require('./service/mailer');
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

const cronActivated = process.env.CRONJOB_ACTIVATED || false;
if (cronActivated) {
  require('./service/cron');
}

module.exports = app;
