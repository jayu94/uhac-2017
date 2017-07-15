define([], function(){
	'use strict';

	require(['app'], function(app){

		app.factory('interceptor', ['$q', '$rootScope', '$localStorage', interceptor]);
		app.config(['$mdIconProvider', '$mdThemingProvider', '$httpProvider', 'cfpLoadingBarProvider', config]);

		function interceptor ($q, $rootScope, $localStorage) {
			var service = {
				request: function (config) {
					if($localStorage.access_token)
						config.headers.Authorization = 'Bearer ' + $localStorage.access_token;
					return config;
				},
				responseError: function (response) {
					console.log(response);
					if (response && response.error == "token_not_provided" || (response.status && response.status == 401)) {
						delete $localStorage.user;
						delete $localStorage.access_token;
						$rootScope.$broadcast('unauthorized');
					}
					return $q.reject(response);
				}
			};
        	return service;
		}

		function config ($mdIconProvider, $mdThemingProvider, $httpProvider, cfpLoadingBarProvider){
			//$mdThemingProvider.theme('default')
			//.primaryPalette('pink')
			//.accentPalette('red');

			cfpLoadingBarProvider.includeSpinner = false;
			$httpProvider.interceptors.push('interceptor');
		}
	});
});