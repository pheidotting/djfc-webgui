define(["commons/3rdparty/log",
        'commons/commonFunctions',
        'model/adres',
        'navRegister',
        'knockout',
        'dataServices',
        'moment'],
    function(log, commonFunctions, Adres, navRegister, ko, dataServices, moment) {

        return function KO(data, bedrijf){
            _adressen = this;

            _adressen.adressen = ko.observableArray();
            _adressen.nieuwAdres = ko.observable();
            _adressen.bedrijf = ko.observable(bedrijf);

            if(data != null){
                $.each(data, function(i, item) {
                    _adressen.adressen().push(new Adres(item));
                });
            }
            
            _adressen.verwijderAdres = function(){
                log.debug("Adres  verwijderen");
//                _adressen.remove(adres);
            }
            
            _adressen.voegAdresToe = function(){
                log.debug("nieuwe Adres");
                _adressen.adressen().push(new Adres(""));
                _adressen.adressen.valueHasMutated();
            }
        }
    }
);
