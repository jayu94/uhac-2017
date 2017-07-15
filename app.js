
define([
	'angular',
	'angularRoute',
	'angularAria',
	'angularAnimate',
	'material',
	'messages',
	'materialDatatable',
	'loadingBar',
	'storage',
	'app/config',
	'app/route',

	// shared
	'app/shared/header/headerController',
	'app/shared/sidebar/sidebarController',
	'app/shared/services/messageService',
	'app/shared/services/userService',

	'app/login/app',

	// controllers
	'app/order/orderViewController',
	'app/cart/cartController',
	'app/order/orderCreateController',
	'app/payment/paymentController',
	'app/recipe/recipeController',
	'app/recipe/recipeViewController',

], function(angular, angularRoute, aria, animate, material, messages, datatable, loadingBar, storage, config, route, headerCtrl, sidebarCtrl, messageService, userService, login, 
orderViewController,
cartController,
orderCreateController,
paymentController,
recipeController,
recipeViewController) {
	
	'use strict';
	
	// Declare app level module which depends on views, and components
	return angular.module('app', [
			'ngMaterial',
			'ngMessages',
			'ui.router',
			'md.data.table',
			'angular-loading-bar',
			'ngStorage',
			'app.login'
		])
		.config(route)
		.config(function($mdIconProvider, $mdThemingProvider){
            $mdIconProvider.defaultIconSet("./assets/svg/avatars.svg", 128);
		})
		.controller('headerController', headerCtrl)
		.controller('sidebarController', sidebarCtrl)

		.controller('orderViewController', orderViewController)
		.controller('cartController', cartController)
		.controller('orderCreateController', orderCreateController)
		.controller('paymentController', paymentController)
		.controller('recipeController', recipeController)
		.controller('recipeViewController', recipeViewController)

		.run(['$rootScope', '$state', 'userService', 'messageService', function run($rootScope, $state, userService, messageService) {

			$rootScope.api = "http://192.168.1.102/shoplifter/public";

			$rootScope.$on('unauthorized', function () {
				$state.go("login");
				messageService.show("You have been logged out");
			});

			$rootScope.logout = function(){
				$state.go('login');
			};

			$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams, options){
				if(!userService.authenticated() && toState.name != 'login'){
					event.preventDefault();
					$state.go('login');
				}
				else if(userService.authenticated() && toState.name == 'login'){
					event.preventDefault();
					$state.go('home');
				}
			});
		}]);
});

