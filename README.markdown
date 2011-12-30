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

API
---

* `isDate(date)` - Returns `true` if a date is valid
* `isTradingDay(date)` - Returns `true` if the date is a trading day (Mon-Fri)
* `getIMM(quarter[,year])` - Returns the `Date` of an IMM for a given quarter and year
* `getSpot([date])` - Returns the forward spot `Date` for a start date - if no date entered uses today as the start point
* `getQuarter([date])` - Returns the year "quarter" (1-4) of a specific date.
* `getFiscalQuarter(yearEnd[,date])` - Return the fiscal quarter (1-4) of a financial year based on the month (yearEnd) that the financial year is due to end.
* `getStandardizedCDS(contractLengthYears[,date])` - Returns the standardised maturity `Date` of a 5 year Credit Default Swap based on contract length and start date params
* `getTenor(tenor)` - Return the numeric value in days of a "tenor" (1w, 1m, 1y). Attempts to parse a string e.g. 1 w/wk/week