app = angular.module('wixRestClientApp');

app.controller('GridController', ['$scope', '$http',
    function ($scope, $http) {


        $scope.Tables = [{
            tableNum: "1",
            capacity: "4",
            x: "1",
            y: "1",
            img: "table1.jpg"
        },
        {
            tableNum: "2",
            capacity: "6",
            x: "2",
            y: "2",
            img: "table1.jpg"
        },
        {
            tableNum: "3",
            capacity: "8",
            x: "3",
            y: "3",
            img: "table1.jpg"
        }
        ];

        $scope.cells = [
[]
        ];
        $scope.sizes = [];

        $scope.length = 12;
        $scope.width = 12;

        $scope.$watch('[width,length]', makeMap, true);
	
		$scope.url = 'http://localhost:54603/api/grids';
		
		$scope.GetGridByUserNameAndPassword = function (userName, password){
		
            
		

		    $scope.Grid = $scope.dataFromServer.Grid;
		    $scope.length = 12;
		    $scope.width = 12;
		    makeMap();
		    makeSizes();
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

		function makeSizes() {
			for (var i = 0; i < $scope.length; i++) {
				$scope.sizes.push(i + 3);
			}
		}
		function matrix(rows, cols, defaultValue) {
		    // code from here http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
		    var arr = [[]];
		    var Tables = $scope.Tables;

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
		
			//for (var j = 0; j < $scope.Grid.Items.length; j++) {
		             
		        //    arr[$scope.Grid.Items[j].X][$scope.Grid.Items[j].Y] = { id: i + "-" + j, name: "square", img: $scope.Grid.Items[j].Name };
		        //}

			for (var j = 0; j < Tables.length; j++) {
		             
			    arr[Tables[j].x][Tables[j].y] = {
			        tableNum: Tables[j].tableNum,
			        id: Tables[j].capacity,
			        img: Tables[j].img,
			        };
		        }
		    return arr;
		}
		
	}]);