'use client';

import * as React from 'react';
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';

const inter = Inter({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
    weight: ['400', '500', '600', '700', '800'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#4F46E5', // Indigo 600
            light: '#818CF8',
            dark: '#3730A3',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#EC4899', // Pink 500
            light: '#F472B6',
            dark: '#DB2777',
            contrastText: '#ffffff',
        },
        background: {
            default: '#F8FAFC', // Slate 50
            paper: '#FFFFFF',
        },
        text: {
            primary: '#0F172A', // Slate 900
            secondary: '#64748B', // Slate 500
        },
        divider: '#E2E8F0', // Slate 200
    },
    typography: {
        fontFamily: inter.style.fontFamily,
        h1: {
            fontFamily: plusJakarta.style.fontFamily,
            fontWeight: 800,
        },
        h2: {
            fontFamily: plusJakarta.style.fontFamily,
            fontWeight: 700,
        },
        h3: {
            fontFamily: plusJakarta.style.fontFamily,
            fontWeight: 700,
        },
        h4: {
            fontFamily: plusJakarta.style.fontFamily,
            fontWeight: 700,
        },
        h5: {
            fontFamily: plusJakarta.style.fontFamily,
            fontWeight: 600,
        },
        h6: {
            fontFamily: plusJakarta.style.fontFamily,
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '10px',
                    padding: '10px 24px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
                        transform: 'translateY(-1px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                },
                containedPrimary: {
                    background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: '16px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                    backgroundImage: 'none',
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
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        '&.Mui-focused fieldset': {
                            borderWidth: '2px',
                            borderColor: '#4F46E5',
                            boxShadow: '0 0 0 4px rgba(79, 70, 229, 0.1)',
                        },
                    },
                },
            },
        },
    },
});

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalStyles
                    styles={{
                        body: {
                            scrollBehavior: 'smooth',
                        },
                        '::selection': {
                            backgroundColor: '#4F46E5',
                            color: '#ffffff',
                        },
                    }}
                />
                {children}
            </ThemeProvider>
        </NextAppDirEmotionCacheProvider>
    );
}
