import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  }),
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[AuthService] Received: ${req.method} ${req.url}`);
  next();
});

app.use('/', authRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'up', service: 'auth-service' });
});

export default app;
