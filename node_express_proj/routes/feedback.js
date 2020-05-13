const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const feedbacks = await feedbackService.getList();
      response.render('layout', { pageTitle: 'Feedback', template: 'feedback', feedbacks });
    } catch (err) {
      return next(err);
    }
  });

  router.post('/', (request, response) => {
    try {
      return response.send('Feedback form posted.');
    } catch (err) {
      return next(err);
    }
  });

  return router;
};
