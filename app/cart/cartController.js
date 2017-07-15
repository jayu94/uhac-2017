define(['app'], function(app){

	var ctrl = ['$scope', '$rootScope', '$mdMedia', '$mdSidenav', '$state', 'messageService', 'userService', '$localStorage', '$http', cartController];

	function cartController($scope, $rootScope, $mdMedia, $mdSidenav, $state, messageService, userService, $localStorage, $http){
		var vm = this;

		init();
		function init() {
			vm.total = 0;
			vm.items = [];
			vm.loading = true;

			$http.get($rootScope.api + '/cart/get/1').then(
                function(response){
                    vm.loading = false;
                    vm.items = response.data;
                    console.log(response);

					for(var i = 0; i < vm.items.length; i++){
						vm.total += vm.items[i].totalprice;
					}
                },
                function(response)
                {
                    messageService.show(response);
                    vm.loading = false;
                });
		}
	}

	return ctrl;
});	
