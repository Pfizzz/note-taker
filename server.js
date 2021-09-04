const express = require('express');
// instantiate the server
const PORT = process.env.PORT || 3001;
const app = express();

// this will be modularized later
const { notes } = require('./db/db');

app.get('/api/notes', (req, res) => {
    res.json(notes);
    console.log("success");
  });

// start server, goes at bottom

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
  });
  