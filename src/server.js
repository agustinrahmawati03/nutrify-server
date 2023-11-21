const express = require('express');
const router = require('./routes');

const app = express();

const port = process.env.PORT || 9000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log('server running at http://localhost:' + port);
});

module.exports = app;
