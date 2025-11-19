'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Box, Button, Container, TextField, Typography, Grid, Paper, Alert } from '@mui/material';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const endpoint = isLogin ? 'http://localhost:4001/login' : 'http://localhost:4001/signup';
        const body = isLogin ? { email, password } : { email, password, name };

        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            // Store token
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            // Redirect to dashboard
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Grid container sx={{ minHeight: '100vh' }}>
            {/* Left Side - Image/Brand */}
            <Grid item xs={12} md={6} sx={{
                display: { xs: 'none', md: 'flex' },
                bgcolor: 'primary.main',
                position: 'relative',
                alignItems: 'center',
                justifyContent: 'center',
                p: 6,
                overflow: 'hidden'
            }}>
                <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #4F46E5 0%, #7E22CE 100%)', opacity: 0.9 }} />

                <Box sx={{ position: 'relative', zIndex: 1, color: 'white', maxWidth: 480 }}>
                    <Box sx={{ width: 48, height: 48, bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
                        <Typography variant="h5" fontWeight="bold">S</Typography>
                    </Box>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>Start your learning journey today.</Typography>
                    <Typography variant="h6" sx={{ color: 'primary.light', fontWeight: 400, mb: 6 }}>
                        Join our community of 50,000+ learners and master new skills with expert-led courses.
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                                <Typography variant="h4" fontWeight="bold">1k+</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>Premium Courses</Typography>
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper sx={{ p: 3, bgcolor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
                                <Typography variant="h4" fontWeight="bold">4.9</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>User Rating</Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>

            {/* Right Side - Form */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
                <Container maxWidth="sm">
                    <Box sx={{ mb: 5 }}>
                        <Typography variant="h4" fontWeight="bold" gutterBottom>
                            {isLogin ? 'Welcome back!' : 'Create an account'}
                        </Typography>
                        <Typography color="text.secondary">
                            {isLogin ? 'Please enter your details to sign in.' : 'Enter your details to get started for free.'}
                        </Typography>
                    </Box>

                    {error && (
                        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {!isLogin && (
                            <TextField
                                label="Full Name"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                InputProps={{ sx: { borderRadius: 3 } }}
                            />
                        )}
                        <TextField
                            label="Email Address"
                            type="email"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            InputProps={{ sx: { borderRadius: 3 } }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            InputProps={{ sx: { borderRadius: 3 } }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ py: 1.5, fontSize: '1rem' }}
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </Button>
                    </Box>

                    <Box sx={{ mt: 4, textAlign: 'center' }}>
                        <Typography color="text.secondary">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <Button
                                onClick={() => setIsLogin(!isLogin)}
                                sx={{ fontWeight: 'bold', textTransform: 'none' }}
                            >
                                {isLogin ? 'Sign Up' : 'Log In'}
                            </Button>
                        </Typography>
                    </Box>

                    <Box sx={{ mt: 6, pt: 4, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
                        <Button component={Link} href="/" color="inherit" sx={{ textTransform: 'none', color: 'text.secondary' }}>
                            &larr; Back to Home
                        </Button>
                    </Box>
                </Container>
            </Grid>
        </Grid>
    );
}
