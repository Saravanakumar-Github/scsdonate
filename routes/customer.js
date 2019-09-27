var express = require('express');
var router = express.Router();
var braintree = require('braintree');

var gateway = braintree.connect({
environment: braintree.Environment.Sandbox,
// Use your own credentials from the sandbox Control Panel here
merchantId: '3xj4zw2pjhs26929',
publicKey: '9vm3gb2272p4kcpb',
privateKey: 'c3c33d8fb55cd194145efc975b8828a3'
});

//post methods
router.post('/createCustomer', function(req, res, next) {
    var fname = req.body.firstName;
    var lname = req.body.lastName;
    var company = req.body.company;
    var email = req.body.email;
    var phone = req.body.phone;
    var nonceFromTheClient = req.body.paymentMethodNonce;
    //var cc = "4000111111111115";
    console.log(fname);
    //create customer
    gateway.customer.create({
        firstName: fname,
        lastName: lname,
        company: company,
        email: email,
        phone: phone,
        paymentMethodNonce: nonceFromTheClient
    },function (err, result) {
        console.log(result);
        if (result.success) {
            res.send(result);
            console.log(result.customer.id);
        } else {
            res.status(500).send(error);
        }
    });
});

//post methods
router.post('/delCustomer', function(req, res, next) {
    //delete customer
    var cusIdDel = req.body.customerID;
    console.log(cusIdDel);
    gateway.customer.delete(cusIdDel, function (err,result) {
        err;
        // null
        if(result.success){
            res.send(result);
            console.log('Customerrrr deleted sucessfully');
        }
        console.log('Customer deleted sucessfully');
      });

});

//subscription post methods
router.post('/subscription', function(req, res, next) {
    var fname = "Buddy";
    var lname = "verificationdecline";
    var company = "Braintree";
    var email = "reqbody@email.com";
    var phone = "8794564521";
    console.log(fname);
    //create customer
    gateway.customer.create({
        firstName: fname,
        lastName: lname,
        company: company,
        email: email,
        phone: phone,
        paymentMethodNonce: nonceFromTheClient
    },function (err, result) {
        console.log(result);
        console.log(result.paymentMethods);
        if (result.success) {
            res.send(result);
            console.log(result.customer.id);
         /*create subscription
            var the_token = req.body.clientToken;
            var planId = req.body.planId;
            console.log(the_token,planId);
            gateway.subscription.create({
                paymentMethodToken: the_token,
                planId: planId
            }, function (err, result) {
                if(result.success){
                    res.send(result);
                    console.log('subscription done sucessfully');
                }
            });*/
        } else {
            res.status(500).send(error);
        }
    });
});

module.exports = router;