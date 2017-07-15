define(['app'], function(app){

	var ctrl = ['$scope', '$rootScope', '$mdMedia', '$mdSidenav', '$state', '$stateParams', 'messageService', 'userService', '$http', recipeViewController];

	function recipeViewController($scope, $rootScope, $mdMedia, $mdSidenav, $state, $stateParams, messageService, userService, $http){
		var vm = this;

		init();
		function init() {
			vm.id = $stateParams.id;
			$http.get($rootScope.api + '/menus/get/' + vm.id).then(
                function(response){
                    vm.loading = false;
                    vm.item = response.data;
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
