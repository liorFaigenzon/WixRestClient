app = angular.module('wixRestClientApp');

app.controller('GridController', ['$scope', '$http',
    function ($scope, $http) {
	
		$scope.url = 'http://localhost:54603/api/grids';
		
		$scope.GetGridByUserNameAndPassword = function (userName, password){
		
			$scope.code = null;
			$scope.response = null;
			$scope.dataFromServer = null;
			
			$scope.Grid = null;
			
			var httpMethod = 'GET';
			var urlWithParameters = $scope.url + '/' + userName + '/' + password;
			
			$http(
			{
				method: httpMethod,
				url: urlWithParameters
			}).
			then(function (response){
				$scope.status = response.status;
				
				$scope.dataFromServer = { Grid: response.data };
				$scope.Grid = $scope.dataFromServer.Grid;
			}, function (response) {
			
				$scope.data = response.data || "Request failed";
				$scope.status = response.status;
			
			});
			
		};
		
		$scope.CreateNewGrid = function(restaurantId, date, gridType, name, isDefault, xlen, ylen){
		
			$scope.code = null;
			$scope.response = null;
			
			$scope.Grid = null;
			
			var httpMethod = 'POST';
			var urlWithParameters = $scope.url + '/' + restaurantId + '/' + date + '/' + gridType + '/' + name + '/' + isDefault + '/' + xlen + '/' + ylen;
			
			$http(
			{
				method: httpMethod,
				url: urlWithParameters
			}).
			then(function (response){
				$scope.status = response.status;
				$scope.responseOnSaving = { Response: response.data };

			}, function (response) {
			
				$scope.data = response.data || "Request failed";
				$scope.status = response.status;
			
			});
			
		};
		
	}]);