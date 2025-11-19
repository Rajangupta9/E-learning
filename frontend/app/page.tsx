'use client';

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Card, CardContent, Avatar } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function LandingPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', backdropFilter: 'blur(20px)', bgcolor: 'rgba(255,255,255,0.8)' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', fontWeight: 'bold' }}>S</Avatar>
              <Typography variant="h6" color="text.primary" fontWeight="bold">SkillHub</Typography>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              {['Courses', 'Mentors', 'Pricing'].map((item) => (
                <Button key={item} color="inherit" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                  {item}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button component={Link} href="/auth" color="inherit" sx={{ color: 'text.primary' }}>Login</Button>
              <Button component={Link} href="/auth" variant="contained" color="primary" disableElevation>
                Sign Up
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box component="main" sx={{ flexGrow: 1, pt: 16, pb: 10 }}>
        <Container maxWidth="lg">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="overline" sx={{ px: 2, py: 0.5, bgcolor: 'primary.light', color: 'primary.contrastText', borderRadius: 10, fontWeight: 'bold' }}>
                  OVER 1000+ COURSES
                </Typography>
              </Box>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800, lineHeight: 1.2 }}>
                Unlock Your <Box component="span" sx={{ color: 'primary.main' }}>Potential</Box> with Online Learning
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 4, fontWeight: 400 }}>
                Discover a world of knowledge with expert-led courses. Build skills, earn certificates, and advance your career at your own pace.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 6 }}>
                <Button component={Link} href="/auth" variant="contained" size="large" sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}>
                  Get Started
                </Button>
                <Button component={Link} href="#" variant="outlined" size="large" sx={{ px: 4, py: 1.5, fontSize: '1.1rem', borderColor: 'divider', color: 'text.primary' }}>
                  View Courses
                </Button>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', ml: 1 }}>
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} sx={{ width: 40, height: 40, ml: -1, border: '2px solid white', bgcolor: 'grey.300' }} />
                  ))}
                </Box>
                <Typography variant="body2" fontWeight="bold" color="text.secondary">Trusted by 50k+ students</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative' }}>
                <Box sx={{
                  width: '100%',
                  paddingTop: '100%',
                  background: 'linear-gradient(135deg, #E0E7FF 0%, #FFFFFF 100%)',
                  borderRadius: 8,
                  boxShadow: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <Typography variant="h1" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'primary.light', opacity: 0.2 }}>IMG</Typography>
                </Box>

                {/* Floating Card */}
                <Card sx={{ position: 'absolute', bottom: -24, left: -24, p: 1, borderRadius: 4, boxShadow: 4, minWidth: 200 }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, pb: '16px !important' }}>
                    <Avatar sx={{ bgcolor: 'success.light', color: 'success.main' }}>
                      <VerifiedIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">Course Completed</Typography>
                      <Typography variant="caption" color="text.secondary">Just now</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>Why Choose SkillHub?</Typography>
            <Typography color="text.secondary">We provide the best learning experience with top-notch features designed for your success.</Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              { title: "Expert Instructors", desc: "Learn from industry experts who are passionate about teaching.", icon: <SchoolIcon fontSize="large" />, color: 'primary.main', bgcolor: 'primary.light' },
              { title: "Flexible Learning", desc: "Study at your own pace, anytime, anywhere, on any device.", icon: <AccessTimeIcon fontSize="large" />, color: 'secondary.main', bgcolor: 'secondary.light' },
              { title: "Certified Courses", desc: "Earn recognized certificates to boost your career profile.", icon: <VerifiedIcon fontSize="large" />, color: 'warning.main', bgcolor: 'warning.light' }
            ].map((feature, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card elevation={0} sx={{ height: '100%', border: '1px solid', borderColor: 'divider', borderRadius: 4, transition: '0.3s', '&:hover': { boxShadow: 2 } }}>
                  <CardContent sx={{ p: 4 }}>
                    <Avatar variant="rounded" sx={{ width: 56, height: 56, mb: 3, bgcolor: feature.bgcolor, color: feature.color }}>
                      {feature.icon}
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{feature.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 8, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontSize: '1rem', fontWeight: 'bold' }}>S</Avatar>
                <Typography variant="h6" fontWeight="bold">SkillHub</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Empowering learners worldwide with accessible, high-quality education.
              </Typography>
            </Grid>

            {[
              { head: "Platform", links: ["Browse Courses", "Mentors", "Pricing", "For Business"] },
              { head: "Company", links: ["About Us", "Careers", "Blog", "Contact"] },
              { head: "Legal", links: ["Terms of Use", "Privacy Policy", "Cookie Policy"] }
            ].map((col, idx) => (
              <Grid item xs={6} md={2} key={idx}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>{col.head}</Typography>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {col.links.map((link, i) => (
                    <Box component="li" key={i} sx={{ mb: 1 }}>
                      <Link href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>{link}</Typography>
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              &copy; {new Date().getFullYear()} SkillHub-Pro. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
