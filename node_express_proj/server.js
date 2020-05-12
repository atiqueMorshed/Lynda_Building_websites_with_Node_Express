const express = require('express');

const app = express();

// Global variables
const PORT = 3000;

app.get('/', (request, response) => {
  response.send("Hello");
});

app.listen(3000, () => console.log(`Server is listening on port ${PORT}`))