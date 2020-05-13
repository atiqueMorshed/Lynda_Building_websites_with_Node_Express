const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;

  router.get('/', async (request, response, next) => {
    try {
      const feedbacks = await feedbackService.getList();

      const errors = request.session.feedback.errors ? request.session.feedback.errors : false;
      const success = request.session.feedback.message ? request.session.feedback.message : false;
      request.session.feedback = {};

      response.render('layout', {
        pageTitle: 'Feedback',
        template: 'feedback',
        feedbacks,
        errors,
        success,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.post(
    '/',
    [
      check('name').trim().isLength(5, 25).escape().withMessage('Name is a required field.'),
      check('email').trim().isEmail().normalizeEmail().withMessage('Email is a required field.'),
      check('title').trim().isLength({ min: 5 }).escape().withMessage('Title is a required field.'),
      check('message')
        .trim()
        .isLength({ min: 10 })
        .escape()
        .withMessage('Email is a required field.'),
    ],
    async (request, response, next) => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        // When error found
        request.session.feedback = {
          errors: errors.array(),
        };
        return response.redirect('/feedback');
      }

      const { name, email, title, message } = request.body;
      await feedbackService.addEntry(name, email, title, message);
      request.session.feedback = {
        message: 'Thank you for your feedback!',
      };

      return response.redirect('/feedback');
    }
  );

  return router;
};
