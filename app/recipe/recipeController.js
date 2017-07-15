define(['app'], function(app){

	var ctrl = ['$scope', '$rootScope', '$mdMedia', '$mdSidenav', '$state', 'messageService', 'userService', '$mdDialog','$http', '$localStorage', recipeController];

	function recipeController($scope, $rootScope, $mdMedia, $mdSidenav, $state, messageService, userService, $mdDialog, $http, $localStorage){
		var vm = this;

		init();
		function init() {
            vm.loading = true;
            vm.items = [];

            $http.get($rootScope.api + '/menus/list').then(
                function(response){
                    vm.loading = false;
                    vm.items = response.data;
                    console.log(response);
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
