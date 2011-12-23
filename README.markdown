FXDate
======

FXDate is a simple utility for calculating Forex (FX) and other financial transaction related dates.

It is a very lightweight util that can be used in the browser or with node.js.

(See the project index.html for a quick and dirty example.)

In the browser
--------------

	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<title>Quick FXDates</title>
		<script src="fxdate.js"></script>
	</head>
	<body>
		<script>
		var fxd = new FXDate();
		var fiveYearCreditDefaultSwap = fxd.getStandardizedCDS(5);
		console.log(fiveYearCreditDefaultSwap.toString());
		</script>
	</body>
	</html>

In node.js
----------
Simply import the module into your project `var fxdate = require('./src/fxdate.js');`

See server.js for example.

Enjoy!