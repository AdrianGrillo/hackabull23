import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { keyframes } from '@mui/system';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const GetStartedPage = () => {
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '100vh',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 4,
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            animation: `${fadeIn} 1s ease-in`,
          }}
        >
          Welcome to your Fresh Start
        </Typography>
        {/* Add your content here */}
      </Box>
    </Container>
  );
};

export default GetStartedPage;

