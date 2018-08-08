const axios = require('axios');
const FAVICON_APP_URL =
  process.env.FAVICON_APP_URL ||
  'https://besticon-demo.herokuapp.com/allicons.json';
const PORT = process.env.PORT || 80;

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
    let favicons = {};
    let title = {};

    try {
      const { data } = await axios.get(`${FAVICON_APP_URL}?url=${url}`);
      favicons = data;
    } catch (e) {
      console.error(e);
    }

    try {
      const { data } = await axios.get(url);
      title = data.match(/<title>(.*?)<\/title>/)[1];
    } catch (e) {
      console.error(e);
    }

    console.info(url, {
      favicons,
      title,
    });

    return res.json({
      favicons,
      title,
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
});

app.listen(PORT, () => console.info(`App listening on port ${PORT}!`));
