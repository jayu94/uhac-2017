(function() {
    'use strict';

    angular
        .module('app')
        .controller('homeController', ControllerController);

    ControllerController.$inject = ['dependency1'];
    function ControllerController(dependency1) {
        var vm = this;
        

        activate();

        ////////////////

        function activate() { }
    }
})();