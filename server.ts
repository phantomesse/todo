import express = require('express');
import {DataController} from './backend/data-controller';

const dataController = new DataController();
const app: express.Application = express();
app.set('port', process.env.PORT || 1337);

// Serve the Angular app.
app.get('/', (request, response) => {
  response.send({hello: 'world'});
});

// Returns all todo list items.
app.get('/get', (request, response) => {
  response.send(dataController.toDoItems);
});

// Listen on port.
const port = app.get('port');
app.listen(port, () => {
  console.log(`Live at http://localhost:${port}!`);
});
