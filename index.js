const axios = require('axios');
const FAVICON_APP_URL = 'https://besticon-demo.herokuapp.com/allicons.json';

const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

app.get('/', async (req, res) => {
  try {
    const url = req.query.url;
    const { data } = await axios.get(`${FAVICON_APP_URL}?url=${url}`);
    console.info(data, url);

    if (!data) {
      return res.status(404);
    }

    return res.json({ data });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
});

app.listen(8080, () => console.log('Example app listening on port 8080!'));
