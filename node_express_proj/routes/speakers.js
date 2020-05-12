const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;
  router.get('/', async (request, response) => {
    const speakers = await speakersService.getList();
    return response.json(speakers);
  });

  router.get('/:shortName', (request, response) => {
    return response.send(`Detail page of ${request.params.shortName}`);
  });

  return router;
};
