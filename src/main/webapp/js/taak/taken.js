define(['jquery',
        'knockout',
        'js/model/taak/taken',
         'knockout',
         'dataservices'],
    function($, ko, Taken, ko, dataservices) {

	return function(){
		$('#content').load('templates/taken/taken.html', function(){
			dataservices.lijstTaken().done(function(data){
				ko.applyBindings(new Taken(data));
			});
		});
	};

});