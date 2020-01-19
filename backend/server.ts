import express = require('express');

const app: express.Application = express();
app.set('port', process.env.PORT || 1337);

app.get('/', (request, response) => {
  response.send({hello: 'world'});
})

// Listen on port.
const port = app.get('port');
app.listen(port, () => {
  console.log(`Live at http://localhost:${port}!`);
});
