define(['jquery',
         'knockout',
         'commons/3rdparty/log',
         'commons/commonFunctions',
         'model/bijlage',
         'fileUpload',
         'opmerkingenModel',
         'dataServices'],
    function ($, ko, log, commonFunctions, Bijlage, fileUpload, opmerkingenModel, dataServices) {

	return function (data){
		var _risicoAnalyse = this;

		_risicoAnalyse.opmerkingenModel = new opmerkingenModel(data.opmerkingen, null, null, null, null, null, null, null, data.id);

        _risicoAnalyse.readOnly = ko.observable(false);
        _risicoAnalyse.notReadOnly = ko.observable(true);
		_risicoAnalyse.id = ko.observable(data.id);
		_risicoAnalyse.soortEntiteit = ko.observable('RisicoAnalyse');
        _risicoAnalyse.bijlages = ko.observableArray();
        if(data.bijlages != null){
            $.each(data.bijlages, function(i, item){
                var bijlage = new Bijlage(item);
                _risicoAnalyse.bijlages().push(bijlage);
            });
        };

		_risicoAnalyse.nieuwePolisUpload = function (){
			log.debug("Nieuwe file upload");
            commonFunctions.verbergMeldingen();
			$('uploadprogress').show();
			fileUpload.uploaden().done(function(bijlage){
				log.debug(ko.toJSON(bijlage));
				_risicoAnalyse.bijlages().push(bijlage);
				_risicoAnalyse.bijlages.valueHasMutated();
			});
		};

        _risicoAnalyse.verwijderBijlage = function(bijlage){
            commonFunctions.verbergMeldingen();
            var r=confirm("Weet je zeker dat je deze bijlage wilt verwijderen?");
            if (r === true) {
                _risicoAnalyse.bijlages.remove(bijlage);
                dataServices.verwijderBijlage(bijlage.id());
            }
        };

    };
});