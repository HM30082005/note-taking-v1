import React, { useEffect, useState } from 'react';
import { Container, List, ListItem, ListItemText, CircularProgress, Box } from '@mui/material';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/people');
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ mt: 3 }}>
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={(index + 1) + ". " + item.name} secondary={item.age + " years old, " + item.gender} />
          </ListItem>
        ))}
      </List>
    </Container>
    // <div>{JSON.stringify(items)}</div>
  );
};

export default ItemList;
