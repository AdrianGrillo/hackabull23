import fetch from 'node-fetch'
import { headers } from '../../../next.config'

export default async (req, res) => {
const response = await fetch('https://zylalabs.com/api/226/cities+cost+of+living+and+average+prices+api/655/cost+of+living+by+city?country=united-states&city=tampa-fl', {
    headers: {
        'Authorization': 'Bearer 1031|Cz5i9bS9RqlZNApWSMNzwHcpiQB2LgyXKoWDApoq'
    }
})
  const data = await response.json()

  res.status(200).json(data)
}