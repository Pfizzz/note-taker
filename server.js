const express = require('express');
// instantiate the server
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
app.use(express.static("public"));
const uniqid = require('uniqid');

// middleware to parse incoming data
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());


// dont get rid of this
// const { notes } = require('./db/db');

// HTML routes

// /notes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
})

// catch-all
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });


// get request
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf-8', function (err, data) {
        var json = JSON.parse(data);
        res.json(json);
        console.log("success get request");
    });
});

// POST request
app.post('/api/notes', (req, res) => {
    var note = req.body;
    fs.readFile(path.join(__dirname, './db/db.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        var parse = JSON.parse(data);

        note.id = uniqid();
        // app breaks here, works fine with "notes" instead of "json"
        // but stores it in the "notes" variable above and does not write
        // to json file
        parse.push(note);

        fs.writeFile(path.join(__dirname, './db/db.json'), 
        JSON.stringify(parse), (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log("success!!!!");
            res.json(note);
        });
    });
});


// start server, goes at bottom

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
