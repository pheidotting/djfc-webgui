requirejs.config({
    baseUrl: '',
    paths: {
        jquery: 'node_modules/jquery/dist/jquery.min',
        sammy: 'node_modules/sammy/lib/min/sammy-latest.min',
        moment: 'node_modules/moment/min/moment.min',
    	knockout: 'node_modules/knockout/build/output/knockout-latest',
        'knockout.validation': 'node_modules/knockout.validation/dist/knockout.validation.min',
        knockoutValidationLocal: 'node_modules/knockout.validation/localization/nl-NL',
        blockUI: 'node_modules/block-ui/jquery.blockUI',
        jqueryUI: 'node_modules/jquery-ui/jquery-ui',
        text: 'node_modules/requirejs-text/text',
        underscore: 'node_modules/underscore/underscore-min',
        lodash: 'node_modules/lodash/lodash.min'
        commons: 'commons',
    	js: 'js',
    	pages: 'pages',
    	model: 'js/model',
        dataServices: 'js/commons/dataServices',
        navRegister: 'js/commons/navRegister',
        fileUpload: 'js/commons/fileUpload',
        opmerkingenLoader: 'js/commons/opmerkingenLoader',
        opmerkingenModel: 'js/commons/opmerkingenModel',
        adressenLoader: 'js/commons/adressenLoader',
        adressenModel: 'js/commons/adressenModel',
        telefoonnummersLoader: 'js/commons/telefoonnummersLoader',
        telefoonnummersModel: 'js/commons/telefoonnummersModel',
        redirect: 'js/commons/redirect',
        service: 'js/service',
        repository: 'js/repository',
        view: 'js/view',
        viewmodel: 'js/viewmodel',
        mapper: 'js/mapper',
    },
	shim: {
        'knockout.validation': ['knockout'],
        'blockUI': ['jquery'],
        'jqueryUI': ['jquery']
    },
    config: {
        moment: {
            noGlobal: true
        }
    }
});


// require(['jquery', 'foundation'], function($, foundation) {

//   // Foundation JavaScript
//   // Documentation can be found at: http://foundation.zurb.com/docs
//     $(document).load(function() {
//         new foundation();
//         // foundation.Dropdown(this);
//     //   $(this).foundation({
//     // Dropdown: {
//     //       animation: 'slide',
//     //       timer_speed: 1000,
//     //       pause_on_hover: true,
//     //       animation_speed: 500,
//     //       navigation_arrows: true,
//     //       bullets: false
//     // }
//     // });
//     });
// });   