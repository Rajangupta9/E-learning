'use client';

import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Avatar,
  Box,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import { Edit, Save, Cancel, CameraAlt } from '@mui/icons-material';
import PageHeader from '@/app/components/common/PageHeader';
import { useAuth } from '@/hooks/useAuth';
import { useSnackbar } from '@/context/SnackbarContext';
import { userService } from '@/services/userService';

export default function ProfilePage() {
  const { user } = useAuth();
  const { showSnackbar } = useSnackbar();

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    phone: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        bio: '',
        phone: '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await userService.updateProfile(formData);
      showSnackbar('Profile updated successfully', 'success');
      setEditing(false);
    } catch (error) {
      showSnackbar('Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showSnackbar('Passwords do not match', 'error');
      return;
    }

    setLoading(true);
    try {
      await userService.updatePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );
      showSnackbar('Password updated successfully', 'success');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      showSnackbar('Failed to update password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="animate-fade-in">
      <PageHeader
        title="My Profile"
        subtitle="Manage your account settings and preferences"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Profile' },
        ]}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent sx={{ textAlign: 'center' }}>
              <Box sx={{ position: 'relative', display: 'inline-block' }}>
                <Avatar
                  src={user?.avatar}
                  sx={{ width: 120, height: 120, margin: '0 auto', bgcolor: 'primary.main', fontSize: '3rem' }}
                >
                  {user?.name?.charAt(0)}
                </Avatar>
                <IconButton
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    backgroundColor: 'background.paper',
                    boxShadow: 1
                  }}
                  component="label"
                >
                  <CameraAlt />
                  <input type="file" hidden accept="image/*" />
                </IconButton>
              </Box>

              <Typography variant="h6" sx={{ mt: 2, fontWeight: 'bold' }}>
                {user?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user?.email}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: 'inline-block',
                  mt: 1,
                  px: 2,
                  py: 0.5,
                  backgroundColor: 'primary.light',
                  color: 'primary.main',
                  borderRadius: 1,
                  fontWeight: 'bold'
                }}
              >
                {user?.role?.toUpperCase() || 'STUDENT'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h6" fontWeight="bold">Personal Information</Typography>
                {!editing ? (
                  <Button
                    startIcon={<Edit />}
                    onClick={() => setEditing(true)}
                  >
                    Edit
                  </Button>
                ) : (
                  <Box>
                    <IconButton onClick={() => setEditing(false)}>
                      <Cancel />
                    </IconButton>
                    <IconButton onClick={handleSave} disabled={loading} color="primary">
                      <Save />
                    </IconButton>
                  </Box>
                )}
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!editing}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    disabled={!editing}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Change Password
              </Typography>
              <Divider sx={{ mb: 3 }} />

              <form onSubmit={handlePasswordUpdate}>
                <TextField
                  fullWidth
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  margin="normal"
                  required
                />
                <TextField
                  fullWidth
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  margin="normal"
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2 }}
                  disabled={loading}
                >
                  Update Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}