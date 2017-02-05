define(['jquery',
        'model/bijlage2',
        'commons/3rdparty/log2',
        'knockout'],
	function ($, Bijlage, log, ko) {
        return {
            mapBijlage: function(r) {
                mappen(r);
            },

            mapBijlages: function(data) {
                var bijlages = ko.observableArray([]);

                $.each(data, function(i, r){
                    bijlages.push(mappen(r));
                });

                return bijlages;
            }
        }

        function mappen(data){
            if(data != null) {
                var bijlage = new Bijlage();

                bijlage.id(data.id);
                bijlage.bestandsNaam(data.bestandsNaam);
                bijlage.omschrijving(data.omschrijving);
                bijlage.datumUpload(data.datumUpload);
                bijlage.soortEntiteit(data.soortEntiteit);
                bijlage.entiteitId(data.entiteitId);
                bijlage.omschrijvingOfBestandsNaam(data.omschrijvingOfBestandsNaam);

                return bijlage;
            }
        }
    }
);
