import { experimental_extendTheme as extendTheme } from '@mui/material/styles';


const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'
const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT}`
    // Create a theme instance.
const theme = extendTheme({
    trello: {
        appBarHeight: APP_BAR_HEIGHT,
        boardBarHeight: BOARD_BAR_HEIGHT,
        boardContentHeight: BOARD_CONTENT_HEIGHT,
        columnHeaderHeight: COLUMN_HEADER_HEIGHT,
        columnFooterHeight: COLUMN_FOOTER_HEIGHT,

    },
    colorSchemes: {
        //     light: {
        //         palette: {
        //             primary: teal,
        //             secondary: deepOrange
        //         },
        //     },
        // },
        // dark: {
        //     palette: {
        //         primary: cyan,
        //         secondary: deepOrange
        //     }
    },
    components: {
        MuiCssBaseLine: {
            styleOverrides: {
                body: {
                    '*::-webkit-scrollbar': {
                        with: '8px',
                        height: '8px'
                    },
                    '*::-webkit-scrollbar-thumb': {
                        backgroundColor: '#bcđe1',
                        borderRadius: '8px'
                    },
                    '*::-webkit-scrollbar-thumb:hover': {
                        backgroundColor: 'pink',
                        borderRadius: '8px'
                    }
                }
            }
        },
        // Name of the component
        MuiButton: {
            styleOverrides: {
                // Name of the slot
                root: {
                    textTransform: 'none',
                    borderColor: '0.5px',
                    '&:hover': { borderWidth: '0.5px' }
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                // Name of the slot
                root: ({ theme }) => ({
                    color: theme.palette.primary.main,
                    fontSize: '0.875rem'
                })
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    '&.MuiTypography-body1': { fontSize: '0.875rem' }
                }
            }
        },
        MuiOutLinedInput: {
            styleOverrides: {
                root: ({ theme }) => {
                    return {
                        color: theme.palette.primary.main,
                        fontSize: '0.875rem',
                        // '.MuiOutLinedInput-notchedOutLine': {
                        //     borderColor: theme.palette.primary.light
                        // },
                        // '&:hover': {
                        //     '.MuiOutLinedInput-notchedOutLine': {
                        //         borderColor: theme.palette.primary.light
                        //     }
                        // },
                        '& fieldset': {
                            borderWidth: '0.5px !important'
                        },
                        '&:hover fieldset': {
                            borderWidth: '0.5px !important'
                        },
                        '&.Mui-focused fieldset': {
                            borderWidth: '0.5px !important'
                        }
                    }
                }
            },
        },

    },
});

export default theme;