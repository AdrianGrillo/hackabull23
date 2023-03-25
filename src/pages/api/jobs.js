import fetch from 'node-fetch';

export default async (req, res) => {
  const apiUrl = 'https://jooble.org/api/';
  const key = '2dc943f5-3f44-4d93-8700-e03348d48e31';
  const params = {
    keywords: 'truck driver',
    location: 'kansas city',
  };

  try {
    const response = await fetch(apiUrl + key, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      console.error('Error fetching data from Jooble API:', response.status, response.statusText);
      return res.status(500).json({ error: 'Error fetching data from Jooble API' });
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid content type from Jooble API:', contentType);
      return res.status(500).json({ error: 'Invalid content type from Jooble API' });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching data from Jooble API:', error);
    res.status(500).json({ error: 'Error fetching data from Jooble API' });
  }
};
