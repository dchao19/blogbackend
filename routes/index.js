var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.json({status: "API OK!"});
});

module.exports = router;
