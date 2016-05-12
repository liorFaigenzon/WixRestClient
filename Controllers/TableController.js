app = angular.module('wixRestClientApp');

app.controller('TableController', ['$scope', '$http',
    function ($scope, $http) {
	
		$scope.url = 'http://localhost:54603/api/Tables';
		
		$scope.GetTablesByGridId = function (gridId){
		
			$scope.code = null;
			$scope.response = null;
			$scope.dataFromServer = null;
			
			$scope.Tables = null;
			
			var httpMethod = 'GET';
			var urlWithParameters = $scope.url + '/' + gridId;
			
			$http(
			{
				method: httpMethod,
				url: urlWithParameters
			}).
			then(function (response){
				$scope.status = response.status;
				
				$scope.dataFromServer = { Tables: response.data };
				$scope.Tables = $scope.dataFromServer.Tables;
			}, function (response) {
			
				$scope.data = response.data || "Request failed";
				$scope.status = response.status;
			
			});
			
		};
		
		$scope.CreateNewTable = function(gridId, tableNumber, capacity, isSmokingAllowed, xCoord, yCoord, xLength, yLength){
		
			$scope.code = null;
			$scope.response = null;
			
			$scope.Grid = null;
			
			var httpMethod = 'POST';
			var urlWithParameters = $scope.url + '/' + gridId + '/' + tableNumber + '/' + capacity + '/' + isSmokingAllowed + '/' + xCoord + '/' + yCoord + '/' + xLength  + '/' + yLength;
			
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