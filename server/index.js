const userApi = require('./api/userApi');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api',userApi);

app.listen(3000);
console.log('success listen at port:3000.......');