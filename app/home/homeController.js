(function() {
    'use strict';

    angular
        .module('app')
        .controller('homeController', homeController);

    var ctrl = ['$http', '$localStorage', homeController]

    function homeController($localStorage) {
        var vm = this;
        
        vm.init = function(){


        }();
    }
})();