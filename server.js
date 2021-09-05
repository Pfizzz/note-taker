const express = require('express');
// instantiate the server
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
app.use(express.static("/public"));
const uniqid = require('uniqid');

// middleware to parse incoming data
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());


// dont get rid of this
// const { notes } = require('./db/db');

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

    fs.readFile(path.join(__dirname, './db/db.json'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).json(err);
            return;
        }
        var json = JSON.parse(data);
        var note = req.body;
        note.id = uniqid();
        json.push(note);

        fs.writeFile(path.join(__dirname, './db/db.json'), 
        JSON.stringify(json), (err) => {
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
