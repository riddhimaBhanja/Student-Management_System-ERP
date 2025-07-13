# API Testing with cURL

## Introduction

This document provides examples of how to test the Student Management System API using cURL commands. The error you encountered was related to malformed JSON in the request body.

## Common JSON Formatting Errors

1. **Missing quotes around property names**: 
   - Incorrect: `{name: "value"}`
   - Correct: `{"name": "value"}`

2. **Missing quotes around string values**: 
   - Incorrect: `{"name": value}`
   - Correct: `{"name": "value"}`

3. **Using single quotes instead of double quotes**: 
   - Incorrect: `{'name': 'value'}`
   - Correct: `{"name": "value"}`

4. **Trailing commas**: 
   - Incorrect: `{"name": "value",}`
   - Correct: `{"name": "value"}`

## The Error You Encountered

Your original request body was:
```
{name:Test Admin,email:admin@test.com,password:password123,role:admin}
```

This is not valid JSON because:
- Property names are not enclosed in quotes
- String values are not enclosed in quotes
- No commas between key-value pairs

## Correct cURL Commands

### Register a New User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Admin","email":"admin@test.com","password":"password123","role":"admin"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}'
```

### Access Protected Routes (with JWT Token)

```bash
curl -X GET http://localhost:5000/api/students \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Using Tools Like Postman

If you're using Postman or similar API testing tools:

1. Set the request method to POST
2. Set the URL to http://localhost:5000/api/auth/register
3. Go to the "Headers" tab and add `Content-Type: application/json`
4. Go to the "Body" tab, select "raw" and choose "JSON" from the dropdown
5. Enter the request body in proper JSON format:

```json
{
  "name": "Test Admin",
  "email": "admin@test.com",
  "password": "password123",
  "role": "admin"
}
```

## Troubleshooting

If you continue to encounter issues:

1. Verify that your backend server is running
2. Check that the API endpoint is correct
3. Ensure your JSON is properly formatted
4. Look for any validation errors in the response
5. Check server logs for more detailed error information