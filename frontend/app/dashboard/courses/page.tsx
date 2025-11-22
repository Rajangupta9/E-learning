'use client';

import { Box, Typography, Grid, Card, CardContent, LinearProgress, Button } from '@mui/material';
import PageHeader from '@/app/components/common/PageHeader';

export default function CoursesPage() {
    return (
        <Box className="animate-fade-in">
            <PageHeader
                title="My Courses"
                subtitle="Continue where you left off"
                breadcrumbs={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'My Courses' }]}
            />

            <Grid container spacing={3}>
                {[1, 2, 3, 4].map((i) => (
                    <Grid item xs={12} md={6} key={i}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" fontWeight="bold">Course Title {i}</Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    This is a dummy course description to demonstrate the UI layout.
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <LinearProgress variant="determinate" value={45} sx={{ flexGrow: 1, height: 8, borderRadius: 4 }} />
                                    <Typography variant="caption">45%</Typography>
                                </Box>
                                <Button variant="outlined">Continue Learning</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
