const express = require('express');
const { Client } = require('pg');
const fetch = require('node-fetch');
const app = express();

const DATABASE_URL = 'postgresql://master:BAESOAJl2xY2_ZvZHgrIPw@hackabull23-9761.7tt.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full'
const client = new Client(DATABASE_URL)
client.connect();

const city = 'tampa-fl'

async function insertData(city) {
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
