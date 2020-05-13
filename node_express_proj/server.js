const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');

const routes = require('./routes');
const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const app = express();

app.set('trust proxy', 1);

app.locals.siteName = 'Roux Meetups'; //This variable is available to all the template files.

app.use(async (request, response, next) => {
  try {
    const names = await speakersService.getNames();
    response.locals.speakerNames = names;
    return next();
  } catch (err) {
    return next(err);
  }
});
app.use(
  cookieSession({
    name: 'session',
    keys: ['y893dhf6qo3r32rh8qr9938rqr6qo39rq9r', 'duq2h3879yr32rrhq56iuohr23r89hq3829rh82r'],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static('static'));

app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
    // Same as
    // {
    // speakersService: speakersService,
    // feedbackService: feedbackService
    // } we are sending class instance and only speakersService will also work.
  })
);
app.use((request, response, next) => {
  return next(createError(404, 'Page not found.(Custom error server.js L51)'));
});

app.use((err, request, response, next) => {
  const status = err.status || 500;
  response.locals.message = err.message;
  response.locals.status = status;
  response.status(status);
  response.render('error');
});

// Global variables
const PORT = 3000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
