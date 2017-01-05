define(['jquery',
        'model/taak/taak2',
        'commons/3rdparty/log2',
        'knockout'],
	function ($, Taak, log, ko) {
        var logger = log.getLogger('taak-mapper');

        return {
            mapTaak: function(r) {
                mappen(r);
            },

            mapTaken: function(data) {
                var taken = ko.observableArray([]);

                $.each(data, function(i, r){
                    taken.push(mappen(r));
                });

                return taken;
            }
        }

        function mappen(data){
            if(data != null) {
                var taak = new Taak();

                taak.id(data.id);
                taak.projectId(data.projectId);
                taak.omschrijving(data.omschrijving);

                var reminder = _.first(data.reminders);
                if(reminder) {
                    taak.reminder(_.first(data.reminders).due_date.format('DD-MM-YYYY HH:mm'));
                }

                return taak;
            }
        }
    }
);
