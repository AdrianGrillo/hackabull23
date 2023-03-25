const express = require('express');
const { Client } = require('pg');

const app = express();

// const client = new Client({
//   user: 'master',
//   host: 'mycockroachdbcluster.db.elephantsql.com',
//   database: 'defaultdb',
//   password: 'BAESOAJl2xY2_ZvZHgrIPw',
//   port: 26257,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

const client = new Client(process.env.DATABASE_URL)

client.connect();

app.get('/', (req, res) => {
  client.query('SELECT * FROM mytable', (err, result) => {
    if (err) {
      console.error(err);
      res.send('An error occurred');
    } else {
      res.send(result.rows);
    }
  });
});

// testing the db
const selectStatement = `SELECT * FROM test;`

app.listen(3001, () => {
  console.log('Server is listening on port 3001');
  console.log(selectStatement);
});
