const obj = require('./logger')
const express = require('express');
const router = express.Router();

router.get('/test-me', function (req, res) {
    obj.test('Call Welcome')
    console.log(obj.endpoint)
    res.send('Welcome to my application')
});

module.exports = router;
// adding this comment for no reason