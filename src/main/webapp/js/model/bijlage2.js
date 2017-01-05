define(['jquery',
         'knockout',
         'commons/3rdparty/log',
         'commons/commonFunctions',
         'dataServices'],
	function ($, ko, log, commonFunctions, dataServices) {

	return function bijlageModel (){
		_this = this;

		_this.id = ko.observable();
		_this.url = ko.computed(function() {
			return "../dejonge/rest/medewerker/bijlage/download?id=" + _this.id();
		}, this);
		_this.bestandsNaam = ko.observable();
		_this.omschrijving = ko.observable();
		_this.datumUpload = ko.observable();
		_this.soortEntiteit = ko.observable();
		_this.entiteitId = ko.observable();
		_this.omschrijvingOfBestandsNaam = ko.observable();
//		_this.omschrijvingOfBestandsNaamBackup = '';
//
//		_this.resetOmschrijving = function(bijlage){
//			if(bijlage.omschrijvingOfBestandsNaam() == null || bijlage.omschrijvingOfBestandsNaam() == ''){
//				if(bijlage.omschrijving() == null || bijlage.omschrijving() == ''){
//					bijlage.omschrijvingOfBestandsNaam(bijlage.bestandsNaam() + " " + bijlage.datumUpload());
//				}else{
//					bijlage.omschrijvingOfBestandsNaam(bijlage.omschrijving() + " " + bijlage.datumUpload());
//				}
//			}
//		}
//
//		_this.tonen = ko.computed(function() {
//			return ko.utils.unwrapObservable(_this.soortBijlage) + " (" + ko.utils.unwrapObservable(_this.parentId) + ")";
//		},this);
//		_this.stopEditModus = function(bijlage){
//			console.log(ko.toJSON("stopEditModus " + bijlage.id()));
//			$('#tekst' + bijlage.id()).show();
//			$('#edit' + bijlage.id()).hide();
//			dataServices.wijzigOmschrijvingBijlage(bijlage.id(), bijlage.omschrijvingOfBestandsNaam());
//		};
//		_this.startEditModus = function(bijlage){
//			console.log(ko.toJSON("startEditModus " + bijlage.id()));
//
//			bijlage.omschrijvingOfBestandsNaamBackup = bijlage.omschrijvingOfBestandsNaam();
//
//			$('#tekst' + bijlage.id()).hide();
//			$('#edit' + bijlage.id()).show();
//		};
//		_this.stopEditModusAnnuleren = function(bijlage){
//			bijlage.omschrijvingOfBestandsNaam(bijlage.omschrijvingOfBestandsNaamBackup);
//			bijlage.stopEditModus(bijlage);
//		}
//
//		_this.resetOmschrijving(_this);
    };
});