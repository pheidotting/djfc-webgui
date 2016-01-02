define(['jquery',
         'knockout',
         'commons/3rdparty/log',
         'commons/commonFunctions',
         'moment',
         'model/bijlage',
         "commons/opmaak",
         'dataServices',
         'navRegister',
         'redirect',
         'fileUpload',
         'opmerkingenModel'],
	function ($, ko, log, commonFunctions, moment, Bijlage, opmaak, dataServices, navRegister, redirect, fileUpload, opmerkingenModel) {

	return function polisModel (data){
		var _cijfers = this;

		_cijfers.opmerkingenModel = new opmerkingenModel(data.opmerkingen, null, null, null, null, null, null, data.id);

        _cijfers.readOnly = ko.observable(false);
        _cijfers.notReadOnly = ko.observable(true);
		_cijfers.jaar = ko.observable(data.jaar);
		_cijfers.id = ko.observable(data.id);
		_cijfers.soortEntiteit = ko.observable('JaarCijfers');
		_cijfers.idDiv = ko.computed(function() {
	        return "collapsable" + data.id;
		}, this);
		_cijfers.idDivLink = ko.computed(function() {
	        return "#collapsable" + data.id;
		}, this);
		_cijfers.bijlages = ko.observableArray();
		if(data.bijlages != null){
			$.each(data.bijlages, function(i, item){
				var bijlage = new Bijlage(item);
				_cijfers.bijlages().push(bijlage);
			});
		};

		_cijfers.nieuwePolisUpload = function (){
			log.debug("Nieuwe polis upload");
            commonFunctions.verbergMeldingen();
			$('uploadprogress').show();
			fileUpload.uploaden().done(function(bijlage){
				log.debug(ko.toJSON(bijlage));
				_cijfers.bijlages().push(bijlage);
				_cijfers.bijlages.valueHasMutated();
			});
		};
    };
});