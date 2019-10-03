var express = require('express');
var router = express.Router();
var braintree = require('braintree');

var gateway = braintree.connect({
environment: braintree.Environment.Sandbox,
// Use your own credentials from the sandbox Control Panel here
merchantId: '',
publicKey: '',
privateKey: ''
});

//post methods
router.post('/refund', function(req, res, next) {
// get refund transcation ID
    var theTransactionId = req.body.refundTrasactId;

gateway.transaction.refund(theTransactionId, function (err, result) {
    if (result) {
        res.send(result);
    } else {
        res.status(500).send(error);
    }
});
});

module.exports = router;
