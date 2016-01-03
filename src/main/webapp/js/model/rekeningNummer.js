define(['jquery',
        "knockout"],
    function($, ko) {

	return function(data){
	    var thisRek = this;

	    thisRek.id = ko.observable(data.id);
        thisRek.rekeningnummer = ko.observable(data.rekeningnummer),
        thisRek.bic = ko.observable(data.bic)

        thisRek.startBewerken = function(nummer){
            nummer.rekeningnummer(nummer.rekeningnummer().replace(/ /g, ""));
        };

        thisRek.stopBewerken = function(nummer){
            zetRekeningnummerOm(nummer);
        };


        zetRekeningnummerOm = function(nummer){
            if(nummer.rekeningnummer() !== undefined){
                var rek = nummer.rekeningnummer().toUpperCase();

                if(rek !== undefined && rek.length === 18){
                    rek = rek.substring(0, 4) + " " +rek.substring(4, 8) + " " +rek.substring(8, 12) + " " +rek.substring(12, 16) + " " +rek.substring(16, 18);
                }

                nummer.rekeningnummer(rek);
            }
        };

        zetRekeningnummerOm(thisRek);
	};
});