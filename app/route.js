define([], function () {
    'use strict';

    function route($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        // $locationProvider.html5Mode(true);

        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('home', {
                url: "/",
                templateUrl: './app/home/index.html'
            })
            .state('order-create', {
                url: "/order/create",
                templateUrl: './app/order/create.html',
                controller: 'orderCreateController',
                controllerAs: 'vm'
            })
            .state('order-view', {
                url: "/order/view",
                templateUrl: './app/order/view.html',
                controller: 'orderViewController',
                controllerAs: 'vm'
            })
            .state('cart', {
                url: "/cart",
                templateUrl: './app/cart/index.html',
                // controller: 'cartController',
                // controllerAs: 'vm'
            })
             .state('payment', {
                url: "/payment",
                templateUrl: './app/payment/index.html',
                // controller: 'cartController',
                // controllerAs: 'vm'
            })

    }

    return ["$stateProvider", "$urlRouterProvider", "$locationProvider", route];
});