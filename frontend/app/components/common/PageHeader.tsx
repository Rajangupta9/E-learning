
import React from 'react';
import { Typography, Box, Breadcrumbs, Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

const PageHeader = ({ title, subtitle, breadcrumbs }: PageHeaderProps) => {
  return (
    <Box sx={{ mb: 4 }}>
      {breadcrumbs && (
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          sx={{ mb: 2 }}
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return isLast ? (
              <Typography key={crumb.label} color="text.primary">
                {crumb.label}
              </Typography>
            ) : (
              <MuiLink
                key={crumb.label}
                component={Link}
                href={crumb.href || '#'}
                underline="hover"
                color="inherit"
              >
                {crumb.label}
              </MuiLink>
            );
          })}
        </Breadcrumbs>
      )}
      <Typography variant="h4" component="h1" fontWeight="bold">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default PageHeader;
