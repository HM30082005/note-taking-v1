import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Container,
  Box,
} from '@mui/material';

const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
  });

  const clearForm = {
    name: '',
    age: '',
    gender: '',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  






const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('/people', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Success:', data);
          setFormData(clearForm);
          // Handle successful response
        } else {
          console.error('Error:', response.statusText);
          // Handle error response
        }
      } catch (error) {
        console.error('Error:', error);
        // Handle network or other errors
      }
    console.log(formData)
  };











  return (
    <Container>
        <Box marginTop={5}>
            <Typography variant="h2" component="h1">
                Enter your details
            </Typography>
        </Box> 
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{ mt: 3 }}
      >
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <TextField
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>
        <Button 
            variant="contained" 
            color="primary" 
            type="submit" 
            sx={{
                width: '10vw', 
                height: '5vh', 
                left: '50%',
                transform: 'translateX(-50%)',
        }}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default MyForm;
