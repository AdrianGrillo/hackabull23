const express = require('express');
const { Client } = require('pg');
const fetch = require('node-fetch');
const app = express();

const DATABASE_URL = 'postgresql://master:BAESOAJl2xY2_ZvZHgrIPw@hackabull23-9761.7tt.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full'
const client = new Client(DATABASE_URL)
client.connect();

async function insertData() {
    const response = await fetch(`https://zylalabs.com/api/226/cities+cost+of+living+and+average+prices+api/655/cost+of+living+by+city?country=united-states`, {
    headers: {
        'Authorization': 'Bearer 1031|Cz5i9bS9RqlZNApWSMNzwHcpiQB2LgyXKoWDApoq'
    }
    });

    const data = await response.json();

    await client.query('INSERT INTO cities(name, state) VALUES($1, $2) ON CONFLICT (name, state) DO UPDATE SET name = $1, state = $2', [data["City Name"], data["Country Name"]]);

    // Insert data into groceries table
    const groceries = data["Markets prices"].map(grocery => [grocery["Cost"], grocery["Value"], data["City Name"].split(" ")[0], data["City Name"].split(" ")[1]]);
    const flattenedGroceries = groceries.flat();
    const query1 = 'INSERT INTO groceries(item_name, price, city_name, city_state) VALUES ($1, $2, $3, $4) ON CONFLICT (item_name) DO UPDATE SET price = excluded.price, city_state = excluded.city_state';
    await client.query(query1, flattenedGroceries);

    // Insert data into housing table
    const housing = data["Rent Per Month prices"].map(housing => [housing["Type"], housing["Cost"], data["City Name"].split(" ")[0], data["City Name"].split(" ")[1]]);
    const flattenedHousing = housing.flat();
    const query2 = 'INSERT INTO housing(type, price, city_name, city_state) VALUES ($1, $2, $3, $4) ON CONFLICT (type, city_name, city_state) DO UPDATE SET price = excluded.price';
    await client.query(query2, flattenedHousing);
  
    console.log('Data inserted successfully');
  }
  
  app.get('/', async (req, res) => {
    try {
      await insertData();
      res.sendStatus(200);
    } catch (error) {
      console.error('Error:', error);
      res.sendStatus(500);
    }
  });

  app.get('/cities', (req, res) => {
  client.query('SELECT * FROM cities;', (err, result) => {
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
