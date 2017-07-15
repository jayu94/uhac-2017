require.config({
	paths: {
		domReady: 'lib/require/domReady',
		angular: 'lib/angular/angular.min',
		angularRoute: 'lib/angular-ui-router/release/angular-ui-router.min',
		angularAria: 'lib/angular-aria/angular-aria.min',
		angularAnimate: 'lib/angular-animate/angular-animate.min',
		material: 'lib/angular-material/angular-material.min',
		materialDatatable: 'lib/angular-material-data-table/dist/md-data-table.min',
		messages: 'lib/angular-messages/angular-messages',
		loadingBar: 'lib/angular-loading-bar/src/loading-bar',
		storage: 'lib/ngstorage/ngStorage.min',
		app: 'app',
		directives: 'app/shared/directives',
	},
	shim: {
		'angular' : {'exports' : 'angular'},
		'angularRoute': ['angular'],
		'angularAria': ['angular'],
		'angularAnimate': ['angular'],
		'material': ['angular'],
		'materialDatatable': ['angular'],
		'messages': ['angular', 'material'],
		'loadingBar': ['angular'],
		'storage': ['angular']
	},

	priority: [
		"angular",
		"material"
	]
});


define(['angular', 'app', 'directives'], function(angular, app){
	require(['domReady'], function (domReady) {
		domReady(function () {
			//This function is called once the DOM is ready.
			//It will be safe to query the DOM and manipulate
			//DOM nodes in this function.
			angular.bootstrap(document, ['app']);
		});
	});
});
