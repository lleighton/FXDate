!function() {

    var root = this;
    root.FXDate = root.FXDate ||
    function(dateFunction) {
        this.oDate = dateFunction || Date;
        //do stuff specific to this instance...
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

	proto.getQuarter = function(dt){
		var dt = this.isDate(dt) ? dt: new this.oDate();
		return Math.floor(parseInt(dt.getMonth())/3 + 1); 
	};
	
	proto.getFiscalQuarter = function(yearEnd,dt){		
		// $currQuarter = ceil(( date('n') + ( 21 - ( 9 -1 ))) /3 ) %4 +1 
		var dt = this.isDate(dt) ? dt: new this.oDate();
		var yearEnd = (yearEnd ? yearEnd : 11) +1;
		var m = dt.getMonth();
		
		return Math.ceil(( m + ( 21 - ( yearEnd -1 ))) /3 ) %4 +1;
	};

    proto.getStandardizedCDS = function(contractLengthYears, dt) {
        var dt = this.isDate(dt) ? dt: new this.oDate();
		// TODO find the closest CDS date based on maturity of contract length on years

    };

} ();


