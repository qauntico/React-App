const express = require('express');
const compression = require('compression');//is a middleware for enabling gzip compression of responses
const path = require('path');// is a built-in Node.js module for handling file paths.
const app = express();
 
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));
 
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
 
const PORT =  3000;
 
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});