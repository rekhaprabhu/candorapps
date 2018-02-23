var http=require('http');
var express    = require("express");
var bodyParser = require('body-parser');
var app = express();
var port = Number(process.env.PORT || 5000);
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}));
app.locals.baseurl = 'http://localhost:5000';

 
var Paypal = require('paypal-adaptive');

var paypalSdk = new Paypal({
    userId:    'tharani.kr2_api1.candorapps.com',
    password:  '5CSM87ALLLVURH7T',
    signature: 'AFcWxV21C7fd0v3bYYYRCpSSRl31AEjbgNoLOIz0udBzlKPXaL.YM7i4',
    sandbox:   true //defaults to false
});
app.post("/checkout", function (req, res) {
  var payload = {
    requestEnvelope: {
        errorLanguage:  'en_US'
    },
    actionType:     'PAY',
    currencyCode:   'USD',
    feesPayer:      'PRIMARYRECEIVER',
    memo:           'Chained payment example',
    cancelUrl:      'http://localhost:5000/cancel',
    returnUrl:      'http://localhost:5000/paymentdetails',
    receiverList: {
        receiver: [
            {
                email:  'tharani.kr2@candorapps.com',
                amount: '110.00',
                primary:'true'
            },
            {
                email:  'rekha_test@candorapps.com',
                amount: '10.00',
                primary:'false'
            }
        ]
    }
};
 
paypalSdk.pay(payload, function (err, response) {
    if (err) {
        console.log(err);
         console.log(response);
    } else {
        // Response will have the original Paypal API response 
        console.log(response);
        // But also a paymentApprovalUrl, so you can redirect the sender to checkout easily 
        console.log('Redirect to %s', response.paymentApprovalUrl);
    }
});

});
app.get("/accountverify", function (req, res) {
var params = {
    emailAddress: 'lokeshsnsce@gmail.com',
    firstName:'lokesh',
    lastName:'suriyamoorthy',
    matchCriteria:'NONE'
};

paypalSdk.getVerifiedStatus(params, function (err, response) {
    if (err) {
        console.log(err);
        console.log(JSON.stringify(response));
    } else {
        // payments details for this payKey, transactionId or trackingId
        console.log(JSON.stringify(response));
    }
});
  });
app.get("/paymentdetails", function (req, res) {
var params = {
    payKey: 'AP-76333719MC642605V'
};
// Or the transactionId
// var params = {
//     transactionId: 'AP-1234567890'
// };
// // Or the trackingId
// var params = {
//     trackingId: 'AP-1234567890'
// };

paypalSdk.paymentDetails(params, function (err, response) {
    if (err) {
        console.log(err);
    } else {
        // payments details for this payKey, transactionId or trackingId
        console.log(JSON.stringify(response));
    }
});
});
// Starting server
var server = http.createServer(app).listen(port, function() {
console.log("Listening on " + port);
});


