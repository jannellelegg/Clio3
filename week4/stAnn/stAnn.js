var stAnnReport = {

 	addReport: function (year, baptisms, confirmations, communicants, marriages, burials, parishfunds, buildingfund){
		this[year] = {baptisms: baptisms, confirmations: confirmations, communicants: communicants, marriages: marriages, burials: burials, parishfunds: parishfunds, buildingfund: buildingfund};
		}
};

var fiftytwo = stAnnReport.addReport(1852, 4, 6, 16, 1, 7,  667.20, 6500.00);
var fiftythree = stAnnReport.addReport(1853, null, 25, 5, 2, 517.12, 9500.00); 
var fiftyfour = stAnnReport.addReport(1854, 13, 16, 51, 3, 5, 751.00, 11422.26);
var fiftyfive = stAnnReport.addReport(1855, 3, 6, 64, 3, 4, 912.78, 17883.80);
var fiftysix = stAnnReport.addReport(1856, 3, null, 71, 6, 7, 1024.50, 1590.42);
var fiftyseven = stAnnReport.addReport(1857, 11, 9, 64, 4, 6, null, null);
var fiftyeight = stAnnReport.addReport(1858, 14, 11, 89, 8, 10, 7017.79, 21000.00); 


var fiftynine = stAnnReport.addReport(1859, 48, 30, 141, [12,2], 22, 2308.50, 11277.84);



//marriages(
//	deaf
	//hearing)