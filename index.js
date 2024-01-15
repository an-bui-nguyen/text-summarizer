import express from 'express'
import { summarizeText } from './summarize.js'

const app = express();

const port = 3000;

app.use(express.json());

app.use(express.static('public'));

app.post('/summarize', (req, res) => {
 // get the text_to_summarize property from the request body
  const text = req.body.text_to_summarize;
  const min_length = req.body.min_length;
  const max_length = req.body.max_length;

  summarizeText(text, min_length, max_length)
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