define([], function(){
	'use strict';

	var config = ["$stateProvider", "$urlRouterProvider", route];

    function route($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: "/login",
                templateUrl: "app/login/index.html",
                controller: "loginController",
                controllerAs: "vm"
            })
    }
    
    return config;
});