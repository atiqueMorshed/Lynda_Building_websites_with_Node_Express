const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const routes = require('./routes');
const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const app = express();

app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    keys: ['y893dhf6qo3r32rh8qr9938rqr6qo39rq9r', 'duq2h3879yr32rrhq56iuohr23r89hq3829rh82r'],
  })
);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static('static'));
app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
    // Same as speakersService: speakersService, we are sending class instance and only speakersService will also work.
  })
);

// Global variables
const PORT = 3000;

app.listen(3000, () => console.log(`Server is listening on port ${PORT}`));
