'use strict'
const express = require('express')
const app = express()
const getCats = require('./routes/07-route');
const postCats = require('./routes/08-route');
const getAccessories = require('./routes/09-route');
const putAccessory = require('./routes/10-route');
const postAccessory = require('./routes/11-route');
const deleteAccessory = require('./routes/12-route');
const putAccessoryPopularity = require('./routes/13-route');
const putCatAccessory = require('./routes/14-route');

// Acuérdense de agregar su router o cualquier middleware que necesiten acá.


app.use(express.json());
app.use(getCats);
app.use(postCats);
app.use(getAccessories);
app.use(putAccessory);
app.use(postAccessory);
app.use(deleteAccessory);
app.use(putAccessoryPopularity);
app.use(putCatAccessory);

module.exports = app;
