'use client';

import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Card, CardContent, Avatar, Chip, IconButton } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VerifiedIcon from '@mui/icons-material/Verified';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import StarIcon from '@mui/icons-material/Star';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';

export default function LandingPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
      {/* Header */}
      <AppBar position="fixed" color="inherit" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', bgcolor: 'rgba(255,255,255,0.8)' }}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: 80 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', width: 40, height: 40, fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)' }}>S</Avatar>
              <Typography variant="h5" color="text.primary" fontWeight="800" sx={{ letterSpacing: '-0.5px' }}>SkillHub</Typography>
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 4 }}>
              {['Courses', 'Mentors', 'Pricing', 'Business'].map((item) => (
                <Button key={item} color="inherit" sx={{ color: 'text.secondary', fontWeight: 500, '&:hover': { color: 'primary.main', bgcolor: 'transparent' } }}>
                  {item}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button component={Link} href="/auth/login" color="inherit" sx={{ color: 'text.primary', fontWeight: 600 }}>Login</Button>
              <Button component={Link} href="/auth/register" variant="contained" color="primary" disableElevation sx={{ borderRadius: '50px', px: 4 }}>
                Sign Up Free
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Hero Section */}
      <Box component="main" sx={{ flexGrow: 1, pt: 20, pb: 12, position: 'relative' }}>
        {/* Background Blobs */}
        <Box sx={{ position: 'absolute', top: -100, right: -100, width: 600, height: 600, borderRadius: '50%', bgcolor: 'primary.light', opacity: 0.1, filter: 'blur(80px)', zIndex: 0 }} />
        <Box sx={{ position: 'absolute', bottom: 0, left: -100, width: 400, height: 400, borderRadius: '50%', bgcolor: 'secondary.light', opacity: 0.1, filter: 'blur(80px)', zIndex: 0 }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6} className="animate-slide-up">
              <Box sx={{ mb: 4 }}>
                <Chip
                  label="🚀 Over 1000+ New Courses Added"
                  sx={{ bgcolor: 'rgba(79, 70, 229, 0.1)', color: 'primary.main', fontWeight: 600, borderRadius: 2, px: 1 }}
                />
              </Box>
              <Typography variant="h1" component="h1" gutterBottom sx={{ fontWeight: 900, lineHeight: 1.1, mb: 3, fontSize: { xs: '3rem', md: '4.5rem' } }}>
                Master New Skills <br />
                <Box component="span" sx={{
                  background: 'linear-gradient(135deg, #4F46E5 0%, #EC4899 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  10x Faster
                </Box>
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 5, fontWeight: 400, lineHeight: 1.8, maxWidth: 500 }}>
                Unlock your potential with expert-led courses in coding, design, business, and more. Join a community of 50,000+ learners today.
              </Typography>

              <Box sx={{ display: 'flex', gap: 2, mb: 8 }}>
                <Button component={Link} href="/auth/register" variant="contained" size="large" sx={{ px: 5, py: 2, fontSize: '1.1rem', borderRadius: '50px' }}>
                  Get Started
                </Button>
                <Button component={Link} href="#" variant="outlined" size="large" startIcon={<PlayCircleOutlineIcon />} sx={{ px: 4, py: 2, fontSize: '1.1rem', borderRadius: '50px', borderColor: 'divider', color: 'text.primary', borderWidth: 2, '&:hover': { borderWidth: 2, borderColor: 'text.primary' } }}>
                  Watch Demo
                </Button>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <Box sx={{ display: 'flex' }}>
                  {[1, 2, 3, 4].map((i) => (
                    <Avatar key={i} src={`https://i.pravatar.cc/150?img=${i + 10}`} sx={{ width: 48, height: 48, ml: -1.5, border: '3px solid white' }} />
                  ))}
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    {[1, 2, 3, 4, 5].map((i) => <StarIcon key={i} sx={{ color: '#F59E0B', fontSize: 18 }} />)}
                  </Box>
                  <Typography variant="body2" fontWeight="600" color="text.secondary">
                    4.9/5 from 50k+ students
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} className="animate-fade-in delay-200">
              <Box sx={{ position: 'relative', height: 600 }}>
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '90%',
                  height: '90%',
                  background: 'linear-gradient(135deg, #E0E7FF 0%, #F5F3FF 100%)',
                  borderRadius: '40px 40px 40px 4px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {/* Abstract UI Mockup */}
                  <Box sx={{ width: '80%', height: '80%', bgcolor: 'white', borderRadius: 4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', p: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                      <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: 'primary.light', opacity: 0.2 }} />
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ width: '60%', height: 10, bgcolor: 'grey.200', borderRadius: 2, mb: 1 }} />
                        <Box sx={{ width: '40%', height: 10, bgcolor: 'grey.100', borderRadius: 2 }} />
                      </Box>
                    </Box>
                    <Box sx={{ height: 150, bgcolor: 'grey.50', borderRadius: 3, mb: 3 }} />
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ flex: 1, height: 100, bgcolor: 'secondary.light', opacity: 0.1, borderRadius: 3 }} />
                      <Box sx={{ flex: 1, height: 100, bgcolor: 'primary.light', opacity: 0.1, borderRadius: 3 }} />
                    </Box>
                  </Box>
                </Box>

                {/* Floating Cards */}
                <Card className="animate-float" sx={{ position: 'absolute', bottom: 40, left: 0, p: 2, borderRadius: 4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', minWidth: 240 }}>
                  <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '0 !important' }}>
                    <Avatar sx={{ bgcolor: 'success.light', color: 'success.main', width: 48, height: 48 }}>
                      <VerifiedIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">Course Completed</Typography>
                      <Typography variant="caption" color="text.secondary">Just now • UI/UX Design</Typography>
                    </Box>
                  </CardContent>
                </Card>

                <Card className="animate-float delay-300" sx={{ position: 'absolute', top: 40, right: -20, p: 2, borderRadius: 4, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxWidth: 200 }}>
                  <CardContent sx={{ p: '0 !important' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <Avatar src="https://i.pravatar.cc/150?img=32" sx={{ width: 32, height: 32 }} />
                      <Typography variant="subtitle2" fontWeight="bold">Sarah J.</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                      "This platform completely changed my career trajectory. Highly recommended!"
                    </Typography>
                    <Box sx={{ display: 'flex', mt: 1 }}>
                      {[1, 2, 3, 4, 5].map(i => <StarIcon key={i} sx={{ fontSize: 14, color: '#F59E0B' }} />)}
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box sx={{ py: 12, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 10, maxWidth: 700, mx: 'auto' }}>
            <Typography variant="overline" color="primary" fontWeight="bold" sx={{ letterSpacing: 2 }}>WHY CHOOSE US</Typography>
            <Typography variant="h3" fontWeight="800" gutterBottom sx={{ mt: 1, mb: 2 }}>Reinventing Online Education</Typography>
            <Typography color="text.secondary" fontSize="1.1rem">We provide the best learning experience with top-notch features designed for your success.</Typography>
          </Box>

          <Grid container spacing={4}>
            {[
              { title: "Expert Instructors", desc: "Learn from industry experts who are passionate about teaching.", icon: <SchoolIcon fontSize="large" />, color: 'primary.main', bgcolor: 'rgba(79, 70, 229, 0.1)' },
              { title: "Flexible Learning", desc: "Study at your own pace, anytime, anywhere, on any device.", icon: <AccessTimeIcon fontSize="large" />, color: 'secondary.main', bgcolor: 'rgba(236, 72, 153, 0.1)' },
              { title: "Certified Courses", desc: "Earn recognized certificates to boost your career profile.", icon: <VerifiedIcon fontSize="large" />, color: '#F59E0B', bgcolor: 'rgba(245, 158, 11, 0.1)' }
            ].map((feature, idx) => (
              <Grid item xs={12} md={4} key={idx}>
                <Card elevation={0} sx={{
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 6,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                    borderColor: 'transparent'
                  }
                }}>
                  <CardContent sx={{ p: 5 }}>
                    <Box sx={{
                      width: 72,
                      height: 72,
                      borderRadius: 4,
                      bgcolor: feature.bgcolor,
                      color: feature.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 4
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>{feature.title}</Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>{feature.desc}</Typography>

                    <Button endIcon={<ArrowForwardIcon />} sx={{ mt: 3, p: 0, color: feature.color, '&:hover': { bgcolor: 'transparent', opacity: 0.8 } }}>
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ py: 10, bgcolor: '#0F172A', color: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={8}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Avatar variant="rounded" sx={{ bgcolor: 'primary.main', width: 32, height: 32, fontWeight: 'bold' }}>S</Avatar>
                <Typography variant="h6" fontWeight="bold">SkillHub</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', mb: 4, maxWidth: 300, lineHeight: 1.8 }}>
                Empowering learners worldwide with accessible, high-quality education. Join the revolution today.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {[Facebook, Twitter, LinkedIn, Instagram].map((Icon, i) => (
                  <IconButton key={i} size="small" sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'primary.main' } }}>
                    <Icon fontSize="small" />
                  </IconButton>
                ))}
              </Box>
            </Grid>

            {[
              { head: "Platform", links: ["Browse Courses", "Mentors", "Pricing", "For Business"] },
              { head: "Company", links: ["About Us", "Careers", "Blog", "Contact"] },
              { head: "Legal", links: ["Terms of Use", "Privacy Policy", "Cookie Policy"] }
            ].map((col, idx) => (
              <Grid item xs={6} md={2} key={idx}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom sx={{ color: 'white', mb: 3 }}>{col.head}</Typography>
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {col.links.map((link, i) => (
                    <Box component="li" key={i} sx={{ mb: 2 }}>
                      <Link href="#" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: 'primary.main' } }}>{link}</Typography>
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid', borderColor: 'rgba(255,255,255,0.1)', textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
              &copy; {new Date().getFullYear()} SkillHub-Pro. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
