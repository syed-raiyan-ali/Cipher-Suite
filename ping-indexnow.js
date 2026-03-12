const https = require('https');

const INDEXNOW_KEY = '230ac269a23c4a2db65c3c2f0f421e42';
const SITE_URL = encodeURIComponent('https://cipher-suite16.web.app/');

const options = {
  hostname: 'api.indexnow.org',
  path: `/indexnow?url=${SITE_URL}&key=${INDEXNOW_KEY}`,
  method: 'GET',
};

const req = https.request(options, (res) => {
  console.log(`✅ IndexNow ping sent! Status: ${res.statusCode}`);
  res.on('data', (d) => process.stdout.write(d));
});

req.on('error', (err) => {
  console.error('❌ IndexNow ping failed:', err.message);
});

req.end();
