define(['jquery',
        'commons/3rdparty/log2',
        'text!../../../templates/beherenRelatieschade.html',
        'viewmodel/beheren-schade-viewmodel',
        'knockout',
        'view/common/opmerking-view',
        'view/common/bijlage-view'],
    function($, log, html, viewmodel, ko, opmerkingView, bijlageView) {
        var logger = log.getLogger('beheren-schade-view');

        return {
            init: function(schadeId, basisId, readOnly, basisEntiteit) {
				$('#details').html(html);

                opmerkingView.init(schadeId);
                bijlageView.init(schadeId);

                logger.debug('content geladen, viewmodel init');

                var v = new viewmodel();
                $.when(v.init(schadeId, basisId, readOnly, basisEntiteit)).then(function(){
                    ko.applyBindings(v);
                });
            }
        }
    }
);
