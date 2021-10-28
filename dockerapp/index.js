const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('hello world, puro microservicios papaaa!');
});

app.listen(8080, () => {
    console.log('app listening on port 8080');
})