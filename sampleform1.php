<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Pay with BrainTree</title>
    
    <!-- jquery -->
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script> -->
<script src="https://code.jquery.com/jquery-latest.min.js" type="text/javascript"></script>
    <!-- braintree -->
    <script src="https://js.braintreegateway.com/js/braintree-2.31.0.min.js"></script>
    
    <!-- setting up braintree -->
    <script type="text/javascript">  
    
    </script>



    <style>
        label.heading {
            font-weight: 600;
        }
        .payment-form {
            width: 300px;
            margin-left: auto;
            margin-right: auto;
            padding: 10px;
            border: 1px #333 solid;
        }
    </style>

</head>
<body style="text-align: center; margin-top: 100px;">
    <form id='checkout-form' action="http://localhost:5000/checkout" method="post" class="payment-form">
        <label for="firstName" class="heading">First Name</label><br>
        <input type="text" name="firstName" id="firstName"><br><br>

        <label for="lastName" class="heading">Last Name</label><br>
        <input type="text" name="lastName" id="lastName"><br><br>

        <label for="amount" class="heading">Amount (USD)</label><br>
        <input type="text" name="amount" id="amount"><br><br>

        <div id="dropin-container"></div>
        <br><br>
        <button type="submit">Pay with BrainTree</button>

    </form>
    
</body>
</html>