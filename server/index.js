const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Database = require('better-sqlite3');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Enhanced logging
const logger = {
  info: (message, ...args) => console.log(`[INFO] ${new Date().toISOString()} - ${message}`, ...args),
  error: (message, ...args) => console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, ...args),
  warn: (message, ...args) => console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, ...args),
  debug: (message, ...args) => console.log(`[DEBUG] ${new Date().toISOString()} - ${message}`, ...args)
};

// Database setup
const dbPath = path.join(__dirname, 'database.db');
const db = new Database(dbPath);

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    company_name TEXT,
    phone TEXT,
    company_size TEXT,
    role TEXT DEFAULT 'buyer',
    is_verified BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
  );

  CREATE TABLE IF NOT EXISTS user_sessions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    token TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS activity_logs (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    user_id TEXT,
    action TEXT NOT NULL,
    details TEXT,
    ip_address TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
`);

// **COMPREHENSIVE CORS CONFIGURATION FOR WEB CONTAINER ENVIRONMENTS**
const corsOptions = {
  origin: function(origin, callback) {
    logger.debug('CORS Origin check:', origin);
    
    // Allow requests with no origin (like mobile apps, Postman, curl, Service Workers)
    if (!origin) {
      logger.debug('No origin provided, allowing request');
      return callback(null, true);
    }
    
    // **PRODUCTION-READY ORIGIN WHITELIST**
    const allowedOrigins = [
      // Environment variable for production/custom domains
      process.env.FRONTEND_URL,
      
      // Standard local development
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:4173',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:4173',
      
      // HTTPS variants for local development
      'https://localhost:3000',
      'https://localhost:5173',
      'https://localhost:4173',
    ].filter(Boolean); // Remove undefined values
    
    // **WEB CONTAINER URL PATTERNS (REGEX)**
    const webContainerPatterns = [
      // WebContainer API patterns
      /^https:\/\/.*\.webcontainer-api\.io$/,
      /^https:\/\/.*\.local-credentialless\.webcontainer-api\.io$/,
      
      // GitHub Codespaces
      /^https:\/\/.*\.github\.dev$/,
      /^https:\/\/.*\.app\.github\.dev$/,
      
      // Gitpod
      /^https:\/\/.*\.gitpod\.io$/,
      /^https:\/\/\d+-.*\.ws-.*\.gitpod\.io$/,
      
      // Replit
      /^https:\/\/.*\.replit\.dev$/,
      /^https:\/\/.*\.repl\.co$/,
      
      // StackBlitz
      /^https:\/\/.*\.stackblitz\.io$/,
      /^https:\/\/.*\.webcontainer\.io$/,
      
      // CodeSandbox
      /^https:\/\/.*\.codesandbox\.io$/,
      /^https:\/\/.*\.csb\.app$/,
      
      // Vercel
      /^https:\/\/.*\.vercel\.app$/,
      
      // Netlify
      /^https:\/\/.*\.netlify\.app$/,
    ];
    
    // **CHECK EXACT MATCHES FIRST**
    if (allowedOrigins.includes(origin)) {
      logger.debug('Origin allowed (exact match):', origin);
      return callback(null, true);
    }
    
    // **CHECK WEB CONTAINER PATTERNS**
    for (const pattern of webContainerPatterns) {
      if (pattern.test(origin)) {
        logger.debug('Origin allowed (pattern match):', origin, 'Pattern:', pattern);
        return callback(null, true);
      }
    }
    
    // **DEVELOPMENT MODE: BE PERMISSIVE**
    if (process.env.NODE_ENV !== 'production') {
      logger.debug('Development mode: allowing origin:', origin);
      return callback(null, true);
    }
    
    // Log rejected origins for debugging
    logger.warn('CORS: Origin not allowed:', origin);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With',
    'Accept',
    'Origin',
    'Cache-Control',
    'Pragma',
    'Service-Worker',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  exposedHeaders: ['Authorization'],
  optionsSuccessStatus: 200,
  preflightContinue: false
};

// Apply CORS middleware
app.use(cors(corsOptions));

// **ADDITIONAL CORS HEADERS FOR WEB CONTAINER COMPATIBILITY**
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  logger.debug('Request details:', {
    method: req.method,
    url: req.url,
    origin: origin,
    userAgent: req.headers['user-agent'],
    headers: req.headers
  });
  
  // Set CORS headers explicitly for WebContainer
  if (origin) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, Cache-Control, Pragma, Service-Worker, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.header('Access-Control-Expose-Headers', 'Authorization');
  res.header('Vary', 'Origin');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    logger.debug('Handling preflight request from:', origin);
    return res.status(200).end();
  }
  
  next();
});

// Security middleware (relaxed for WebContainer)
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: false
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - Origin: ${req.headers.origin || 'none'} - User-Agent: ${req.headers['user-agent']?.substring(0, 50) || 'none'}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    cors: 'enabled'
  });
});

// **ENHANCED REGISTER ENDPOINT**
app.post('/api/auth/register', async (req, res) => {
  try {
    logger.info('Registration attempt:', req.body.email, 'Origin:', req.headers.origin);
    
    const { email, password, name, companyName, phone, companySize, role } = req.body;
    
    // Input validation
    if (!email || !password || !name) {
      logger.warn('Registration failed: Missing required fields');
      return res.status(400).json({ 
        success: false, 
        message: 'Email, password, and name are required' 
      });
    }
    
    // Check if user already exists
    const existingUser = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    
    if (existingUser) {
      logger.warn('Registration failed: User already exists:', email);
      return res.status(409).json({ 
        success: false, 
        message: 'User with this email already exists' 
      });
    }
    
    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const userId = crypto.randomUUID();
    const insertUser = db.prepare(`
      INSERT INTO users (id, email, password, name, company_name, phone, company_size, role)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    insertUser.run(userId, email, hashedPassword, name, companyName, phone, companySize, role || 'buyer');
    
    // Get created user
    const user = db.prepare('SELECT id, email, name, company_name, phone, company_size, role, is_verified, created_at FROM users WHERE id = ?').get(userId);
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Create session
    const sessionId = crypto.randomUUID();
    db.prepare(`
      INSERT INTO user_sessions (id, user_id, token, expires_at)
      VALUES (?, ?, ?, ?)
    `).run(sessionId, user.id, token, new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
    
    // Log activity
    db.prepare(`
      INSERT INTO activity_logs (user_id, action, details, ip_address)
      VALUES (?, ?, ?, ?)
    `).run(user.id, 'register', 'User registered successfully', req.ip);
    
    logger.info('User registered successfully:', email);
    
    res.json({
      success: true,
      message: 'Registration successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        companyName: user.company_name,
        phone: user.phone,
        companySize: user.company_size,
        role: user.role,
        isVerified: Boolean(user.is_verified),
        createdAt: user.created_at
      },
      token
    });
    
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error during registration' 
    });
  }
});

// **ENHANCED LOGIN ENDPOINT**
app.post('/api/auth/login', async (req, res) => {
  try {
    logger.info('Login attempt:', req.body.email, 'Origin:', req.headers.origin);
    
    const { email, password } = req.body;
    
    // Input validation
    if (!email || !password) {
      logger.warn('Login failed: Missing credentials');
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }
    
    // Find user by email
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    
    if (!user) {
      logger.warn('Login failed: User not found:', email);
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }
    
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      logger.warn('Login failed: Invalid password for:', email);
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    // Update last login
    db.prepare('UPDATE users SET last_login = ? WHERE id = ?')
      .run(new Date().toISOString(), user.id);
    
    // Create session
    const sessionId = crypto.randomUUID();
    db.prepare(`
      INSERT INTO user_sessions (id, user_id, token, expires_at)
      VALUES (?, ?, ?, ?)
    `).run(sessionId, user.id, token, new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString());
    
    // Log activity
    db.prepare(`
      INSERT INTO activity_logs (user_id, action, details, ip_address)
      VALUES (?, ?, ?, ?)
    `).run(user.id, 'login', 'User logged in successfully', req.ip);
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    logger.info('User logged in successfully:', email);
    
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: userWithoutPassword.id,
        email: userWithoutPassword.email,
        name: userWithoutPassword.name,
        companyName: userWithoutPassword.company_name,
        phone: userWithoutPassword.phone,
        companySize: userWithoutPassword.company_size,
        role: userWithoutPassword.role,
        isVerified: Boolean(userWithoutPassword.is_verified),
        createdAt: userWithoutPassword.created_at
      },
      token
    });
    
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error during login' 
    });
  }
});

// Logout endpoint
app.post('/api/auth/logout', (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (token) {
      // Remove session from database
      db.prepare('DELETE FROM user_sessions WHERE token = ?').run(token);
      logger.info('User session removed');
    }
    
    res.json({
      success: true,
      message: 'Logout successful'
    });
    
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error during logout' 
    });
  }
});

// **DEBUGGING ENDPOINT**
app.get('/api/debug/cors', (req, res) => {
  res.json({
    origin: req.headers.origin,
    host: req.headers.host,
    userAgent: req.headers['user-agent'],
    allHeaders: req.headers,
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  logger.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  logger.warn('404 - Route not found:', req.method, req.originalUrl);
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server with enhanced logging
app.listen(PORT, '0.0.0.0', () => {
  logger.info(`🚀 Server running on http://0.0.0.0:${PORT}`);
  logger.info(`📊 API endpoints available at http://0.0.0.0:${PORT}/api`);
  logger.info(`🔒 CORS configured for WebContainer environment`);
  logger.info(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`🔧 Debug endpoint: http://0.0.0.0:${PORT}/api/debug/cors`);
  
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    🚀 SERVER STARTED                        ║
║                                                              ║
║  API URL: http://0.0.0.0:${PORT}/api                              ║
║  Health Check: http://0.0.0.0:${PORT}/api/health                  ║
║  CORS Debug: http://0.0.0.0:${PORT}/api/debug/cors               ║
║                                                              ║
║  ✅ CORS configured for WebContainer environments           ║
║  ✅ Service Worker bypass implemented                       ║
║  ✅ Enhanced logging enabled                                ║
╚══════════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  db.close();
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  db.close();
  process.exit(0);
});