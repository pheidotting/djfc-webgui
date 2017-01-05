define(['jquery',
        'model/relatie2',
        'commons/3rdparty/log2',
        'knockout'],
	function ($, Relatie, log, ko) {
        var logger = log.getLogger('relatie-mapper');
        var _this = this;

        return {
            mapRelatie: function(data) {
                return mappen(data);
            },

            mapRelaties: function(data) {
                var relaties = ko.observableArray([]);

                $.each(data, function(i, r){
                    relaties.push(mappen(r));
                });

                return relaties;
            }
        }

        function mappen(data){
            if(data != null) {
                var relatie = new Relatie();

                relatie.identificatie(data.identificatie);
                relatie.id(data.id);
                relatie.voornaam(data.voornaam);
                relatie.roepnaam(data.roepnaam);
                relatie.tussenvoegsel(data.tussenvoegsel);
                relatie.achternaam(data.achternaam);
                relatie.bsn(data.bsn);
                relatie.geboorteDatum(data.geboorteDatum);
                relatie.overlijdensdatum(data.overlijdensdatum);
                relatie.geslacht(data.geslacht);
                relatie.burgerlijkeStaat(data.burgerlijkeStaat);

                return relatie;
            }
        }
    }
);
