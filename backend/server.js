import express from 'express'
import bodyParser from 'body-parser';

import { getPeople, getPerson, addPerson, checkPerson, deletePerson } from './database.js'

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.get('/people', async (req, res) => {
  const { name, age, gender } = req.query;
  if (name && age && gender) {
    const person = await checkPerson(name, age, gender);
    if (person) {
      res.json(person);
    } else {
      res.status(404).send('Person not found');
    }
  } else {
    const people = await getPeople();
    res.json(people);
  }
});

app.get("/people/:id", async (req, res) => {
  const id = req.params.id
  const person = await getPerson(id)
  res.send(person)
})



app.post("/people", async (req, res) => {
  const { name, age, gender } = req.body
  const person = await addPerson(name, age, gender)
  res.status(201).send(person)
})

app.delete('/people/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const success = await deletePerson(id);
    if (success) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).send('Person not found');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// app.post('/hello', (req, res) => {
//   const formData = req.body;
//   console.log('Received form data:', formData);
//   // Process the form data here
//   data.push(formData)
//   res.status(200).json({ message: 'Form data received successfully' });
// });

// app.get('/info', (req, res) => {
//     res.status(200).json({ data });
// })

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
