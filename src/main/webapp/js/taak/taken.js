define(['jquery',
        'knockout',
        'js/model/taak/taken',
         'knockout',
         'dataServices'],
    function($, ko, Taken, ko, dataServices) {

	return function(){
		$('#content').load('templates/taken/taken.html', function(){
			dataServices.lijstTaken().done(function(data){
				ko.applyBindings(new Taken(data));
			});
		});
	};

});