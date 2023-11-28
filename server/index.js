const express = require('express');

const app = express();
const connection = require('./connection.js'); // Import the connection object
const cors = require('cors');
const bodyParser = require('body-parser');


// Use CORS middleware
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  connection.query('SELECT * FROM studentfeedback', (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(results);
  });
});

app.post('/saveData', (req, res) => {
  const  data  = req.body;
  console.log(data);
  if (data === null) {
    return res.status(400).json({ error: 'Data is required' });
  }
  const columns = Object.keys(data);
  const query = 'INSERT INTO studentfeedback SET ?';
  connection.query(query, data, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err);
      res.status(500).json({ error: `Database error: ${err}` });
      return;
    }

    res.json({ message: 'Data saved successfully' });
  });
});



app.listen(8080, () => {
  console.log(`Server is running on port 8080`);
});