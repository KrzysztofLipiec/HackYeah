require('./server/App.js');

serveFrontDist(8080);

function serveFrontDist(port) {
    const express = require('express');
    const app = express();
    app.use(express.static('dist'))
    app.listen(port, () => {
        console.log(`front listening on ${port}`)
    });
}