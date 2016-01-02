define(['jquery',
        'model/jaarcijfers',
         'knockout',
         'commons/3rdparty/log',
         'commons/commonFunctions',
         'dataServices'],
	function ($, JaaCijfers, ko) {

	return function (data) {
		var _thisJaarCijferses = this;

		_thisJaarCijferses.cijfers = ko.observableArray();
		$.each(data, function(i, item){
			_thisJaarCijferses.cijfers.push(new JaaCijfers(item));
		});
    };
});