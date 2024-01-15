import express from 'express'
import { summarizeText } from './summarize.js'

const app = express();

const port = 3000;

app.use(express.json());

app.use(express.static('public'));

app.post('/summarize', (req, res) => {
 // get the text_to_summarize property from the request body
  const text = req.body.text_to_summarize;

  summarizeText(text)
    .then(response => {
      res.send(response);
    })
    .catch(error => {
      console.log(error.message);
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});