app = angular.module('wixRestClientApp');

wixRestClientApp.controller("MainController", 
	[ "$scope", "$http", "draggable_tables", "draggable_chairs", "draggableArray", "draggable_misc", "droppableData", "$timeout",
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

        $scope.length = 0;
        $scope.width = 0;

        $scope.$watch('[width,length]', makeMap, true);

	
		$scope.Gridurl = 'http://localhost:54603/api/grids';
		
		$scope.GetGridByUserNameAndPassword = function (userName, password){

		    $scope.Grid = $scope.dataFromServer.Grid;

		    makeMap();
		};

		$scope.GetGridByRestaurantId = function(restaurantId){
		
		$scope.isRouteLoading = true;
			$scope.code = null;
			$scope.response = null;
			
			$scope.Grid = null;
			
			
			
			var dinnerStart= document.getElementById("dinnerStart").value;
			if (dinnerStart != "")
			{
				dinnerStart = dinnerStart.replace(":", "-");
			}
			else
			{
				dinnerStart = "00-00";
			}
			
			var dinnerEnd= document.getElementById("dinnerEnd").value;
			if (dinnerEnd != "")
			{
				dinnerEnd = dinnerEnd.replace(":", "-");
			}
			else
			{
				dinnerEnd = "23-59";
			}
			mapSaveDate
			
		    //" "+ document.getElementById("dinnerEnd").value
			var urlWithParameters = $scope.Gridurl + '/' + restaurantId + '/' + document.getElementById("dinnerDate").value + '/' + dinnerStart + '/' + dinnerEnd;
			var httpMethod = 'GET';
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
				$scope.SimpleItems = response.data.simpleItems;
				makeMap();
				$scope.gridId = response.data.Id;
				$scope.isRouteLoading = false;
			}, function (response) {
			
				$scope.data = response.data || "Request failed";
				$scope.status = response.status;
				$scope.isRouteLoading = false;
				$scope.cells = [[]];
			});
			
		};
		
		
		$scope.UpdateGrid  = function(restaurantId){
		
			$scope.isRouteLoading = true;
			$scope.code = null;
			$scope.response = null;
			
			$scope.Grid = null;

			var dinnerStart= "00-00";	
			var dinnerEnd="23-59";
			var date = "01.01.1900";
			if ($scope.mapSaveDate !== null)
			{
				date = $scope.mapSaveDate.toLocaleDateString()
			}

			
			var httpMethod = 'GET';
			var dateGoodFormat = document.getElementById("mapSaveDate").value
			var urlWithParameters = $scope.Gridurl + '/' + restaurantId + '/' + dateGoodFormat + '/' + dinnerStart + '/' + dinnerEnd;
			
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
				$scope.SimpleItems = response.data.simpleItems;
				makeMap();
				$scope.gridId = response.data.Id;
				$scope.isRouteLoading = false;
			}, function (response) {
				
				$scope.data = response.data || "Request failed";
				$scope.status = response.status;
				$scope.isRouteLoading = false;
			
			});
			
		};
		
		
		$scope.CreateNewGrid = function(restaurantId, date, gridType, name, isDefault, xlen, ylen){
		
			$scope.code = null;
			$scope.response = null;
			
			$scope.Grid = null;
			//date = "Date(" + document.getElementById("mapSaveDate").value + ")";
			date = document.getElementById("mapSaveDate").value;
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
				$scope.gridId = response.data.gridId;
				alert("Grid create success")
			var takenPlaces = [];
			$scope.DeleteTable(response.data) ;
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

		$scope.selectThis = function (value) {
		    if (value != 'inset 0px 0px 0px 3px red')
		    {
		        if (boxShadow == '0')
		        { boxShadow = 'inset 0px 0px 0px 3px blue' }
		        else
		        { boxShadow = '0' }
		    }
		}

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
		$scope.ClearMap = function () {
			$scope.mapSaveDate = null;
		    $scope.cells = [[]];
		    $scope.Items = undefined;
		    $scope.SimpleItems = undefined;
		    $scope.length = 0;
		    $scope.width = 0;
		}


		function makeMap() {
		    var cols = $scope.width,
                rows = $scope.length;
		    console.log('makeMap');
		    $scope.cells = [[]];
		    $scope.cells = matrix(rows, cols, 'cell');
		}

         makeSizes();

		function makeSizes() {
		    var index = 12;
		    if ($scope.Items !== undefined)
		    { 
		        index = $scope.length;
		    }
		  
		    for (var i = 0; i < index; i++) {
				$scope.sizes.push(i + 3);
			}
		}
		function matrix(rows, cols, defaultValue) {
		//rows = maps[0].X;
		//cols = maps[0].Y;
		
		
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
				arr[i][j] ={id:i+"-"+j,name: "square", img: "square.jpg", TableNum: "0"};
				//arr[i][j].boxShadow = "0";
				
            }
        }


        if ($scope.Items !== undefined)
        {
			for (var j = 0; j < $scope.Items.length; j++) 
			{
			   
			    if ($scope.Items[j].Taken == false)
			    {
			        arr[$scope.Items[j].X][$scope.Items[j].Y] = { id: $scope.Items[j].TableNumber, name: "Table", img: "table.png" ,TableNum: $scope.Items[j].TableNumber};
			    }
			    else
			    {
			        arr[$scope.Items[j].X][$scope.Items[j].Y] = { id: $scope.Items[j].TableNumber, name: "Table", img: "table.png", boxShadow: "inset 0px 0px 0px 3px red",TableNum: $scope.Items[j].TableNumber };
			    }
			  
			}
		}

		if ($scope.SimpleItems !== undefined)
        {
			for (var j = 0; j < $scope.SimpleItems.length; j++) 
			{
				arr[$scope.SimpleItems[j].xCoord][$scope.SimpleItems[j].yCoord] ={id:$scope.SimpleItems[j].xCoord+"-"+$scope.SimpleItems[j].yCoord,name: $scope.SimpleItems[j].Name, img: $scope.SimpleItems[j].Name+".png"};
				//arr[$scope.Items[j].X][$scope.Items[j].Y] ={id:$scope.Items[j].TableNumber,name: "Chair", img: "chair1.png"};
			}
			
		}
		

		
        return arr;
		}

		$scope.GetCluster = function (restaurantId) {

		    $scope.isRouteLoading = true;
		    $scope.code = null;
		    $scope.response = null;
		    $scope.result = null;

		    var httpMethod = 'GET';
		    var dateGoodFormat = document.getElementById("clusterDate").value
		    var urlWithParameters = $scope.Gridurl + '/GetGridCluster/' + restaurantId + '/' + dateGoodFormat;

		    $http(
			{
			    method: httpMethod,
			    url: urlWithParameters
			}).
			then(function (response) {
			    $scope.status = response.status;
			    $scope.responseOnSaving = { Response: response.data };
			    $scope.result = response.data;
			    document.getElementById('resultClsterString').innerHTML = $scope.result;
			}, function (response) {

			    $scope.data = response.data || "Request failed";
			    $scope.status = response.status;
			    $scope.isRouteLoading = false;

			});

		};


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
		
		    gridID = $scope.gridId;
			$scope.code = null;
			$scope.response = null;
			
			$scope.Grid = null;
       		 for (var i = 0; i < $scope.length; i++) {
            	for (var j = 0; j < $scope.width; j++) {
	                // Initializes:
	                //arr[i][j] = defaultValue;
					if ($scope.cells[i][j].boxShadow == "inset 0px 0px 0px 3px blue") {
						tableNum=$scope.cells[i][j].id;
						}
		        	}
		        }
			var httpMethod = 'POST';
			phoneNum = document.getElementById("phonetxt").value;
			numOfPpl = document.getElementById("quantitytxt").value;
			Name = document.getElementById("nametxt").value;
			Customerid = Name + "-" + phoneNum;
			$http(
			{
				method: httpMethod,
				url: $scope.OrderUrl + '/CreateNewOrder',
				data: {
				GridID:gridID ,
				TableNumber:tableNum,
				CustomerInfo: Customerid,
                NumOfPeople:numOfPpl,
                FromTime: document.getElementById("dinnerDate").value + " " + document.getElementById("dinnerStart").value,
                ToTime: document.getElementById("dinnerDate").value + " " + document.getElementById("dinnerEnd").value
				}
			}).
			then(function (response){
			    $scope.status = response.status;
			    alert("Reserve success")
				$scope.responseOnSaving = { Response: response.data };
							var index = 0;
			

			}, function (response) {
			
				$scope.data = response.data || "Request failed";
				$scope.status = response.status;
			
			});
			
		};

		$scope.GetOrdersByGridAndDate = function(){
		
			var localUrl = 'http://localhost:54603/api/GetAdminOrders';

			$scope.code = null;
			$scope.response = null;
			var date =document.getElementById('orderDate').value;
			var httpMethod = 'GET';
			//
			var urlWithParameters = localUrl + '/' + date;
			
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
		
		$scope.GridItemUrl = 'http://localhost:54603/api/GridItems';

		$scope.CreateNewGridItem = function(gridId, itemTypeId, xCoord, yCoord, name){
		
			$scope.code = null;
			$scope.response = null;
			
			$scope.Grid = null;
			
			var httpMethod = 'POST';
			var urlWithParameters = $scope.GridItemUrl + '/' + gridId + '/' + itemTypeId + '/' + xCoord + '/' + yCoord + '/' + name;
			
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
		
		$scope.DeleteTable = function (gridId) {

		    $scope.code = null;
		    $scope.response = null;

		    $scope.Grid = null;

		    var httpMethod = 'DELETE';
		    var urlWithParameters = $scope.TableUrl + '/' + gridId;

		    $http(
			{
			    method: httpMethod,
			    url: urlWithParameters
			}).
			then(function (response) {
			    $scope.status = response.status;
			    $scope.responseOnSaving = { Response: response.data };
				$scope.DeleteGridItem(gridId)
			}
			, function (response) {

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
		
		$scope.DeleteGridItem = function (gridId) {

		    $scope.code = null;
		    $scope.response = null;

		    $scope.Grid = null;

		    var httpMethod = 'DELETE';
		    var urlWithParameters ='http://localhost:54603/api/GridItems' + '/' + gridId;

		    $http(
			{
			    method: httpMethod,
			    url: urlWithParameters
			}).
			then(function (response) {
			    $scope.status = response.status;
			    $scope.responseOnSaving = { Response: response.data };
				
			var takenPlaces = [];
			
			var maxTableNum = -1;
       		 for (var i = 0; i < $scope.length; i++) {
            	for (var j = 0; j < $scope.width; j++) {
					if(maxTableNum < $scope.cells[i][j].TableNumber)
					{
						maxTableNum = $scope.cells[i][j].id
					}
				}	
			}
			
			var tableNum = maxTableNum;
       		 for (var i = 0; i < $scope.length; i++) {
            	for (var j = 0; j < $scope.width; j++) {
	                // Initializes:
            	    //arr[i][j] = defaultValue;
            	   
					if ($scope.cells[i][j].img != "square.jpg") {
						if ($scope.cells[i][j].img.includes("table"))
						{
							
							if ($scope.cells[i][j].boxShadow == 'inset 0px 0px 0px 3px red')
							{
								tableNum = $scope.cells[i][j].id;
							}
							else
							{
								tableNum = maxTableNum+1;
								maxTableNum = tableNum;
							}
							
							{
								var item = { gridId:gridId,
												tableNumber:tableNum,
												capacity:0,
												isSmokingAllowed:'false',
												xCoord:i,
												yCoord:j,
												xLength:1,
												yLength:1
											};
								$scope.CreateNewTable(item.gridId,item.tableNumber,item.capacity,item.isSmokingAllowed,item.xCoord,item.yCoord,item.xLength,item.yLength);
							}
					
						}
						else
						{
							var item = { gridId:gridId,
									xCoord:i,
									yCoord:j
								};
							$scope.CreateNewGridItem(item.gridId, 1, item.xCoord, item.yCoord,$scope.cells[i][j].img.split('.')[0]);
		            	
						}
					}
	        	}

			}
			}, function (response) {

			    $scope.data = response.data || "Request failed";
			    $scope.status = response.status;

			});

		};
			
		
		
}]);