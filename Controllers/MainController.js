app = angular.module('wixRestClientApp');

wixRestClientApp.controller("MainController", 
	["$scope", "$http", "draggable_tables", "draggable_chairs", "draggableArray", "draggable_misc", "droppableData", "$timeout",
	function ($scope, $http, orders, draggable_tables, length, width, draggable_chairs, draggable_misc, draggableArray, droppableData, $timeout) {

	//------------
    $scope.draggableArray_tables = draggable_tables;
	$scope.draggableArray_chairs = draggable_chairs;
	$scope.draggableArray_misc = draggable_misc;
	
	$scope.draggableArray =  
			 {
			"1": {
				'key': "Tables",  
				'value': [   
					{name: "table", img: "table.png"},  
					{name: "table", img: "table1.png"},
					{name: "table", img: "table2.png"}
				]  
			},    
			"2": {
				'key': "Chairs",  
				'value': [   
					{name: "chair", img: "chair.png"},  
					{name: "chair", img: "chair1.png"}
				]  
			},    			
			"3": {
				'key': "Misc",  
				'value': [   
					{name: "wall", img: "wall.png"},  
					{name: "square", img: "square.jpg"}
				]  
			},    
		};	
	
    $scope.droppableArray = droppableData;

    $scope.draggableArray_tablesLength = $scope.draggableArray_tables.length;
	
	$scope.bgItem = {name: "bg"}//, img: "square.jpg"}
	
	$scope.getNum = function(num) {
		// read from server
		var arrayToReturn = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		return arrayToReturn;	
	}

	/////////////////// grid controller functions
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
        ];
        $scope.sizes = [];

        $scope.length = 12;
        $scope.width = 12;

        $scope.$watch('[width,length]');
	
		$scope.Gridurl = 'http://localhost:54603/api/grids';
		
		$scope.GetGridByUserNameAndPassword = function (userName, password){

		    $scope.Grid = $scope.dataFromServer.Grid;
		    $scope.length = 12;
		    $scope.width = 12;

		    makeMap();
		    makeSizes();
		};

		$scope.GetGridByRestaurantId = function(restaurantId){
		
			$scope.code = null;
			$scope.response = null;
			
			$scope.Grid = null;
			
			var httpMethod = 'GET';
			var urlWithParameters = $scope.Gridurl + '/' + restaurantId;
			
			$http(
			{
				method: httpMethod,
				url: urlWithParameters
			}).
			then(function (response){
				$scope.status = response.status;
				$scope.responseOnSaving = { Response: response.data };
				$scope.length = response.data.XLen;
				$scope.width = response.data.YLen;
				$scope.Items = response.data.Items;
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
			var urlWithParameters = $scope.Gridurl + '/' + restaurantId + '/' + date + '/' + gridType + '/' + name + '/' + isDefault + '/' + xlen + '/' + ylen;
			
			$http(
			{
				method: httpMethod,
				url: urlWithParameters
			}).
			then(function (response){
				$scope.status = response.status;
				$scope.responseOnSaving = { Response: response.data };

			var index = 0;
			var takenPlaces = [];
       		 for (var i = 0; i < $scope.length; i++) {
            	for (var j = 0; j < $scope.width; j++) {
	                // Initializes:
	                //arr[i][j] = defaultValue;
					if ($scope.cells[i][j].name != "square") {
						var item = { gridId:response.data,
									tableNumber:index,
									capacity:0,
									isSmokingAllowed:'false',
									xCoord:i,
									yCoord:j,
									xLength:1,
									yLength:1
								};
						index++;
						$scope.CreateNewTable(item.gridId,item.tableNumber,item.capacity,item.isSmokingAllowed,item.xCoord,item.yCoord,item.xLength,item.yLength);
		            	}
		        	}
		        }
				//$scope.CreateNewTable

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
		    var urlWithParameters = $scope.Gridurl + '/' + gridId;

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
		    var urlWithParameters = $scope.Gridurl + '/' + gridId;

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
		    ClearMap();
		    $scope.cells = matrix(rows, cols, 'cell');
            makeSizes();

		}

		function ClearMap(){
			$scope.cells = [[]];
		}



		  function makeSizes() {
			for (var i = 0; i < $scope.length; i++) {
				$scope.sizes.push(i + 3);
			}
		}
		function matrix(rows, cols, defaultValue) {
		// code from here http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
        
		var mapsDates = [{
				ID: "1",
				Date: "09/06/16",
				mapId: "1"
			}];
		
		var maps = [{
				ID: "1",
				X: $scope.length,
				Y: $scope.width,
				NAME: "Default",
				DESCRIBE:"DEFAULT MAP MATHER FUCKER BITCH"
			}];
		
		rows = maps[0].X;
		cols = maps[0].Y;
		
		var takenBitches = [
		{
			ID: "1",
			mapId: "1",
			X: 5,
			Y: 5,
			photoId: "1",
		},{
			ID: "2",
			mapId: "1",
			X: 6,
			Y: 5,
			photoId: "1",
		},{
			ID: "3",
			mapId: "1",
			X: 4,
			Y: 5,
			photoId: "1",
		},{
			ID: "4",
			mapId: "1",
			X: 5,
			Y: 4,
			photoId: "2",
		}];
		
		var photos = [
		{
			ID: "1",
			NAME: "table",
			PATH:"table.png"
		},{
		ID: "2",
			NAME: "chair",
			PATH:"chair1.png"
		}];
		
		var orders = [
		{
			ID: "1",
			takenBitchesId:"1",
			customerId:"1",
			From: "08/6/16 23:00",
			To:"09/6/16 00:00"
		}];
		
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
				arr[i][j] ={id:i+"-"+j+"-"+maps[0].ID+"-"+photos[0].ID,name: "square", img: "square.jpg"};
				arr[i][j].boxShadow = "0";
				
            }
        }

		for (var j = 0; j < $scope.Items.length; j++) {
                // Initializes:
                //arr[i][j] = defaultValue;
				arr[$scope.Items[j].X][$scope.Items[j].Y] ={id:$scope.Items[j].X+"-"+$scope.Items[j].Y,name: "Table", img: "table.png"};
		}
		
		
		//Load map bitch (for map 1)
	    //for (var j = 0; j < takenBitches.length; j++) {
                // Initializes:
                //arr[i][j] = defaultValue;
		//		arr[takenBitches[j].X][takenBitches[j].Y] ={id:takenBitches[j].X+"-"+takenBitches[j].Y,name: photos[0].NAME, img: photos[0].PATH};
		//}
		
		//Apply order to map 
		//for (var j = 0; j < orders.length; j++) {
                // Initializes:
		//		(arr[takenBitches[j].X][takenBitches[j].Y]).boxShadow = "inset 0px 0px 0px 3px red";
		//		(arr[takenBitches[j].X][takenBitches[j].Y]).id = "Taken"

		//}
		
        return arr;
    }


		///////////// order controller
		$scope.OrderUrl = 'http://localhost:54603/api/Orders';
		
		$scope.GetOrdersByGridId = function (gridId){
		
			$scope.code = null;
			$scope.response = null;
			$scope.dataFromServer = null;
			
			$scope.Orders = null;
			
			var httpMethod = 'GET';
			
			var urlWithParameters = $scope.OrderUrl + '/' + gridId;
			
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
			var urlWithParameters = $scope.OrderUrl + '/' + gridID + '/' + tableNum + '/' + customerName + '/' + phoneNum + '/'+ numOfPpl + '/' + reservationTime;


			$http(
			{
				method: httpMethod,
				url: $scope.url + '/CreateNewOrder',
				data: {
				GridID:gridID ,
				TableNumber:tableNum,
				CustomerID:phoneNum,
				NumOfPeople:numOfPpl
				}
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

		//////////////////// Table contoller
		$scope.TableUrl = 'http://localhost:54603/api/Tables';
		
		$scope.GetTablesByGridId = function (gridId){
		
			$scope.code = null;
			$scope.response = null;
			$scope.dataFromServer = null;
			
			$scope.Tables = null;
			
			var httpMethod = 'GET';
			var urlWithParameters = $scope.TableUrl + '/' + gridId;
			
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
			var urlWithParameters = $scope.TableUrl + '/' + gridId + '/' + tableNumber + '/' + capacity + '/' + isSmokingAllowed + '/' + xCoord + '/' + yCoord + '/' + xLength  + '/' + yLength;
			
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