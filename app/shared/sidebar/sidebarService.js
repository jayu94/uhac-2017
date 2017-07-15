(function(){
	
	angular
	.module('app')
	.factory('sidebarService', ['$http', '$rootScope', sidebarService])

	function sidebarService($http, $rootScope) {

		var service = {
			get: get
		};

		function get(){
			return $http.get($rootScope.api + "/menu");
		}
		
		return service;
	}
})();