define(['app'], function(app){

	var ctrl = ['$scope', '$rootScope', '$mdMedia', '$mdSidenav', '$state', 'messageService', 'userService', '$mdDialog', '$http', paymentController];

	function paymentController($scope, $rootScope, $mdMedia, $mdSidenav, $state, messageService, userService, $mdDialog, $http){
		var vm = this;

		init();
		function init() {
			vm.showSuccessModal = showSuccessModal;
            vm.showConfirmModal = showConfirmModal;
		}

        function pay(ev){
            vm.loading = true;
            $http.get($rootScope.api + '/payment/pay/1').then(
                function(response){
                    showSuccessModal(ev);
                    vm.loading = false;
                },
                function(response){
                    messageService.show(response);
                    vm.loading = false;
                });
        }

        function showConfirmModal(ev, name) {
            var confirm = $mdDialog.confirm()
            .title('Confirmation')
            .textContent('Are you sure you want to proceed with your transaction?')
            .ariaLabel('Lucky day')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');

            $mdDialog.show(confirm).then(function() {
                pay(ev);
            }, function() {
                $scope.status = 'You decided to keep your debt.';
            });
        }

		function showSuccessModal(ev) {

            $mdDialog.show({
                controller: ['$scope','$mdDialog', modalController],
                templateUrl: 'app/shared/success-modal.html',
                targetEvent: ev,
                title: "Custom Field",
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
