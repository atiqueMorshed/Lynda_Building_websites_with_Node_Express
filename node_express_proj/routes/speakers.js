const express = require('express');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    return response.send('Speakers list');
  });

  router.get('/:shortName', (request, response) => {
    return response.send(`Detail page of ${request.params.shortName}`);
  });

  return router;
};
