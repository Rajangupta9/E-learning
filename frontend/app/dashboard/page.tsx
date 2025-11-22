'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Grid, Card, CardContent, Button, LinearProgress, Avatar, Chip, IconButton } from '@mui/material';
import { PlayCircleOutline, TrendingUp, AccessTime, Star } from '@mui/icons-material';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token) {
      router.push('/auth/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  if (!user) {
    return <Box p={3}>Loading...</Box>;
  }

  return (
    <Box className="animate-fade-in">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="800" gutterBottom>
          Hello, {user.name?.split(' ')[0] || 'Student'}! 👋
        </Typography>
        <Typography color="text.secondary">
          You've learned 80% more this week. Keep it up!
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {[
          { label: 'Courses in Progress', value: '4', sub: '+2 new', color: 'primary.main', bgcolor: 'rgba(79, 70, 229, 0.1)', icon: <PlayCircleOutline /> },
          { label: 'Completed Courses', value: '12', sub: 'Top 5%', color: 'success.main', bgcolor: 'rgba(16, 185, 129, 0.1)', icon: <Star /> },
          { label: 'Hours Learned', value: '128h', sub: '+12h this week', color: 'secondary.main', bgcolor: 'rgba(236, 72, 153, 0.1)', icon: <AccessTime /> }
        ].map((stat, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4, transition: '0.3s', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' } }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar variant="rounded" sx={{ bgcolor: stat.bgcolor, color: stat.color }}>
                    {stat.icon}
                  </Avatar>
                  <Chip label={stat.sub} size="small" sx={{ bgcolor: stat.bgcolor, color: stat.color, fontWeight: 'bold' }} />
                </Box>
                <Typography variant="h3" fontWeight="800" sx={{ mb: 0.5 }}>{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary" fontWeight="600">{stat.label}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Continue Learning */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight="700">Continue Learning</Typography>
          <Button color="primary" fontWeight="600">View All</Button>
        </Box>

        <Grid container spacing={3}>
          {[1, 2, 3].map((i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4, overflow: 'hidden', transition: '0.3s', '&:hover': { boxShadow: '0 10px 30px rgba(0,0,0,0.08)' } }}>
                <Box sx={{ height: 180, bgcolor: 'grey.200', position: 'relative' }}>
                  <Box sx={{ position: 'absolute', inset: 0, background: `url(https://source.unsplash.com/random/800x600?tech,code,${i}) center/cover` }} />
                  <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
                  <Box sx={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                    <Chip label="UI/UX Design" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(4px)', mb: 1 }} />
                    <Typography variant="h6" fontWeight="bold" color="white">Advanced Figma Masterclass</Typography>
                  </Box>
                  <IconButton sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'rgba(255,255,255,0.2)', color: 'white', backdropFilter: 'blur(4px)', '&:hover': { bgcolor: 'white', color: 'primary.main' } }}>
                    <PlayCircleOutline fontSize="large" />
                  </IconButton>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">By Sarah Johnson</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Star sx={{ fontSize: 16, color: '#F59E0B' }} />
                      <Typography variant="caption" fontWeight="bold">4.9</Typography>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption" fontWeight="bold" color="text.secondary">Progress</Typography>
                      <Typography variant="caption" fontWeight="bold" color="primary.main">75%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={75} sx={{ height: 6, borderRadius: 4, bgcolor: 'grey.100', '& .MuiLinearProgress-bar': { borderRadius: 4 } }} />
                  </Box>

                  <Button variant="outlined" fullWidth sx={{ borderRadius: 3, borderWidth: 2, '&:hover': { borderWidth: 2 } }}>
                    Continue
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
