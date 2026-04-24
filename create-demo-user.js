const http = require('https');

// Configuration: Change this URL based on your environment
// Local: http://localhost:10000
// Render: https://space-airline-app.onrender.com ✅ PRODUCTION DEFAULT
// Vercel: https://your-backend-api-url.com
const API_BASE_URL = process.env.API_URL || 'https://space-airline-app.onrender.com';

const demoUser = {
  email: "demo@airline.com",
  password: "Demo@123",
  firstName: "Demo",
  lastName: "User",
  phone: "9876543210",
  address: "123 Airline Street",
  city: "New York",
  country: "USA",
  passportNumber: "US1234567"
};

const url = new URL(`${API_BASE_URL}/airline/api/auth/signup`);
const options = {
  hostname: url.hostname,
  port: url.port || (url.protocol === 'https:' ? 443 : 80),
  path: url.pathname,
  method: 'POST',
  protocol: url.protocol,
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = require(url.protocol === 'https:' ? 'https' : 'http').request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('✓ Demo user created successfully!');
    console.log('\n=== LOGIN CREDENTIALS ===');
    console.log('Email:    demo@airline.com');
    console.log('Password: Demo@123');
    console.log('======================\n');
    console.log('Response:', data);
  });
});

req.on('error', (error) => {
  console.error('Error:', error.message);
  console.error('\nMake sure:');
  console.error('1. Backend server is running');
  console.error('2. API_URL environment variable is set correctly (or defaults to Render)');
  console.error('\nUsage:');
  console.error('  node create-demo-user.js                          # Uses Render (default)');
  console.error('  API_URL=http://localhost:8080 node create-demo-user.js  # Local dev');
  console.error('  API_URL=https://your-backend-url.com node create-demo-user.js  # Custom URL');
});

req.write(JSON.stringify(demoUser));
req.end();
