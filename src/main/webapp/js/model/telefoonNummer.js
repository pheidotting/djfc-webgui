define(['jquery',
        "knockout"],
     function($, ko) {

	return function telefoonnummerModel (data){
	    thisTel = this;

	    thisTel.id = ko.observable(data.id);
        thisTel.telefoonnummer = ko.observable(data.telefoonnummer);
        thisTel.soort = ko.observable(data.soort);
        thisTel.omschrijving = ko.observable(data.omschrijving);

        thisTel.startBewerken = function(nummer){
            nummer.telefoonnummer(nummer.telefoonnummer().replace(/ /g, "").replace("-", ""));
        };

        thisTel.stopBewerken = function(nummer){
            zetTelefoonnummerOm(nummer);
        };

        zetTelefoonnummerOm = function(nummer){
            var tel = nummer.telefoonnummer();
            if(tel != undefined && tel.length == 10){
                if(tel.substring(0, 2) == "06"){
                    //06 nummers
                    tel = tel.substring(0, 2) + " - " + tel.substring(2, 4) + " " + tel.substring(4, 6) + " " + tel.substring(6, 8) + " " + tel.substring(8, 10);
                } else if(tel.substring(0, 1) == "0" && tel.substring(2, 3) == "0"){
                     //3 cijferig kengetal
                    tel = tel.substring(0, 3) + " - " + tel.substring(3, 6) + " " + tel.substring(6, 8) + " " + tel.substring(8, 10);
                } else {
                    //4 cijferig kengetal
                    tel = tel.substring(0, 4) + " - " + tel.substring(4, 6) + " " + tel.substring(6, 8) + " " + tel.substring(8, 10);
                }
                nummer.telefoonnummer(tel);
            }
        };

        zetTelefoonnummerOm(thisTel);
    };
});