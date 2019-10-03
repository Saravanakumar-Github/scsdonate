var express = require('express');
var router = express.Router();
var braintree = require('braintree');

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  // Use your own credentials from the sandbox Control Panel here
  merchantId: 'Sandbox merchant ID here',
  publicKey: 'Sandbox public key here',
  privateKey: 'Sandbox private key here'
  });


    router.get('/', function(req, res, next) {
      gateway.clientToken.generate({}, function (err, response) {
        res.send(response.clientToken);
      }); 
    });
  
  //for get methods
  /*router.get('/', function(req, res, next) {
    gateway.clientToken.generate({
      options:{failOnDuplicatePaymentMethod: true},
    }, function (err, response) {
      res.send(response.clientToken);
    }); 
  });*/


  
//post methods
router.post('/', function(req, res, next) {
  // Use the payment method nonce here
    var nonceFromTheClient = req.body.paymentMethodNonce;
    var amt = req.body.billingamount;
    console.log(nonceFromTheClient);
    console.log(amt);
  // Create a new transaction for 10 Euros
  var newTransaction = gateway.transaction.sale({
  //amount: '10.00',
  amount: amt,
  paymentMethodNonce: nonceFromTheClient,
  options: {
    // This option requests the funds from the transaction
    // once it has been authorized successfully
    submitForSettlement: true
  },
  /*three_d_secure:{
    required: false
  },*/
  //Kount - Server  
  deviceData: req.body.device_data
  }, function(error, result) {
    //console.log(result);
    if (result.success) {
    res.send(result);
    } else if(result.success == false) {
    //res.send(error);
    //res.status(500).send(error);
    console.log(result);
    console.log(result.message);
    //res.send(result.message);
    res.send(result.success);
    }
  });
});

module.exports = router;
