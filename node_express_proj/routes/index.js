const express = require('express');
const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (request, response) => {
    // if (!request.session.visitcount) request.session.visitcount = 0;
    // request.session.visitcount += 1;
    // console.log(`Number of visits: ${request.session.visitcount}`);
    const topSpeakers = await speakersService.getList();
    response.render('layout', {
      pageTitle: 'Welcome',
      template: 'index',
      topSpeakers: topSpeakers,
    });
  });

  router.use('/feedback', feedbackRoute(params));
  router.use('/speakers', speakersRoute(params));

  return router;
};
