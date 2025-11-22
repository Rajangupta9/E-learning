'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
    Box, Drawer, AppBar, Toolbar, Typography, List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, Avatar, IconButton, Button, useTheme, useMediaQuery,
    Menu, MenuItem, Divider, Badge, Card
} from '@mui/material';
import {
    Dashboard, School, Message, Settings, Logout, Notifications,
    Menu as MenuIcon, ChevronLeft, Person, Search
} from '@mui/icons-material';

const drawerWidth = 280;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(!isMobile);
    const [user, setUser] = useState<any>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
        setOpen(!isMobile);
    }, [isMobile]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/');
    };

    const menuItems = [
        { name: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
        { name: 'My Courses', icon: <School />, path: '/dashboard/courses' },
        { name: 'Messages', icon: <Message />, path: '/dashboard/messages' },
        { name: 'Profile', icon: <Person />, path: '/dashboard/profile' },
        { name: 'Settings', icon: <Settings />, path: '/dashboard/settings' },
    ];

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
            {/* AppBar */}
            <AppBar
                position="fixed"
                color="inherit"
                elevation={0}
                sx={{
                    zIndex: theme.zIndex.drawer + 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    backdropFilter: 'blur(20px)',
                    bgcolor: 'rgba(255,255,255,0.8)',
                    width: { md: `calc(100% - ${open ? drawerWidth : 80}px)` },
                    ml: { md: `${open ? drawerWidth : 80}px` },
                    transition: theme.transitions.create(['width', 'margin'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={() => setOpen(!open)}
                            sx={{ mr: 2, display: { md: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
                            {menuItems.find(item => item.path === pathname)?.name || 'Dashboard'}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton color="inherit">
                            <Search />
                        </IconButton>
                        <IconButton color="inherit">
                            <Badge badgeContent={3} color="error">
                                <Notifications />
                            </Badge>
                        </IconButton>
                        <Box
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', p: 0.5, borderRadius: 2, '&:hover': { bgcolor: 'action.hover' } }}
                        >
                            <Avatar
                                src={user?.avatar}
                                sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: '1rem' }}
                            >
                                {user?.name?.[0] || user?.email?.[0]?.toUpperCase()}
                            </Avatar>
                            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                                <Typography variant="subtitle2" fontWeight="600" lineHeight={1.2}>
                                    {user?.name || 'User'}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {user?.role || 'Student'}
                                </Typography>
                            </Box>
                        </Box>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 },
                                },
                            }}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem onClick={() => router.push('/dashboard/profile')}>
                                <ListItemIcon><Person fontSize="small" /></ListItemIcon>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={() => router.push('/dashboard/settings')}>
                                <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
                                Settings
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                                <ListItemIcon><Logout fontSize="small" color="error" /></ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Sidebar */}
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    width: open ? drawerWidth : 80,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: open ? drawerWidth : 80,
                        boxSizing: 'border-box',
                        borderRight: '1px solid',
                        borderColor: 'divider',
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        overflowX: 'hidden',
                    },
                }}
            >
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: open ? 'space-between' : 'center', px: [1, 2] }}>
                    {open && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontWeight: 'bold' }}>S</Avatar>
                            <Typography variant="h6" fontWeight="800">SkillHub</Typography>
                        </Box>
                    )}
                    {!open && (
                        <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontWeight: 'bold' }}>S</Avatar>
                    )}
                    {open && !isMobile && (
                        <IconButton onClick={() => setOpen(false)}>
                            <ChevronLeft />
                        </IconButton>
                    )}
                </Toolbar>
                <Divider />
                <List sx={{ px: 1, pt: 2 }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.name} disablePadding sx={{ display: 'block', mb: 0.5 }}>
                            <ListItemButton
                                component={Link}
                                href={item.path}
                                selected={pathname === item.path}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    borderRadius: 2,
                                    '&.Mui-selected': {
                                        bgcolor: 'primary.light',
                                        color: 'primary.main',
                                        '&:hover': { bgcolor: 'primary.light' },
                                        '& .MuiListItemIcon-root': { color: 'primary.main' }
                                    }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 2 : 'auto',
                                        justifyContent: 'center',
                                        color: pathname === item.path ? 'primary.main' : 'text.secondary'
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.name} sx={{ opacity: open ? 1 : 0 }} primaryTypographyProps={{ fontWeight: 600 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ mt: 'auto', p: 2 }}>
                    {open ? (
                        <Card sx={{ bgcolor: 'primary.main', color: 'white', borderRadius: 3 }}>
                            <Box sx={{ p: 2 }}>
                                <Typography variant="subtitle2" fontWeight="bold">Pro Plan</Typography>
                                <Typography variant="caption" sx={{ opacity: 0.8, display: 'block', mb: 1 }}>Get access to all courses</Typography>
                                <Button size="small" variant="contained" sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}>Upgrade</Button>
                            </Box>
                        </Card>
                    ) : (
                        <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.main', mx: 'auto', width: 32, height: 32 }}><School fontSize="small" /></Avatar>
                    )}
                </Box>
            </Drawer>

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}>
                {children}
            </Box>
        </Box>
    );
}
