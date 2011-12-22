!function() {

    var root = this;
    root.FXDate = root.FXDate ||
	//if you use a date wrapper that supports the native js Date methods then you can optionally pass this in - e.g something like Date.js
    function(dateClass) {
        this.oDate = dateClass || Date;
        //TODO - pass in a list of blacklisted/holiday days to check against
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = root.FXDate;
        isNode = true;
    }


    var proto = FXDate.prototype;

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
    /*
	Does not account for public holidays on "week days" - e.g. Christmas day, Boxing Day and New Years 
	day would be picked as the closest spot days if they fell on week days regardless of market status.
	
    A validator class should be used outside of this lib if you wish to check the validity of days against local holidays.
	
	
	*/
    proto.getSpot = function(dt) {
        var dt = this.isDate(dt) ? dt: new this.oDate();
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
        return Math.floor(parseInt(dt.getMonth()) / 3 + 1);
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
        var maturity = new this.oDate((parseInt(dt.getFullYear()) + contractLengthYears), fCDS.m, fCDS.d);
        return maturity;
    };

} ();