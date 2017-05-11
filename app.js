const express = require('express');
const morgan  = require('morgan' );

const app = express();
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send("I'm ready!");
});

app.use(express.static('public'));

app.listen(3000, () => {
  console.log('listening on port 3000.');
});
