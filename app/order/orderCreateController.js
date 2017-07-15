define(['app'], function(app){

	var ctrl = ['$scope', '$rootScope', '$mdMedia', '$mdSidenav', '$state', 'messageService', 'userService', '$mdDialog', orderCreateController];

	function orderCreateController($scope, $rootScope, $mdMedia, $mdSidenav, $state, messageService, userService, $mdDialog){
		var vm = this;

		init();
		function init() {
			vm.showCartModal = showCartModal;
		}

		function showCartModal(ev, name) {
            var food = {
				name: name
			};

            $mdDialog.show({
                controller: ['$scope','$mdDialog', modalController],
                templateUrl: 'app/shared/cart-modal.html',
                targetEvent: ev,
                // parent: angular.element(document.querySelector('.content')),
                title: "Custom Field",
                // clickOutsideToClose: true,
                // fullscreen: true
            })
            .then(function(food) {
                
            });

            function modalController($scope, $mdDialog){
                $scope.food = food;

                $scope.close = function() { 
                    $mdDialog.cancel();
                }

                $scope.save = function(){
                    $mdDialog.hide($scope.food);
                }
            }
        };
		
	}

	return ctrl;
});	
