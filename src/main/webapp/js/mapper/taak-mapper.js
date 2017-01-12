define(['jquery',
        'model/taak/taak2',
        'commons/3rdparty/log2',
        'knockout',
        'moment'],
	function ($, Taak, log, ko, moment) {
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

                $.each(data.notities, function(i, note){
                    var notitie = {};
                    notitie.id = ko.observable(note.id);
                    notitie.omschrijving = ko.observable(note.omschrijving);
                    notitie.user = ko.observable(note.user);
                    notitie.tijdstip = moment(note.tijdstip).format('DD-MM-YYYY HH:mm');

                    taak.notities.push(notitie);
                });

                return taak;
            }
        }
    }
);
