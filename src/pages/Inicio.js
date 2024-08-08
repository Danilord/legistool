// src/pages/Inicio.js
import React from 'react';
import { Container, Typography, Grid, Paper, Avatar, Button } from '@mui/material';
import { styled } from '@mui/system';
import { red } from '@mui/material/colors';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: red,
}));

const teamMembers = [
  { name: 'John Doe', role: 'CEO', img: '/path/to/image1.jpg' },
  { name: 'Jane Smith', role: 'CTO', img: '/path/to/image2.jpg' },
  { name: 'Emily Johnson', role: 'COO', img: '/path/to/image3.jpg' },
];

const Inicio = () => {
  const handleLoginClick = () => {
    window.location.href = '/login'; // Navigate to the login page
  };

  return (
    <Container>
      <Typography variant="h2" align="center" gutterBottom>
        About Us
      </Typography>
      <Typography variant="body1" paragraph>
        We are a team of passionate individuals dedicated to delivering the best services. Our mission is to provide high-quality solutions tailored to our clients' needs. With a focus on innovation and excellence, we strive to exceed expectations and create value in everything we do.
      </Typography>

      <Typography variant="h4" align="center" gutterBottom>
        Meet the Team
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={4} key={member.name}>
            <StyledPaper>
              <Avatar alt={member.name} src={member.img} sx={{ width: 100, height: 100, margin: 'auto' }} />
              <Typography variant="h6" gutterBottom>
                {member.name}
              </Typography>
              <Typography variant="subtitle1">{member.role}</Typography>
            </StyledPaper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" align="center" gutterBottom style={{ marginTop: '20px' }}>
        Want to access more features? 
      </Typography>
      <Button 
        onClick={handleLoginClick}
        variant="contained" 
        color="primary" 
        sx={{ display: 'block', margin: '20px auto' }}
      >
        Login
      </Button>
    </Container>
  );
};

export default Inicio;
