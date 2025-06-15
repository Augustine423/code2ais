const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 4000;
const identifier = '077edd86-dc19-4191-b363-08a0d1b7dd58';
app.use(cors());
app.use(express.static('public'));
async function login() {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json;charset=utf-8'
  };
  const data = {
    grant_type: 'password',
    id: 'dron',
    pw: 'dron1234!'
  };
  const response = await axios.post(
    `https://gw.airwith.co.kr/api/v1/${identifier}`,
    data,
    { headers }
  );
  return response.data;
}
app.get('/api/devices', async (req, res) => {
  try {
    const { token_type, access_token } = await login();
    const response = await axios.get(
      `https://gw.airwith.co.kr/api/v1/${identifier}/devices`,
      {
        headers: {
          'Authorization': `${token_type} ${access_token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching devices:', err.message);
    res.status(500).json({ error: 'Device fetch failed' });
  }
});
app.get('/api/datalogs', async (req, res) => {
  try {
    const { token_type, access_token } = await login();
    const response = await axios.get(
      `https://gw.airwith.co.kr/api/v1/${identifier}/datalogs`,
      {
        headers: {
          'Authorization': `${token_type} ${access_token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=utf-8'
        }
      }
    );
    res.json(response.data);
  } catch (err) {
    console.error('Error fetching datalogs:', err.message);
    res.status(500).json({ error: 'Datalog fetch failed' });
  }
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});