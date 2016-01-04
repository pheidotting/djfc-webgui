requirejs.config({
    paths: {
        commons: '../commons',
        jquery: '../commons/3rdparty/jquery-1.9.1',
    	sammy: '../commons/3rdparty/sammy-0.7.6',
    	moment: '../commons/3rdparty/moment',
    	js: '../js',
    	pages: '../pages',
    	model: '../js/model',
    	knockout: '../commons/3rdparty/knockout',
        knockoutValidation: '../commons/3rdparty/knockoutValidation/knockout.validation',
        blockUI: 'http://malsup.github.com/jquery.blockUI',
        jqueryUI: '../commons/3rdparty/jquery-ui-1.10.3',
        dataServices: '../js/commons/dataServices',
        navRegister: '../js/commons/navRegister',
        fileUpload: '../js/commons/fileUpload',
        opmerkingenLoader: '../js/commons/opmerkingenLoader',
        opmerkingenModel: '../js/commons/opmerkingenModel',
        adressenLoader: '../js/commons/adressenLoader',
        adressenModel: '../js/commons/adressenModel',
        telefoonnummersLoader: '../js/commons/telefoonnummersLoader',
        telefoonnummersModel: '../js/commons/telefoonnummersModel',
        redirect: '../js/commons/redirect'
    },
	shim: {
        "knockoutValidation": ["knockout"],
        'blockUI': ['jquery'],
        'jqueryUI': ['jquery']
    },
    config: {
        moment: {
            noGlobal: true
        }
    }
    });

requirejs(['jquery',
           'sammy',
           'commons/commonFunctions',
           'js/inloggen',
           'js/lijstRelaties',
           'js/lijstBedrijven',
           'js/beherenRelatie',
           'js/beherenBedrijf',
           'js/taak/taken',
           'js/taak/afhandelenTaak',
           'js/dashboard'],
function   ($, Sammy, commonFunctions, inloggen, lijstRelaties, lijstBedrijven, beherenRelatie, beherenBedrijf, taken, afhandelenTaak, dashboard) {
	commonFunctions.haalIngelogdeGebruiker();
	window.setInterval(commonFunctions.haalIngelogdeGebruiker, 300000);

	$('#uitloggen').click(function() {
		commonFunctions.uitloggen();
	});

	var app = new Sammy('body');

	app.route('GET', '#taken', function() {
		var a = new taken();
	});
	
	app.route('GET', '#dashboard', function() {
		var a = new dashboard();
	});
	
	app.route('GET', '#taak/:id', function() {
		var id = this.params['id'];
		var a = new afhandelenTaak(id);
	});

	app.route('GET', '#inloggen', function() {
		var a = new inloggen();
	});

	app.route('GET', '#lijstRelaties', function() {
		var a = new lijstRelaties();
	});

	app.route('GET', '#lijstRelaties/:zoekTerm', function() {
		zoekTerm = this.params['zoekTerm'];
		var a = new lijstRelaties(zoekTerm);
	});

	app.route('GET', '#lijstBedrijven', function() {
		var a = new lijstBedrijven();
	});

	app.route('GET', '#lijstBedrijven/:zoekTerm', function() {
		var zoekTerm = this.params['zoekTerm'];
		var a = new lijstBedrijven(zoekTerm);
	});

	app.route('GET', '#beherenBedrijf/:id/:actie/:subId', function() {
		var id = this.params['id'];
		var actie = this.params['actie'];
		var subId = this.params['subId'];
		var a = new beherenBedrijf(id, actie, subId);
	});

	app.route('GET', '#beherenBedrijf/:id/:actie', function() {
		var id = this.params['id'];
		var actie = this.params['actie'];
		var a = new beherenBedrijf(id, actie);
	});

	app.route('GET', '#beherenBedrijf/:id', function() {
		var id = this.params['id'];
		var a = new beherenBedrijf(id);
	});

	app.route('GET', '#beherenBedrijf', function() {
		var a = new beherenBedrijf(null);
	});

	app.route('GET', '#beherenRelatie/:id/:actie/:subId', function() {
		var id = this.params['id'];
		var actie = this.params['actie'];
		var subId = this.params['subId'];
		var a = new beherenRelatie(id, actie, subId);
	});

	app.route('GET', '#beherenRelatie/:id/:actie', function() {
		var id = this.params['id'];
		var actie = this.params['actie'];
		var a = new beherenRelatie(id, actie);
	});

	app.route('GET', '#beherenRelatie/:id', function() {
		var id = this.params['id'];
		var a = new beherenRelatie(id);
	});

	app.route('GET', '#beherenRelatie', function() {
		var a = new beherenRelatie(null);
	});

	app.route('GET', '', function() {
		var a = new lijstRelaties();
	});

	app.raise_errors = true;
	app.run();
});