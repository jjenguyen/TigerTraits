//removed extraneous code, just basic app.js for backend setup
const express = require('express');
const app = express();


const port = 3000;
//log to console the app is running
app.listen(port, () => {
    console.log(`App.js running server on port ${port}!`);
});