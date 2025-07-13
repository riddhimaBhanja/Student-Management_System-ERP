// Test script for API endpoints
const axios = require('axios');

// Base URL from .env file
const API_URL = 'http://localhost:5000/api';

// Test user registration
async function testRegister() {
  try {
    // The request body must be properly formatted JSON
    // The error in the original request was that the JSON was malformed
    // Original error: {name:Test Admin,email:admin@test.com,password:password123,role:admin}
    // Notice the missing quotes around property names and string values
    
    // Correct JSON format
    const response = await axios.post(`${API_URL}/auth/register`, {
      "name": "Test Admin",
      "email": "admin@test.com",
      "password": "password123",
      "role": "admin"
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Registration successful:', response.data);
    return response.data.token;
  } catch (error) {
    console.error('Registration failed:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Test user login
async function testLogin() {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      "email": "admin@test.com",
      "password": "password123"
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Login successful:', response.data);
    return response.data.token;
  } catch (error) {
    console.error('Login failed:', error.response ? error.response.data : error.message);
    return null;
  }
}

// Run tests
async function runTests() {
  console.log('Testing API endpoints...');
  
  // Test registration
  const token = await testRegister();
  
  // Test login if registration was successful
  if (!token) {
    await testLogin();
  }
}

runTests();

/*
To run this test script:
1. Make sure your backend server is running
2. Install axios if not already installed: npm install axios
3. Run the script: node test-api.js

Common issues with JSON parsing:
1. Missing quotes around property names: {name: "value"} should be {"name": "value"}
2. Missing quotes around string values: {"name": value} should be {"name": "value"}
3. Using single quotes instead of double quotes: {'name': 'value'} should be {"name": "value"}
4. Trailing commas: {"name": "value",} is invalid in JSON
5. Comments: JSON doesn't support comments

When making API requests from code, most libraries like axios automatically handle JSON serialization.
However, when using tools like curl or Postman, you need to ensure the JSON is properly formatted.
*/