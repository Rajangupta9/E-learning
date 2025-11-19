'use client';

import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { Inter } from 'next/font/google';

const inter = Inter({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#4F46E5', // Indigo 600
        },
        secondary: {
            main: '#64748B', // Slate 500
        },
        background: {
            default: '#F8FAFC', // Slate 50
            paper: '#FFFFFF',
        },
        text: {
            primary: '#0F172A', // Slate 900
            secondary: '#64748B', // Slate 500
        },
    },
    typography: {
        fontFamily: inter.style.fontFamily,
        h1: { fontWeight: 700 },
        h2: { fontWeight: 700 },
        h3: { fontWeight: 700 },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '9999px', // Pill shape
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                {children}
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
}
