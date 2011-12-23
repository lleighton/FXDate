var fxdate = require('./src/fxdate.js');

var fxd = new fxdate();

var imm4_2012 = fxd.getIMM(4, 2012);
console.log("International Money Market day (third Wednesday of December ) for IMM4 2012: ",imm4_2012.toString());

var spotdate = new FXDate().getSpot();
console.log("Spot date - two working days from today: ",spotdate.toString());

var qd = new Date(2011,1,14);

var quarter = fxd.getQuarter(qd);
console.log("Quarter number for normal year using date of 14 Feb 2011: ", quarter);

var fq = fxd.getFiscalQuarter(7,qd);
console.log("Fiscal Quarter No. for February in a financial year ending in August:", fq)

var maturity = fxd.getStandardizedCDS(5);
console.log("5 year Credit Default Swap maturity date: ", maturity.toString());

console.log("Is today a trading day: ", fxd.isTradingDay(new Date()) ? "yes" : "no");

console.log("3 week tenor starting today would occur this number of days in the future:",fxd.getTenor('3w'));