/* eslint-disable linebreak-style */

const express = require('express');

const router = express.Router();

const { getTypes } = require('../controller/Types');

router.get('/', getTypes);

module.exports = router;
