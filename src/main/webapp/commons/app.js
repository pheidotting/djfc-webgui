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
		new taken();
	});
	
	app.route('GET', '#dashboard', function() {
		new dashboard();
	});
	
	app.route('GET', '#taak/:id', function() {
		id = this.params['id'];
		new afhandelenTaak(id);
	});

	app.route('GET', '#inloggen', function() {
		new inloggen();
	});

	app.route('GET', '#lijstRelaties', function() {
		new lijstRelaties();
	});

	app.route('GET', '#lijstRelaties/:zoekTerm', function() {
		zoekTerm = this.params['zoekTerm'];
		new lijstRelaties(zoekTerm);
	});

	app.route('GET', '#lijstBedrijven', function() {
		new lijstBedrijven();
	});

	app.route('GET', '#lijstBedrijven/:zoekTerm', function() {
		zoekTerm = this.params['zoekTerm'];
		new lijstBedrijven(zoekTerm);
	});

	app.route('GET', '#beherenBedrijf/:id/:actie/:subId', function() {
		id = this.params['id'];
		actie = this.params['actie'];
		subId = this.params['subId'];
		new beherenBedrijf(id, actie, subId);
	});

	app.route('GET', '#beherenBedrijf/:id/:actie', function() {
		id = this.params['id'];
		actie = this.params['actie'];
		new beherenBedrijf(id, actie);
	});

	app.route('GET', '#beherenBedrijf/:id', function() {
		id = this.params['id'];
		new beherenBedrijf(id);
	});

	app.route('GET', '#beherenBedrijf', function() {
		new beherenBedrijf(null);
	});

	app.route('GET', '#beherenRelatie/:id/:actie/:subId', function() {
		id = this.params['id'];
		actie = this.params['actie'];
		subId = this.params['subId'];
		new beherenRelatie(id, actie, subId);
	});

	app.route('GET', '#beherenRelatie/:id/:actie', function() {
		id = this.params['id'];
		actie = this.params['actie'];
		new beherenRelatie(id, actie);
	});

	app.route('GET', '#beherenRelatie/:id', function() {
		id = this.params['id'];
		new beherenRelatie(id);
	});

	app.route('GET', '#beherenRelatie', function() {
		new beherenRelatie(null);
	});

	app.route('GET', '', function() {
		new lijstRelaties();
	});

	app.raise_errors = true;
	app.run();
});