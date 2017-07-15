define([], function(){
	'use strict';
	
	var ctrl = ['$scope', '$rootScope', '$mdMedia', '$mdSidenav', '$state', '$timeout', 'userService', sidebarController];

	function sidebarController($scope, $rootScope, $mdMedia, $mdSidenav, $state, $timeout, userService){
		var vm = this;

		init();
		function init() {
			vm.menu = [];
			vm.canOpen = false;
			vm.toggleItem = toggleItem;
			vm.checkCurrentState = checkCurrentState;
			vm.logout = logout;
			$scope.auth = userService;

			$scope.state = $state;

			$timeout(function(){
				$mdSidenav('left').onClose(function () {
					checkCurrentState();
				});
			}, 0)

			vm.menu = [
				{
					name: "Home",
					icon: "home",
					role: "admin",
					link: "home"
				},
				{
					name: "Cart",
					icon: "shopping_cart",
					role: "admin",
					link: "cart"
				},
				// {
				// 	name: "Stuff",
				// 	icon: "assignment",
				// 	type: "toggle",
				// 	items: [
				// 		{
				// 			name: "Item1",
				// 			link: "",
				// 		}
				// 	]
				// },
				// {
				// 	name: "Stuff 2",
				// 	icon: "assignment",
				// 	type: "toggle",
				// 	items: [
				// 		{
				// 			name: "Item1",
				// 			link: "",
				// 		}
				// 	]
				// },
			]
		}

		function checkState(state){
			vm.canOpen = state.name !== 'login';
		}

		function checkCurrentState(){
			for (var i = 0; i < vm.menu.length; i++) {
				var item = vm.menu[i];
				var isOpen = false;
				if(item.type == 'toggle' && item.items) {
					for (var j = 0; j < item.items.length; j++) {
						var subItem = item.items[j];
						if($state.includes(subItem.link)) {
							vm.menu[i].open = true;
							isOpen = true;
							break;
						}
					}
				}
				if(isOpen)
					break;
			}
		}

		function toggleItem(index){
			var value = Boolean(vm.menu[index].open);
			for (var i = 0; i < vm.menu.length; i++) {
				vm.menu[i].open = false;
			}
			vm.menu[index].open = !value;
		}

		function logout(){
			userService.logout();
			$mdSidenav('left').close();
			$state.go('login');
		}
	}

	return ctrl;
});
