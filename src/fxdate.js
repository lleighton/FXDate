!function() {
    var root = this;
    root.FXDate = root.FXDate ||
	//if you use a date wrapper that supports the native js Date methods then you can optionally pass this in - e.g something like Date.js
    function(dateClass) {
       return new FXDateWrapper(dateClass);
    };

	var FXDateWrapper = function(dateClass){
		 //TODO - pass in a list of blacklisted/holiday days to check against
	        this.oDate = dateClass || Date;
			this.units = {day : 1, week : 7, month : 28, year : 365};
			this.matchers = {
				day : /^([1-9])*\s?d(ay)?s?/i,
				week : /^([1-9])*\s?w(ee)?k?s?/i,
				month : /^([1-9]*)\s?m(on)?t?h?/i,
				year : /^([1-9])*\s?y(ea)?r?s?/i
			};
	}

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = root.FXDate;
        isNode = true;
    }


    var proto = FXDateWrapper.prototype;

    proto.isDate = function(d) {
        if (Object.prototype.toString.call(d) !== "[object Date]")
        return false;
        return ! isNaN(d.getTime());
    };

    proto.isTradingDay = function(dt) {
        return this.isDate(dt) ? dt.getDay() < 6 && dt.getDay() > 0 ? true: false: false;
    };

    proto.getIMM = function(quarter, year) {
        var y = year || new this.oDate().getFullYear();
        var m = (quarter * 3) - 1;
        var dt = new this.oDate(y, m, 01);

        var firstWeds = 1 + (3 - dt.getDay() + 7) % 7;
        var thirdWeds = firstWeds + 14;
        dt.setDate(thirdWeds);
        return dt;
    };

    //does not account for public holidays at this point - will implement a todo for adding holiday/non-trading days.
    proto.getSpot = function(dt) {
        var dt = this.isDate(dt) ? dt: new this.oDate(), spot;
        switch (dt.getDay()) {
        case 5:
        case 4:
            spot = 4;
            break;
        case 6:
            spot = 3;
            break;
        default:
            spot = 2;
        }
        dt.setDate(dt.getDate() + spot);
        return dt;
    };

    proto.getQuarter = function(dt) {
        var dt = this.isDate(dt) ? dt: new this.oDate();
        return Math.floor(parseInt(dt.getMonth(),10) / 3 + 1);
    };

    proto.getFiscalQuarter = function(yearEnd, dt) {
        var dt = this.isDate(dt) ? dt: new this.oDate();
        var yearEnd = (yearEnd ? yearEnd: 11) + 1;
        var m = dt.getMonth();
        //hat tip to saltlakejohn - converted from his php function found somewhere on the interwebs
        return Math.ceil((m + (21 - (yearEnd - 1))) / 3) % 4 + 1;
    };

    proto.getStandardizedCDS = function(contractLengthYears, dt) {
        var cds = {
            cdsm1: {
                m: 2,
                d: 20
            },
            cdsm2: {
                m: 5,
                d: 20
            },
            cdsm3: {
                m: 8,
                d: 20
            },
            cdsm4: {
                m: 11,
                d: 20
            }
        };
        var dt = this.isDate(dt) ? dt: new this.oDate();
        var q = this.getQuarter(dt);
        var fCDS = cds['cdsm' + q];
        var maturity = new this.oDate((parseInt(dt.getFullYear(),10) + contractLengthYears), fCDS.m, fCDS.d);
        return maturity;
    };
	//returns a tenor length in days eg 1week = 1*7, 1month = 1*28 ... 
	//accepts a simple string for parsing: 1d(ay), 3w(eek) etc...
	proto.getTenor = function(tenor){
		for(unit in this.matchers){
			var matched = this.matchers[unit].exec(tenor);
			if(matched) 
				return matched[1] * this.units[unit];
		}
		return 0;
		
	};

} ();