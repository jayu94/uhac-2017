define(['app'], function(app){

	var ctrl = ['$scope', '$rootScope', '$mdMedia', '$mdSidenav', '$state', 'messageService', 'userService', '$mdDialog','$http', '$localStorage', orderCreateController];

	function orderCreateController($scope, $rootScope, $mdMedia, $mdSidenav, $state, messageService, userService, $mdDialog, $http, $localStorage){
		var vm = this;

		init();
		function init() {
			vm.showCartModal = showCartModal;
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

		function showCartModal(ev, food) {

            $mdDialog.show({
                controller: ['$scope','$mdDialog', modalController],
                templateUrl: 'app/shared/cart-modal.html',
                targetEvent: ev,
                title: "Custom Field",
            })
            .then(function(food) {
                
            });

            function modalController($scope, $mdDialog){
                $scope.food = food;

                $scope.close = function() { 
                    $mdDialog.cancel();
                }

                $scope.save = function(){
                    
                    if(!$localStorage.cart)
                        $localStorage.cart = [];

                    var index = find($localStorage.cart, food.id);
                    if(index > -1)
                        $localStorage.cart[index].quantity += $scope.food.quantity;
                    else
                        $localStorage.cart.push($scope.food);

                    $mdDialog.hide($scope.food);
                }
            }
        };

        function find(list, id){
            for(var i = 0; i < list.length; i++){
                if(list[i].id == id)
                    return list[i];
            }

            return {};
        }
		
	}

	return ctrl;
});	
