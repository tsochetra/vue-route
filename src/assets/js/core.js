var socket = io.connect("http://localhost:3000/");

var app = angular.module("app", ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider
	.when("/", {
		templateUrl: "/html/login.html",
		controller: "Login"
	})
	.when("/:auth", {
		templateUrl: "/html/dashboard.html",
		controller: "Dashboard"
	})
	.otherwise({
		redirectTo: '/'
	});
}]);

app.controller("Login", ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
	

	socket.on("authentication", (data) => {
		$rootScope.$apply(function() {
			$location.path("/"+data);
		});
	})
}]);

app.controller("Dashboard", ['$scope', '$location', '$routeParams','$rootScope', function($scope, $location, $routeParams, $rootScope) {
	var auth = $routeParams.auth;
	
	socket.emit("auth_param", auth, function(result) {
		result = JSON.parse(result);
		if(result.status == "OK" && result.error == false) {
			
		} else {
			$rootScope.$apply(function() {
				$location.path("/");
			});
		}
	});
	socket.on("get", function(data) {
		$scope.data = JSON.parse('[{"on": false}, {"on": true}, {"on": true}, {"on": true}, {"on": true}, {"on": true}, {"on": true}, {"on": true}]');
		$scope.$apply();
		ripple();
	})
	socket.on("logout", function() {
		$rootScope.$apply(function() {
			$location.path("/");
		});
	})
	$scope.switch = function(data, bool) {
		if(bool) {
			socket.emit("off", data);
			$scope.data[data - 1].on = false;
		} else {
			socket.emit("on", data);
			$scope.data[data - 1].on = true;
		}
	}
	
}]);