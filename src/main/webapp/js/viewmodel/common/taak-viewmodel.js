define(['commons/3rdparty/log2',
        'service/taak/taak-service',
        'service/toggle-service',
        'mapper/taak-mapper',
        'model/taak/taak2',
        'knockout',
        'moment',
        'commonFunctions'],
    function(log, taakService, toggleService, taakMapper, Taak, ko, moment, commonFunctions) {

    return function(readOnly, soortEntiteit, entiteitId) {
        var _this = this;
        var logger = log.getLogger('taak-viewmodel');

		this.id = ko.observable(entiteitId);
		this.soortEntiteit = ko.observable(soortEntiteit);

        this.taken = ko.observableArray();

        this.nieuweTaakTekst = ko.observable().extend({required: true});
        this.nieuweTaakReminder = ko.observable().extend({validation: {
            validator: function (val) {
                if(val) {
                    if(moment(val, "DD-MM-YYYY HH:mm").format("DD-MM-YYYY HH:mm") == "Invalid date"){
                        return false;
                    }else{
                        return true;
                    }
                } else {
                    return true;
                }
            },
            message: 'Juiste invoerformaat is : dd-mm-eejj uu:mm'
        }});

        $.when(toggleService.isFeatureBeschikbaar('TODOIST')).then(function(toggleBeschikbaar){
            if(toggleBeschikbaar) {
                $.when(taakService.alleTaken(_this.soortEntiteit(), _this.id())).then(function(opgehaaldeTaken){
                    _.each(taakMapper.mapTaken(opgehaaldeTaken)(), function(gemapteTaak) {
                        _this.taken.push(gemapteTaak);
                        _this.taken.valueHasMutated()
                    });
                });
            }
        });

        this.voegTaakToe = function() {
            logger.debug('Toevoegen taak');
            if(_this.nieuweTaakTekst.isValid() && _this.nieuweTaakReminder.isValid()) {
                $.when(taakService.voegTaakToe(_this.soortEntiteit(), _this.id(), _this.nieuweTaakTekst(), _this.nieuweTaakReminder())).then(function(itemId){
                    var taak = new Taak();
                    taak.omschrijving(_this.nieuweTaakTekst());
                    taak.projectId(itemId);
                    taak.reminder(_this.nieuweTaakReminder());
                    _this.taken.push(taak);
                    _this.nieuweTaakTekst('');
                    _this.nieuweTaakReminder('');
                });
            }
        };

        this.hideOrDisplay = function() {
            if ($('#zelfToevoegen').is(':visible')) {
                $('#zelfToevoegen').hide();
            } else {
                $('#zelfToevoegen').show();
            }
        };

        exitNieuweTaakReminder = function() {
		    _this.nieuweTaakReminder(zetDatumTijdOm(_this.nieuweTaakReminder()));
        };

        zetDatumTijdOm = function(d) {
            return commonFunctions.zetDatumTijdOm(d);
        };

	};
});