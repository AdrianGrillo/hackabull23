const express = require('express');
const { Client } = require('pg');

const app = express();

const DATABASE_URL = 'postgresql://master:BAESOAJl2xY2_ZvZHgrIPw@hackabull23-9761.7tt.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full'
const client = new Client(DATABASE_URL)

client.connect();

app.get('/', (req, res) => {
  client.query('SELECT * FROM test;', (err, result) => {
    if (err) {
      console.error(err);
      res.send('An error occurred');
    } else {
      res.send(result.rows);
    }
  });
});

app.listen(3001, () => {
  console.log('Server is listening on port 3001');
});
