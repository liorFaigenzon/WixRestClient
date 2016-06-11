app = angular.module('wixRestClientApp');

app.controller('GridController', ['$scope', '$http',
    function ($scope, $http) {


        $scope.cells = [
[]
        ];
        $scope.sizes = [];


        $scope.length = 0;
        $scope.width = 0;

        $scope.$watch('[width,length]', makeMap, true);
	
		$scope.url = 'http://localhost:54603/api/grids';
		
		$scope.GetGridByUserNameAndPassword = function (userName, password){
		
			$scope.code = null;
			$scope.response = null;
			$scope.dataFromServer = null;
			
			$scope.Grid = null;
			
			var httpMethod = 'GET';
			var urlWithParameters = $scope.url + '/' + 5 + '/' + 8;
			
			$http(
			{
				method: httpMethod,
				url: urlWithParameters
			}).
			then(function (response){
				$scope.status = response.status;
				
				$scope.dataFromServer = { Grid: response.data };
				$scope.Grid = $scope.dataFromServer.Grid;
				$scope.length = $scope.Grid.YLen;
				$scope.width = $scope.Grid.XLen;
				makeMap();
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

		$scope.DeleteGrid = function (gridId) {

		    $scope.code = null;
		    $scope.response = null;

		    $scope.Grid = null;

		    var httpMethod = 'DELETE';
		    var urlWithParameters = $scope.url + '/' + gridId;

		    $http(
			{
			    method: httpMethod,
			    url: urlWithParameters
			}).
			then(function (response) {
			    $scope.status = response.status;
			    $scope.responseOnSaving = { Response: response.data };

			}, function (response) {

			    $scope.data = response.data || "Request failed";
			    $scope.status = response.status;

			});

		};

		$scope.PutGrid = function (gridId, grid) {

		    $scope.code = null;
		    $scope.response = null;

		    $scope.Grid = null;

		    var httpMethod = 'PUT';
		    var urlWithParameters = $scope.url + '/' + gridId;

		    $http(
			{
			    method: httpMethod,
			    url: urlWithParameters,
                data: grid
			}).
			then(function (response) {
			    $scope.status = response.status;
			    $scope.responseOnSaving = { Response: response.data };

			}, function (response) {

			    $scope.data = response.data || "Request failed";
			    $scope.status = response.status;

			});

		};



		function makeMap() {
		    var cols = $scope.width,
                rows = $scope.length;
		    console.log('makeMap');
		    $scope.cells = matrix(rows, cols, 'cell');
		}

		function matrix(rows, cols, defaultValue) {
		    // code from here http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
		    var arr = [[]];

		    // Creates all lines:
		    for (var i = 0; i < rows; i++) {

		        // Creates an empty line
		        arr[i] = [];

		        // Adds cols to the empty line:
		        arr[i] = new Array(cols);

		        for (var j = 0; j < cols; j++) {
		            // Initializes:
		            //arr[i][j] = defaultValue;
		            arr[i][j] = { id: i + "-" + j, name: "square", img: "square.jpg" };
		        }
		    }

		    return arr;
		}
		
	}]);