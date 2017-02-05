define(['knockout'],
    function(ko) {

	return function() {
	    var _this = this;

	    _this.id = ko.observable();
        _this.rekeningnummer = ko.observable(),
        _this.bic = ko.observable()
		_this.soortEntiteit = ko.observable();
		_this.entiteitId = ko.observable();
	};
});