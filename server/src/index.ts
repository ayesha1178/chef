import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ENV } from './config/env.js';
import { connectDatabase } from './config/db.js';
import eventsRoutes from './routes/eventsRoutes.js';
import registrationsRoutes from './routes/registrationsRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: [ENV.CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging in development
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'VANTA Club Event Platform API',
    version: '1.0.0'
  });
});

// Mount Routes
app.use('/api/events', eventsRoutes);
app.use('/api/registrations', registrationsRoutes);
app.use('/api/admin', authRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `API endpoint ${req.method} ${req.originalUrl} not found.`
  });
});

// Global Error Handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[VANTA API Error]', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'An unexpected server error occurred.'
  });
});

// Start Server
async function startServer() {
  await connectDatabase();

  app.listen(ENV.PORT, () => {
    console.log(`====================================================`);
    console.log(`🏛️  VANTA Club API Server running at http://localhost:${ENV.PORT}`);
    console.log(`⚡  Client URL: ${ENV.CLIENT_URL}`);
    console.log(`🔑  Default Admin: ${ENV.ADMIN_EMAIL} / ${ENV.ADMIN_PASSWORD}`);
    console.log(`====================================================`);
  });
}

startServer().catch(err => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
