import fetch from 'node-fetch'
import { headers } from '../../../next.config'

export default async (req, res) => {
const response = await fetch('https://api.indeed.com/ads/apisearch?publisher=123412341234123&q=java+developer&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2', {
    headers: {
        'Authorization': 'Bearer 1031|Cz5i9bS9RqlZNApWSMNzwHcpiQB2LgyXKoWDApoq'
    }
})
  const data = await response.json()

  res.status(200).json(data)
}
