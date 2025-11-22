import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'up', service: 'auth-service' });
});

export default app;
