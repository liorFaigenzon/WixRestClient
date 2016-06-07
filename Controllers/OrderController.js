app = angular.module('wixRestClientApp');

app.controller('OrderController', ['$scope', '$http',
    function ($scope, $http) {
	
		$scope.url = 'http://localhost:54603/api/Orders';
		
		$scope.GetOrdersByGridId = function (gridId){
		
			$scope.code = null;
			$scope.response = null;
			$scope.dataFromServer = null;
			
			$scope.Orders = null;
			
			var httpMethod = 'GET';
			var urlWithParameters = $scope.url + '/' + gridId;
			
			$http(
			{
				method: httpMethod,
				url: urlWithParameters
			}).
			then(function (response){
				$scope.status = response.status;
				
				$scope.dataFromServer = { Orders: response.data };
				$scope.Orders = $scope.dataFromServer.Orders;
			}, function (response) {
			
				$scope.data = response.data || "Request failed";
				$scope.status = response.status;
			
			});
			
		};
		
		$scope.CreateNewOrder = function(gridID, tableNum, customerName, phoneNum, numOfPpl, reservationTime){
		
			$scope.code = null;
			$scope.response = null;
			
			$scope.Grid = null;
			
			var httpMethod = 'POST';
			var urlWithParameters = $scope.url + '/' + gridID + '/' + tableNum + '/' + customerName + '/' + phoneNum + '/'+ numOfPpl + '/' + reservationTime;


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

		$scope.GetOrdersByGridAndDate = function(gridId){
		
			var localUrl = 'http://localhost:54603/api/GetAdminOrders';

			$scope.code = null;
			$scope.response = null;
			
			$scope.Grid = null;
			
			var httpMethod = 'GET';
			var urlWithParameters = localUrl + '/' + gridId;
			
			$http(
			{
				method: httpMethod,
				url: urlWithParameters
			}).
			then(function (response){
				$scope.status = response.status;
				$scope.responseOnSaving = { Response: response.data };
				$scope.orders = response.data;
				var data = $scope.orders;
				$scope.tableParams = new NgTableParams({}, { dataset: $scope.orders });
			}, function (response) {
			
				$scope.data = response.data || "Request failed";
				$scope.status = response.status;
			
			});
			
		};
		
	}]);