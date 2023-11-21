const express = require('express');
const allrouter = require('./routes');

const app = express();

const port = process.env.PORT || 9000;

app.use(express.json());
app.use(allrouter);

app.listen(port, () => {
  console.log('server running at http://localhost:' + port);
});

module.exports = app;
