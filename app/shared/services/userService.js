define([], function() {
    "use strict";

    require(['app'], function(app){
        var config = ['$http', '$rootScope', '$localStorage', '$state', userService];

        function userService($http, $rootScope, $localStorage, $state) {
            var user = {};

            var service = {
                login: login,
                logout: logout,
                authenticated: authenticated
            };

            function login(email, password){
                var user = { email: email, password: password };

                return $http.post($rootScope.api + "/user/login", user)
                    .then(
                        function(response){
                            $localStorage.access_token = response.data.token;
                            $localStorage.user = user;
                        }
                    );
            }

            function logout (){
                $localStorage.access_token = null;
                $localStorage.user = null;
            }

            function authenticated (){
                // DEMO PURPOSES ONLY:  
                // return !$state.includes('login');
                // COMMENT THIS OUT WHEN AUTH IS CONFIGURED
                // return $localStorage.access_token !== null && $localStorage.access_token !== undefined;

                return $localStorage.user !== null && $localStorage.user !== undefined;
            }
            
            return service;
        }

        app.factory('userService', config);
    });
});