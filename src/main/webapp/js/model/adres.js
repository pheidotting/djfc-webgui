define(['jquery',
        'commons/commonFunctions',
         'knockout',
         'commons/3rdparty/log',
        'dataServices'],
	function ($, commonFunctions, ko, log, dataServices) {

	return function(data){
	    var thisAdres = this;

        thisAdres.verwijderAdres = function(){
        };

        thisAdres.zetPostcodeOm = function(){
            log.debug(thisAdres.postcode);
            if(thisAdres.postcode() != null && thisAdres.postcode().length === 6){
                thisAdres.postcode(thisAdres.postcode().toUpperCase());
                thisAdres.postcode(thisAdres.postcode().substring(0, 4) + " " + thisAdres.postcode().substring(4));

                return thisAdres.postcode();
            }
        };
        thisAdres.id = ko.observable(data.id);
		thisAdres.straat = ko.observable(data.straat);
		thisAdres.huisnummer = ko.observable(data.huisnummer).extend({ number: true});
		thisAdres.toevoeging = ko.observable(data.toevoeging);
		thisAdres.postcode = ko.observable(data.postcode);
        thisAdres.soortAdres = ko.observable(data.soortAdres);
		thisAdres.plaats = ko.observable(data.plaats);
		thisAdres.soortEntiteit = ko.observable(data.soortEntiteit);
		thisAdres.entiteitId = ko.observable(data.entiteitId);

		thisAdres.zetPostcodeOm();

        thisAdres.opzoekenAdres = function(){
            log.debug(ko.toJSON(thisAdres));
            thisAdres.postcode(thisAdres.postcode().toUpperCase().replace(" ", ""));

            dataServices.ophalenAdresOpPostcode(thisAdres.postcode(), thisAdres.huisnummer()).done(function(data){
                log.debug(JSON.stringify(data));
				thisAdres.straat(data.straat);
				thisAdres.plaats(data.plaats.toUpperCase());
				thisAdres.postcode(thisAdres.zetPostcodeOm(thisAdres.postcode()));
            }).fail(function(data){
                log.debug(JSON.stringify(data));
                thisAdres.straat('');
                thisAdres.plaats('');
            });
        };
    };
});