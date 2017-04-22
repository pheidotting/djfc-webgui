define(['redirect'],
    function(redirect) {

    return function(identificatie) {
        var _this = this;

        this.identificatie = identificatie;

        this.naarRelatiegegevens = function() {
            redirect.redirect('BEHEREN_RELATIE', _this.identificatie);
        };

        this.naarPolissen = function() {
            redirect.redirect('LIJST_POLISSEN', _this.identificatie);
        };

	};
});