define(['jquery',
        'commons/3rdparty/log2',
        'text!/../../templates/inloggen/inloggen.html',
        'viewmodel/inloggen-viewmodel',
        'knockout'],
    function($, log, html, viewmodel, ko) {
        var logger = log.getLogger('inloggen-view');

        return {
            init: function() {
				$('#content').html(html);

                logger.debug('content geladen, viewmodel init');

                var v = new viewmodel();
//                $.when(v.init()).then(function(){
                    ko.applyBindings(v);
//                });
            }
        }
    }
);
