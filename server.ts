import express from 'express';
import cors from 'cors';
import { DataController } from './backend/data-controller';

const dataController = new DataController();
const app: express.Application = express();

// Get whether the app is running in prod.
const isProd = process.argv.includes('--prod');

// Set the port.
const port = isProd ? process.env.PORT || 1337 : 1338;
app.set('port', port);

// Allow cross-origin in dev mode.
if (!isProd) {
  app.use(
    cors({
      origin: 'http://localhost:1337',
      optionsSuccessStatus: 200
    })
  );
}

// Serve the Angular app.
app.use(express.static('build/frontend'));

// Returns all todo list items.
app.get('/get', (request, response) => {
  response.send(dataController.toDoItems);
});

// Listen on port.
app.listen(port, () => {
  if (isProd) console.log(`Live at http://localhost:${port}!`);
  else console.log(`Backend running on http://localhost:${port}`);
});
