define(['jquery',
        'commons/3rdparty/log2',
        'text!../../../templates/beherenRelatiehypotheek.html',
        'viewmodel/beheren-hypotheek-viewmodel',
        'knockout',
        'view/common/opmerking-view',
        'view/common/bijlage-view'],
    function($, log, html, viewmodel, ko, opmerkingView, bijlageView) {
        var logger = log.getLogger('beheren-hypotheek-view');

        return {
            init: function(hypotheekId, basisId, readOnly, basisEntiteit) {
				$('#details').html(html);

                opmerkingView.init(hypotheekId);
                bijlageView.init(hypotheekId);

                logger.debug('content geladen, viewmodel init');

                var v = new viewmodel();
                $.when(v.init(hypotheekId, basisId, readOnly, basisEntiteit)).then(function(){
                    ko.applyBindings(v);
                });
            }
        }
    }
);
