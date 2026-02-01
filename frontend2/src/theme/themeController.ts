import { createTheme } from '@mui/material/styles';

// Enterprise color palette
const lightPalette = {
    mode: 'light' as const,
    primary: {
        main: '#1976d2', // Enterprise Blue
        light: '#42a5f5',
        dark: '#1565c0',
        contrastText: '#fff',
    },
    secondary: {
        main: '#9c27b0', // Purple for accents
        light: '#ba68c8',
        dark: '#7b1fa2',
        contrastText: '#fff',
    },
    background: {
        default: '#f5f5f5', // Light grey background for enterprise feel
        paper: '#ffffff',
    },
    text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.6)',
    },
};

const darkPalette = {
    mode: 'dark' as const,
    primary: {
        main: '#90caf9', // Light Blue for dark mode
        light: '#e3f2fd',
        dark: '#42a5f5',
        contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    secondary: {
        main: '#ce93d8', // Light Purple
        light: '#f3e5f5',
        dark: '#ab47bc',
        contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
        default: '#121212', // Standard dark background
        paper: '#1e1e1e',   // Slightly lighter for cards/surfaces
    },
    text: {
        primary: '#fff',
        secondary: 'rgba(255, 255, 255, 0.7)',
    },
};

const typography = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
        fontWeight: 500,
        fontSize: '2.5rem',
    },
    h2: {
        fontWeight: 500,
        fontSize: '2rem',
    },
    h3: {
        fontWeight: 500,
        fontSize: '1.75rem',
    },
    h4: {
        fontWeight: 500,
        fontSize: '1.5rem',
    },
    h5: {
        fontWeight: 500,
        fontSize: '1.25rem',
    },
    h6: {
        fontWeight: 500,
        fontSize: '1rem',
    },
    button: {
        textTransform: 'none' as const, // More modern/enterprise look
        fontWeight: 600,
    },
};

export const lightTheme = createTheme({
    palette: lightPalette,
    typography: typography,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Modern rounded corners
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', // Subtle shadow
                }
            }
        }
    },
});

export const darkTheme = createTheme({
    palette: darkPalette,
    typography: typography,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    backgroundImage: 'none', // Remove default gradient in dark mode for cleaner look
                }
            }
        }
    },
});
