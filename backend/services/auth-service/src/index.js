const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const PORT = 4001;
const SECRET_KEY = 'supersecretkey'; // In production, use environment variable

app.use(express.json());
app.use(cors());

// Request logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Body:', JSON.stringify(req.body));
    next();
});

// In-memory user store
const users = [];

// Helper to find user
const findUser = (email) => users.find(u => u.email === email);

app.post('/signup', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        if (findUser(email)) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now(), email, password: hashedPassword, name };
        users.push(newUser);

        const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', token, user: { id: newUser.id, email: newUser.email, name: newUser.name } });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = findUser(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });

        res.json({ message: 'Login successful', accessToken: token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Add /register as an alias for /signup to match frontend expectations
app.post('/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        if (findUser(email)) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now(), email, password: hashedPassword, name };
        users.push(newUser);

        const token = jwt.sign({ id: newUser.id, email: newUser.email }, SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', accessToken: token, user: { id: newUser.id, email: newUser.email, name: newUser.name } });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/verify', (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        res.json({ message: 'Token is valid', user: decoded });
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'auth-service' });
});

app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});
