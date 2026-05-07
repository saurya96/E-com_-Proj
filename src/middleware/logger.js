import morgan from 'morgan';

/**
 * Custom Morgan Logging Formats and Configuration
 */

// Define custom token for colored response status
morgan.token('colored-status', (req, res) => {
  const status = res.statusCode;
  let color = '';

  if (status >= 500) color = '\x1b[31m'; // Red
  else if (status >= 400) color = '\x1b[33m'; // Yellow
  else if (status >= 300) color = '\x1b[36m'; // Cyan
  else if (status >= 200) color = '\x1b[32m'; // Green
  else color = '\x1b[0m'; // Default

  return `${color}${status}\x1b[0m`;
});

// Custom morgan format
const morganFormat = ':method :url :colored-status :res[content-length] - :response-time ms - :remote-addr';

/**
 * Logger Middleware - Log all HTTP requests
 */
export const logger = morgan(morganFormat);

/**
 * Custom Request Logger
 */
export const requestLogger = (req, res, next) => {
  const startTime = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logLevel = res.statusCode >= 400 ? '⚠️' : '✅';
    
    console.log(
      `${logLevel} [${new Date().toISOString()}] ${req.method} ${req.path} - Status: ${res.statusCode} - ${duration}ms`
    );
  });

  next();
};
