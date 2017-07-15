define(['angular', './route', './loginController'], function(angular, route, loginController){
	'use strict';
	angular
	.module('app.login', [])
	.config(route)
	.controller('loginController', loginController);
});