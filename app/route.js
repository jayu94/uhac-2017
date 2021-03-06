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
                url: "/order/view/:id",
                templateUrl: './app/order/view.html',
                controller: 'orderViewController',
                controllerAs: 'vm'
            })
            .state('cart', {
                url: "/cart",
                templateUrl: './app/cart/index.html',
                controller: 'cartController',
                controllerAs: 'vm'
            })
             .state('payment', {
                url: "/payment",
                templateUrl: './app/payment/index.html',
                controller: 'paymentController',
                controllerAs: 'vm'
            })
             .state('order-history', {
                url: "/order/history",
                templateUrl: './app/order/history.html',
                // controller: 'paymentController',
                // controllerAs: 'vm'
            })
             .state('recipe', {
                url: "/recipe",
                templateUrl: './app/recipe/index.html',
                controller: 'recipeController',
                controllerAs: 'vm'
            })
            .state('recipe-view', {
                url: "/recipe/view/:id",
                templateUrl: './app/recipe/view.html',
                controller: 'recipeViewController',
                controllerAs: 'vm'
            })
    }

    return ["$stateProvider", "$urlRouterProvider", "$locationProvider", route];
});