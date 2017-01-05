define(['jquery',
        'commons/3rdparty/log2',
        'service/toggle-service',
        'text!../../../templates/commons/taken.html'],
    function($, log, toggleService, html) {
        var logger = log.getLogger('taak-view');

        return {
            init: function(id) {
                $.when(toggleService.isFeatureBeschikbaar('TODOIST')).then(function(toggleBeschikbaar) {
                    if(toggleBeschikbaar) {
                        $('#taken').html(html);

                        logger.debug('content geladen, viewmodel init');
                    }
                });
            }
        }
    }
);
