define(['app'], function(app){

	var ctrl = ['$scope', '$rootScope', '$mdMedia', '$mdSidenav', '$state', 'messageService', 'userService', headerController];

	function headerController($scope, $rootScope, $mdMedia, $mdSidenav, $state, messageService, userService){
		var vm = this;

		init();
		function init() {
			vm.canOpen = false;
			vm.toggleSidenav = toggleSidenav;
			vm.openMenu = openMenu;
			vm.message = message;
			vm.logout = logout;
			$scope.auth = userService;

		}

		function message(){
			messageService.show("Message sent successfully.");
		}

		function openMenu($mdMenu, ev) {
	      // originatorEv = ev;
	      $mdMenu.open(ev);
	    };

	    function logout() {
	    	userService.logout();
			$state.go('login');
	    }

		function toggleSidenav(component){
			$mdSidenav(component).toggle();
		}
	}

	return ctrl;
});	
