requirejs.config({
    baseUrl: '',
    paths: {
        commons: 'commons',
        jquery: 'node_modules/jquery/dist/jquery.min',
        sammy: 'commons/3rdparty/sammy',
        moment: 'commons/3rdparty/moment',
    	js: 'js',
    	pages: 'pages',
    	model: 'js/model',
    	knockout: 'commons/3rdparty/knockout',
        knockoutValidation: 'commons/3rdparty/knockoutValidation/knockout.validation',
        blockUI: 'commons/3rdparty/blockui',
        jqueryUI: 'commons/3rdparty/jquery-ui-1.10.3',
        text: 'commons/3rdparty/text',
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
        underscore: 'js/commons/thirdparty/underscore'
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