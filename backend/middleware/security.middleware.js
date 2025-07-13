const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const securityMiddleware = (app) => {
  // Set security headers
  app.use(helmet());

  // Rate limiting
  app.use('/api', limiter);

  // Enable CORS
  app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  }));

  // Prevent XSS attacks
  app.use(xss());

  // Prevent http param pollution
  app.use(hpp());

  // Sanitize data
  app.use((req, res, next) => {
    req.body = JSON.parse(JSON.stringify(req.body));
    next();
  });

  // Add timestamp to requests
  app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
  });

  // Log requests in development
  if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
      console.log(
        `${req.method} ${req.url} [${req.requestTime}]`
      );
      next();
    });
  }
};

module.exports = securityMiddleware;
