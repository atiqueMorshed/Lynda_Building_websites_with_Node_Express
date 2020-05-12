const express = require('express');
const path = require('path');
const routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static('static'));
app.use('/', routes());

// Global variables
const PORT = 3000;

app.listen(3000, () => console.log(`Server is listening on port ${PORT}`));
