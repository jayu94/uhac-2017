define(['app'], function(app){

	var ctrl = ['$scope', '$rootScope', '$mdMedia', '$mdSidenav', '$state', 'messageService', 'userService', '$localStorage', cartController];

	function cartController($scope, $rootScope, $mdMedia, $mdSidenav, $state, messageService, userService, $localStorage){
		var vm = this;

		init();
		function init() {
			vm.items = $localStorage.cart || [];

			vm.total = 0;
			for(var i = 0; i < vm.items.length; i++){
				vm.total += (vm.items[i].price * vm.items[i].quantity);
			}
		}
	}

	return ctrl;
});	
