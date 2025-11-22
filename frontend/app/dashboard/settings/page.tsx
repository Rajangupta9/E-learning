'use client';

import { Box, Typography, Paper, Switch, List, ListItem, ListItemText, ListItemSecondaryAction, Divider } from '@mui/material';
import PageHeader from '@/app/components/common/PageHeader';

export default function SettingsPage() {
    return (
        <Box className="animate-fade-in">
            <PageHeader
                title="Settings"
                subtitle="Manage your preferences"
                breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Settings' }]}
            />

            <Paper>
                <List>
                    <ListItem>
                        <ListItemText primary="Email Notifications" secondary="Receive emails about course updates" />
                        <ListItemSecondaryAction>
                            <Switch defaultChecked />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemText primary="Dark Mode" secondary="Toggle dark theme (Coming Soon)" />
                        <ListItemSecondaryAction>
                            <Switch disabled />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Paper>
        </Box>
    );
}
