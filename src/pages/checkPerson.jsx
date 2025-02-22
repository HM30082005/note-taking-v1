import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, CircularProgress, Box, TextField, Button, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CheckPersonForm = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({
    name: '',
    age: '',
    gender: ''
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const queryString = new URLSearchParams(searchParams).toString();
      const response = await fetch(`/people?${queryString}`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      setItems([])
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = () => {
    fetchData();
  };



  const handleClick = async (id) => {
    try {
        const response = await fetch(`/people/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          // Update the state to remove the deleted item
          setItems(items.filter(item => item.id !== id));
        } else {
          console.error('Failed to delete person:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting person:', error);
      }
  };


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 3 }}>
      <Box sx={{ mb: 3 }}>
        <TextField
          label="Name"
          name="name"
          value={searchParams.name}
          onChange={handleChange}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Age"
          name="age"
          value={searchParams.age}
          onChange={handleChange}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Gender"
          name="gender"
          value={searchParams.gender}
          onChange={handleChange}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} sx={{height: '56px', width: '100px'}}>
          Search
        </Button>
      </Box>
      <List>
        {items.length > 0 ? items.map((item, index) => (
          <ListItem key={index}>
            {/* <ListItemText primary={`${index + 1}. ${item.name}`} secondary={`${item.age} years old, ${item.gender}`} /> */}
            <ListItem>
                <ListItemText primary={`${index + 1}. ${item.name}`} secondary={`${item.age} years old, ${item.gender}`} />
                <CloseIcon onClick={() =>  handleClick(item.id)}/>
            </ListItem>
          </ListItem>
        )) : (
          <ListItem>
            <ListItemText primary="No results found" />
          </ListItem>
        )}
      </List>
    </Container>
  );
};

export default CheckPersonForm;
