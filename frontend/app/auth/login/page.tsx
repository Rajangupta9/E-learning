'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography, Paper, Container, Alert, CircularProgress, InputAdornment, IconButton, Grid } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, ArrowBack } from '@mui/icons-material';
import { authService } from '@/services/authService';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await authService.login({ email, password });
      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', bgcolor: 'background.default' }}>
      {/* Left Side - Image/Brand */}
      <Box sx={{
        display: { xs: 'none', md: 'flex' },
        width: '50%',
        bgcolor: 'primary.main',
        position: 'relative',
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        p: 8
      }}>
        <Box sx={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.1)', filter: 'blur(60px)' }} />
        <Box sx={{ position: 'absolute', bottom: -50, left: -50, width: 300, height: 300, borderRadius: '50%', bgcolor: 'rgba(0,0,0,0.1)', filter: 'blur(60px)' }} />

        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 480 }}>
          <Typography variant="h3" fontWeight="800" gutterBottom>Welcome Back!</Typography>
          <Typography variant="h6" sx={{ fontWeight: 400, opacity: 0.9, lineHeight: 1.6 }}>
            "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', gap: 1 }}>
            <Box sx={{ width: 40, height: 4, bgcolor: 'white', borderRadius: 2 }} />
            <Box sx={{ width: 10, height: 4, bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
            <Box sx={{ width: 10, height: 4, bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
          </Box>
        </Box>
      </Box>

      {/* Right Side - Form */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', p: { xs: 4, md: 8 } }}>
        <Container maxWidth="xs">
          <Button startIcon={<ArrowBack />} component={Link} href="/" sx={{ mb: 4, color: 'text.secondary' }}>
            Back to Home
          </Button>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" fontWeight="800" gutterBottom>Sign In</Typography>
            <Typography color="text.secondary">Enter your details to access your account</Typography>
          </Box>

          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Email color="action" /></InputAdornment>,
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Lock color="action" /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
              <Link href="#" style={{ textDecoration: 'none', color: '#4F46E5', fontWeight: 600, fontSize: '0.875rem' }}>
                Forgot Password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ py: 1.5, mb: 3, fontSize: '1rem' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>

            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link href="/auth/register" style={{ textDecoration: 'none', color: '#4F46E5', fontWeight: 600 }}>
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}