define(['jquery',
        'model/gesprek',
        'commons/3rdparty/log2',
        'knockout',
        'moment'],
	function ($, Gesprek, log, ko, moment) {
        var logger = log.getLogger('taak-mapper');

        return {
            mapGesprek: function(r) {
                mappen(r);
            },

            mapGesprekken: function(data) {
                var gesprekken = ko.observableArray([]);

                $.each(data, function(i, r){
                    gesprekken.push(mappen(r));
                });

                return gesprekken;
            }
        }

        function mappen(data){
            if(data != null) {
                var gesprek = new Gesprek();

                gesprek.bestandsnaam(data);

                var parts = data.split('-');
                if(parts[0] == 'out') {
                    gesprek.uitgaand(true);
                    gesprek.inkomend(false);
                    gesprek.telefoonnummer(parts[1]);

                } else {
                    gesprek.uitgaand(false);
                    gesprek.inkomend(true);
                    gesprek.telefoonnummer(parts[2]);

                }
                gesprek.tijdstip(moment(parts[3] + parts[4], 'YYYYMMDDHHmmSS'));

                return gesprek;
            }
        }
    }
);
