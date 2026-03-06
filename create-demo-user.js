const http = require('http');

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

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/auth/signup',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
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
});

req.write(JSON.stringify(demoUser));
req.end();
