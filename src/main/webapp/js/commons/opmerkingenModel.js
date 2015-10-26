define(["commons/3rdparty/log",
        'commons/commonFunctions',
        'model/opmerking',
        'navRegister',
        'knockout',
        'dataServices',
        'moment'],
    function(log, commonFunctions, Opmerking, navRegister, ko, dataServices, moment) {

        return function KO(data, schade, hypotheek, polis, relatie, bedrijf, aangifte){
            log.debug(schade + " - " + hypotheek + " - " + polis + " - " + relatie + " - " + bedrijf + " - " + aangifte);

            _k = this;

            _k.opmerkingen = ko.observableArray();
            _k.nieuweOpmerking = ko.observable();
            _k.schade = ko.observable(schade);
            _k.hypotheek = ko.observable(hypotheek);
            _k.polis = ko.observable(polis);
            _k.relatie = ko.observable(relatie);
            _k.bedrijf = ko.observable(bedrijf);
            _k.aangifte = ko.observable(aangifte);

            if(data != null){
                $.each(data, function(i, item) {
                    _k.opmerkingen().push(new Opmerking(item));
                });
            }

            _k.opmerkingOpslaan = function(){
                log.debug(_k.nieuweOpmerking());
                if(_k.nieuweOpmerking() != ''){
                    dataServices.haalIngelogdeGebruiker().done(function(response){
                        var opmerking = new Opmerking('');
                        opmerking.medewerker(response.gebruikersnaam);
                        opmerking.medewerkerId(response.id);
                        opmerking.tijd(new moment().format("DD-MM-YYYY HH:mm"));
                        opmerking.opmerking(_k.nieuweOpmerking());

                        opmerking.schade(_k.schade());
                        opmerking.hypotheek(_k.hypotheek());
                        opmerking.polis(_k.polis());
                        opmerking.relatie(_k.relatie());
                        opmerking.bedrijf(_k.bedrijf());
                        opmerking.aangifte(_k.aangifte());

                        log.debug(ko.toJSON(opmerking));
                        dataServices.opslaanOpmerking(ko.toJSON(opmerking)).done(function(id){
                            opmerking.id(id);
                            _k.opmerkingen().push(opmerking);
                            _k.opmerkingen.valueHasMutated();
                            _k.nieuweOpmerking('');
                        });
                    });
                }
            }
        }
    }
);
