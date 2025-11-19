'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Avatar, Grid, Card, CardContent, Button,
  LinearProgress, IconButton, Container
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import MessageIcon from '@mui/icons-material/Message';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';

const drawerWidth = 280;

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      router.push('/auth');
      return;
    }

    setUser(JSON.parse(userData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', color: 'primary.main' }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', borderRight: '1px solid', borderColor: 'divider' },
        }}
      >
        <Toolbar sx={{ px: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', fontWeight: 'bold' }}>S</Avatar>
            <Typography variant="h6" fontWeight="bold">SkillHub</Typography>
          </Box>
        </Toolbar>
        <Box sx={{ overflow: 'auto', px: 2, py: 2 }}>
          <List>
            {[
              { name: 'Dashboard', icon: <DashboardIcon />, active: true },
              { name: 'My Courses', icon: <SchoolIcon />, active: false },
              { name: 'Messages', icon: <MessageIcon />, active: false },
              { name: 'Settings', icon: <SettingsIcon />, active: false },
            ].map((item) => (
              <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
                <ListItemButton
                  selected={item.active}
                  sx={{
                    borderRadius: 3,
                    '&.Mui-selected': { bgcolor: 'primary.light', color: 'primary.main', '&:hover': { bgcolor: 'primary.light' } }
                  }}
                >
                  <ListItemIcon sx={{ color: item.active ? 'primary.main' : 'inherit', minWidth: 40 }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.name} primaryTypographyProps={{ fontWeight: 500 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ mt: 'auto', p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            fullWidth
            startIcon={<LogoutIcon />}
            color="error"
            onClick={handleLogout}
            sx={{ justifyContent: 'flex-start', px: 2, py: 1.5, borderRadius: 3 }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Top Bar */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>Dashboard</Typography>
            <Typography color="text.secondary">Welcome back, {user.name || user.email}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton sx={{ bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider' }}>
              <NotificationsIcon />
            </IconButton>
            <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', fontWeight: 'bold' }}>
              {(user.name || user.email)[0].toUpperCase()}
            </Avatar>
          </Box>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 5 }}>
          {[
            { label: 'Courses in Progress', value: '4', color: 'primary.main', bgcolor: 'primary.light' },
            { label: 'Completed Courses', value: '12', color: 'success.main', bgcolor: 'success.light' },
            { label: 'Hours Learned', value: '128', color: 'secondary.main', bgcolor: 'secondary.light' }
          ].map((stat, idx) => (
            <Grid item xs={12} md={4} key={idx}>
              <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4 }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 3 }}>
                  <Avatar variant="rounded" sx={{ bgcolor: stat.bgcolor, color: stat.color, width: 56, height: 56 }}>
                    <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: stat.color }} />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
                    <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Continue Learning */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" fontWeight="bold">Continue Learning</Typography>
            <Button component={Link} href="#" sx={{ fontWeight: 'bold' }}>View All</Button>
          </Box>

          <Grid container spacing={3}>
            {[1, 2, 3].map((i) => (
              <Grid item xs={12} md={4} key={i}>
                <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 4, transition: '0.3s', '&:hover': { boxShadow: 3 } }}>
                  <Box sx={{ height: 160, bgcolor: 'grey.200', position: 'relative' }}>
                    <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }} />
                    <Typography variant="caption" sx={{ position: 'absolute', bottom: 16, left: 16, bgcolor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', color: 'white', px: 1, py: 0.5, borderRadius: 1, border: '1px solid rgba(255,255,255,0.2)', fontWeight: 'bold' }}>
                      UI/UX Design
                    </Typography>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ '&:hover': { color: 'primary.main', cursor: 'pointer' } }}>
                      Advanced Figma Masterclass
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>By Sarah Johnson</Typography>

                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" fontWeight="bold" color="text.secondary">Progress</Typography>
                        <Typography variant="caption" fontWeight="bold" color="text.secondary">75%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={75} sx={{ height: 8, borderRadius: 4 }} />
                    </Box>

                    <Button variant="outlined" fullWidth sx={{ borderRadius: 3 }}>
                      Continue
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
