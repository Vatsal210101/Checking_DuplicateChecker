import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import DuplicateChecker from './components/DuplicateChecker'

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    background: { default: 'transparent' }
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
    h3: { fontWeight: 800 }
  }
})

export default function App(){
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ mt: 6, mb: 4, textAlign: 'left' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Duplicate Question Pair Checker
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Paste two questions and click check to see whether they're duplicates.
          </Typography>

          <DuplicateChecker />
        </Box>
      </Container>
    </ThemeProvider>
  )
}
