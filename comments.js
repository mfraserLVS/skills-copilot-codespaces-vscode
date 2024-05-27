// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Path: comments.json
// Read the file comments.json
let comments = require('./comments.json');

// Path: comments.json
// Write the file comments.json
function writeComments(comments) {
  fs.writeFileSync('./comments.json', JSON.stringify(comments, null, 2));
}

// Path: comments.js
// Use body-parser
app.use(bodyParser.json());

// Path: comments.js
// Create a route to get the comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Path: comments.js
// Create a route to post a comment
app.post('/comments', (req, res) => {
  const newComment = req.body;
  comments.push(newComment);
  writeComments(comments);
  res.json(newComment);
});

// Path: comments.js
// Create a route to get a comment by id
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments[id];
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

// Path: comments.js
// Create a route to delete a comment by id
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments[id];
  if (comment) {
    comments = comments.filter((comment, i) => i !== Number(id));
    writeComments(comments);
    res.json(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

// Path: comments.js
// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});