const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

//tells app to use files from this directory
app.use(express.static(__dirname));


//tells the app to serve index.html when we hit landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});



//log to console the app is running
app.listen(port, () => {
    console.log(`App.js running server on port ${port}!`);
});