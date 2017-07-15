define(['app'], function(app){

	var ctrl = ['$scope', '$rootScope', '$mdMedia', '$mdSidenav', '$state', 'messageService', 'userService', '$mdDialog', paymentController];

	function paymentController($scope, $rootScope, $mdMedia, $mdSidenav, $state, messageService, userService, $mdDialog){
		var vm = this;

		init();
		function init() {
			vm.showSuccessModal = showSuccessModal;
		}

		function showSuccessModal(ev, name) {

            $mdDialog.show({
                controller: ['$scope','$mdDialog', modalController],
                templateUrl: 'app/shared/success-modal.html',
                targetEvent: ev,
                // parent: angular.element(document.querySelector('.content')),
                title: "Custom Field",
                // clickOutsideToClose: true,
                // fullscreen: true
            })
            .then(function(food) {
                
            });

            function modalController($scope, $mdDialog){

                $scope.close = function() { 
                    $mdDialog.cancel();
                }

                $scope.save = function(){
                    $mdDialog.hide($scope.food);
                    $state.go('home');
                }
            }
        };
		
	}

	return ctrl;
});	
