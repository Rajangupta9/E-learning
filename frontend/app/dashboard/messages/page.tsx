'use client';

import { Box, Typography, Paper, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';
import PageHeader from '@/app/components/common/PageHeader';

export default function MessagesPage() {
    return (
        <Box className="animate-fade-in">
            <PageHeader
                title="Messages"
                subtitle="Chat with mentors and peers"
                breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Messages' }]}
            />

            <Paper sx={{ height: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box sx={{ textAlign: 'center', p: 4 }}>
                    <Typography variant="h5" gutterBottom>No messages yet</Typography>
                    <Typography color="text.secondary">Start a conversation with your mentor!</Typography>
                </Box>
            </Paper>
        </Box>
    );
}
