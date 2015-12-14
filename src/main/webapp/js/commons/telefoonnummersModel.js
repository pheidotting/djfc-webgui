define(["commons/3rdparty/log",
        'commons/commonFunctions',
        'model/telefoonNummer',
        'navRegister',
        'knockout',
        'dataServices',
        'moment'],
    function(log, commonFunctions, TelefoonNummer, navRegister, ko, dataServices, moment) {

        return function KO(data, bedrijf){
            _telefoonnummers = this;

            _telefoonnummers.telefoonnummers = ko.observableArray();
//            _telefoonnummers.nieuwAdres = ko.observable();
            _telefoonnummers.bedrijf = ko.observable(bedrijf);

            if(data != null){
                $.each(data, function(i, item) {
                    _telefoonnummers.telefoonnummers().push(new TelefoonNummer(item));
                });
            }
            
//            _telefoonnummers.verwijderAdres = function(){
//                log.debug("Adres  verwijderen");
////                _telefoonnummers.remove(adres);
//            }
//
            _telefoonnummers.voegTelefoonNummerToe = function(){
                log.debug("nieuw Telefoonnummer");
                _telefoonnummers.telefoonnummers().push(new TelefoonNummer(""));
                _telefoonnummers.telefoonnummers.valueHasMutated();
            }
        }
    }
);
