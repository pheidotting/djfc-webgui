define([ "commons/3rdparty/log",
         'dataServices',
         'redirect'],
	function(log, dataServices, redirect) {

	return {
		zetDatumOm: function(datumZonderStreepjes){
			var datumMetStreepjes = datumZonderStreepjes;
			if(datumZonderStreepjes != undefined && datumZonderStreepjes.length == 8 && this.isNumeric(datumZonderStreepjes)){
				datumMetStreepjes = datumZonderStreepjes.substring(0, 2) + "-" + datumZonderStreepjes.substring(2, 4) + "-" + datumZonderStreepjes.substring(4, 8);
			}
			
			return datumMetStreepjes;
		},

		zetDatumTijdOm: function(datumZonderStreepjes){
			var datumMetStreepjes = datumZonderStreepjes;
			if(datumZonderStreepjes != undefined && datumZonderStreepjes.length == 12 && this.isNumeric(datumZonderStreepjes)){
				datumMetStreepjes = datumZonderStreepjes.substring(0, 2) + "-" + datumZonderStreepjes.substring(2, 4) + "-" + datumZonderStreepjes.substring(4, 8) + " " + datumZonderStreepjes.substring(8, 10) + ":" + datumZonderStreepjes.substring(10, 12);
			}
			
			return datumMetStreepjes;
		},
		
		isNumeric: function(num) {
		     return (num >=0 || num < 0);
		},

 		plaatsFoutmelding: function(melding){
        	var foutmelding = jQuery.parseJSON(melding.responseText);

			$('#alertDanger').show();
			$('#alertDanger').html("Er is een fout opgetreden : " + foutmelding.foutmelding);
 		},

 		plaatsFoutmeldingString: function(melding){
			$('#alertDanger').show();
			$('#alertDanger').html("Er is een fout opgetreden : " + melding);
 		},

 		plaatsMelding: function(melding){
 			$("html, body").animate({ scrollTop: 0 }, "slow");
			$('#alertSucces').show();
			$('#alertSucces').html(melding);
			refreshIntervalId = setInterval(this.verbergMeldingen, 10000);
		},

		nietMeerIngelogd: function(data){
        	log.error("FOUT opgehaald : " + JSON.stringify(data));
        	log.error("naar inlogscherm");
			redirect.redirect('INLOGGEN');
			this.plaatsFoutmelding("Sessie verlopen, graag opnieuw inloggen");
		},

 		verbergMeldingen: function(){
			if(refreshIntervalId != undefined || refreshIntervalId != 0){
                clearInterval(this.refreshIntervalId);
                $("html, body").animate({ scrollTop: 0 }, "slow");
                $('#alertSucces').hide();
                $('#alertDanger').hide();
            }
 		},

		uitloggen: function(){
			dataServices.uitloggen();
			$('#ingelogdeGebruiker').html("");
			$('#uitloggen').hide();
			$('#homeKnop').hide();
			redirect.redirect('INLOGGEN');
		},

		haalIngelogdeGebruiker: function(){
			log.debug("Haal ingelogde gebruiker");

			dataServices.haalIngelogdeGebruiker().done(function(response){
				if(response.kantoor != null){
					log.debug("Ingelogde gebruiker : " + response.gebruikersnaam + ", (" + response.kantoor + ")");
					$('#ingelogdeGebruiker').html("Ingelogd als : " + response.gebruikersnaam + ", (" + response.kantoor + ")");
				}else{
					log.debug("Ingelogde gebruiker : " + response.gebruikersnaam);
					$('#ingelogdeGebruiker').html("Ingelogd als : " + response.gebruikersnaam);
				}
				$('#uitloggen').show();
				$('#homeKnop').show();
			}).fail(function(){
				log.debug("Niet ingelogd, naar de inlogpagina");
				$('#ingelogdeGebruiker').html("");
				$('#uitloggen').hide();
				$('#homeKnop').hide();
				redirect.redirect('INLOGGEN');
			});
		},

		uploadBestand: function(formData, url){
			var deferred = $.Deferred();

			$.ajax({
				url: url,
				type: 'POST',
				xhr: function() {  // Custom XMLHttpRequest
					var myXhr = $.ajaxSettings.xhr();
					if(myXhr.upload){ // Check if upload property exists
						myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // For handling the progress of the upload
					}
					return myXhr;
				},
				data: formData,
				cache: false,
				contentType: false,
				processData: false,
				success: function (response) {
					$('uploadprogress').hide();
					return deferred.resolve(response);
				},
				error: function (data) {
					$('#alertDanger').show();
					$('#alertDanger').html("Er is een fout opgetreden : " + data);
				}
			});
			function progressHandlingFunction(e){
				if(e.lengthComputable){
					$('uploadprogress').attr({value:e.loaded,max:e.total});
				}
			}
			return deferred.promise();
		}

    };
});