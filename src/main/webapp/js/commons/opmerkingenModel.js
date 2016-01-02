define(["commons/3rdparty/log",
        'commons/commonFunctions',
        'model/opmerking',
        'navRegister',
        'knockout',
        'dataServices',
        'moment'],
    function(log, commonFunctions, Opmerking, navRegister, ko, dataServices, moment) {

        return function(data, schade, hypotheek, polis, relatie, bedrijf, aangifte, jaarcijfers, risicoAnalyse){
            log.debug(schade + " - " + hypotheek + " - " + polis + " - " + relatie + " - " + bedrijf + " - " + aangifte + " - " + jaarcijfers + " - " + risicoAnalyse);

            var _k = this;

            _k.opmerkingen = ko.observableArray();
            _k.nieuweOpmerking = ko.observable();
            _k.schade = ko.observable(schade);
            _k.hypotheek = ko.observable(hypotheek);
            _k.polis = ko.observable(polis);
            _k.relatie = ko.observable(relatie);
            _k.bedrijf = ko.observable(bedrijf);
            _k.aangifte = ko.observable(aangifte);
            _k.jaarcijfers = ko.observable(jaarcijfers);
            _k.risicoAnalyse = ko.observable(risicoAnalyse);

            if(data != null){
                $.each(data, function(i, item) {
                    _k.opmerkingen().push(new Opmerking(item));
                });
            }

            _k.opmerkingOpslaan = function(opm){
                log.debug(opm.opmerkingenModel.nieuweOpmerking());
                if(opm.opmerkingenModel.nieuweOpmerking() !== ''){
                    dataServices.haalIngelogdeGebruiker().done(function(response){
                        var opmerking = new Opmerking('');
                        opmerking.medewerker(response.gebruikersnaam);
                        opmerking.medewerkerId(response.id);
                        opmerking.tijd(new moment().format("DD-MM-YYYY HH:mm"));
                        opmerking.opmerking(opm.opmerkingenModel.nieuweOpmerking());

                        opmerking.schade(opm.opmerkingenModel.schade());
                        opmerking.hypotheek(opm.opmerkingenModel.hypotheek());
                        opmerking.polis(opm.opmerkingenModel.polis());
                        opmerking.relatie(opm.opmerkingenModel.relatie());
                        opmerking.bedrijf(opm.opmerkingenModel.bedrijf());
                        opmerking.aangifte(opm.opmerkingenModel.aangifte());
                        opmerking.jaarcijfers(opm.opmerkingenModel.jaarcijfers);
                        opmerking.risicoAnalyse(opm.opmerkingenModel.risicoAnalyse);

                        log.debug(ko.toJSON(opmerking));
                        dataServices.opslaanOpmerking(ko.toJSON(opmerking)).done(function(id){
                            opmerking.id(id);
                            opm.opmerkingenModel.opmerkingen().push(opmerking);
                            opm.opmerkingenModel.opmerkingen.valueHasMutated();
                            opm.opmerkingenModel.nieuweOpmerking('');
                        });
                    });
                }
            }

            _k.verwijder = function(opmerking){
                var r = confirm("Weet je zeker dat je deze opmerking wilt verwijderen?");
                if (r === true) {
                    log.debug("verwijder opmerking met id " + opmerking.id());
                    dataServices.verwijderOpmerking(opmerking.id()).done(function(){
                        _k.opmerkingen.remove(opmerking);
                        _k.opmerkingen.valueHasMutated();
                    });
                }
            };

        }
    }
);
