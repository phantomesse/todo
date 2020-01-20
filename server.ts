import express from 'express';
import { DataController } from './backend/data-controller';

const dataController = new DataController();
const app: express.Application = express();
const isProd = process.argv.includes('--prod');
const port = isProd ? process.env.PORT || 1337 : 1338;
app.set('port', port);

// Serve the Angular app.
app.use(express.static('build/frontend'));
app.get('/', function(_, response) {
  response.send('index.html');
});

// Returns all todo list items.
app.get('/get', (request, response) => {
  response.send(dataController.toDoItems);
});

// Listen on port.
app.listen(port, () => {
  if (isProd) console.log(`Live at http://localhost:${port}!`);
  else console.log(`Backend running on http://localhost:${port}`);
});
