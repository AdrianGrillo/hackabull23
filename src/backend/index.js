const express = require('express');
const { Client } = require('pg');
const fetch = require('node-fetch');
const { default: cities } = require('@/pages/api/cities');
const app = express();

const DATABASE_URL = 'postgresql://master:BAESOAJl2xY2_ZvZHgrIPw@hackabull23-9761.7tt.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full'
const client = new Client(DATABASE_URL)
client.connect();

// test city
const city = 'tampa-fl'

// insert data if not in database
async function insertData(city, state) {
    const res = await client.query('SELECT COUNT(*) FROM cities WHERE name = $1 AND state = $2',
[city, state]
  );
  if (res.rows[0].count > 0) {
    return;
  }
    const response = await fetch(`https://zylalabs.com/api/226/cities+cost+of+living+and+average+prices+api/655/cost+of+living+by+city?country=united-states&city=${city}`, {
        headers: {
            'Authorization': 'Bearer 1031|Cz5i9bS9RqlZNApWSMNzwHcpiQB2LgyXKoWDApoq'
        }
    });
    const data = await response.json();

    const query = 'INSERT INTO cities (name, state, col_monthly_total, api_data) VALUES ($1, $2, $3, $4) ON CONFLICT (name, state) DO NOTHING';
    const values = [data['City Name'].split(" ")[0], data['City Name'].split(" ")[1], parseFloat(data['Cost of Living Month Total']), JSON.stringify(data)];
    
    client.query(query, values, (err, res) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Data inserted successfully');
    });
}
  
app.get('/', async (req, res) => {
    try {
        await insertData(city);
        client.query('SELECT * FROM cities', (err, result) => {
            if (err) {
                console.error(err);
                res.send('An error occurred');
            } else {
                res.send(result.rows);
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.sendStatus(500);
    }
});

app.listen(3001, () => {
    console.log('Server is listening on port 3001');
});

// Selecting and sorting from database
async function getCityAscending(cityName, stateName) {
    const query = `SELECT col_monthly_total, name, state FROM cities WHERE name=$1 AND state=$2 ORDER BY col_monthly_total ASC;`;
    const values = [cityName, stateName];
  
    try {
      const result = await client.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  