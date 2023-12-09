const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './.env' });
const { SECRET_KEY } = process.env;

module.exports = {
  tokenGenerated: (data) => {
    const token = jwt.sign({ data }, SECRET_KEY, {
      expiresIn: '20h',
    });
    return token;
  },

  tokenVerified: (request, response, next) => {
    try {
      const token = request.headers.authorization;
      const verified = jwt.verify(token.split(' ')[1], SECRET_KEY);
      if (verified) {
        next();
      }
    } catch (error) {
      response
        .status(401)
        .send({ message: error.message });
      response.end();
    }
  },

  onlyAdmin: (request, response, next) => {
    try {
      const token = request.headers.authorization;
      const verified = jwt.verify(token.split(' ')[1], SECRET_KEY);
      if (verified.data.role === 'admin') {
        next();
      } else {
        response.status(401).send('Unauthorized, forbidden');
        response.end();
      }
    } catch (error) {
      response.status(401).send({ message: error.message });
      response.end();
    }
  },
  tokenReturned: (request, response) => {
    try {
      const token = request.headers.authorization;
      const verified = jwt.verify(token.split(' ')[1], SECRET_KEY);
      return verified;
    } catch (error) {
      console.log('token is invalid');
    }
  },
  forUser: (request, response, next) => {
    try {
      const token = request.headers.authorization;
      const verified = jwt.verify(token.split(' ')[1], SECRET_KEY);
      if (verified.data.role === 'user') {
        next();
      } else {
        response
          .status(401)
          .send({ message: 'unauthorized, forbidden ' });
        response.end();
      }
    } catch (error) {
      response.status(401).send({ error: error.message });
      response.end();
    }
  },
};
