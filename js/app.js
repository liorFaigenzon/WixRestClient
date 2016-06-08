"use strict"

var wixRestClientApp = angular.module("wixRestClientApp", []);

wixRestClientApp.factory("draggable_tables", function () {
        var data = [
            {
                name: "table",
                img: "table.png"
        }, {
                name: "table1",
                img: "table1.png"
        }, {
                name: "table2",
                img: "table2.png"
        }
    ];

        return data;
    }) //
	
wixRestClientApp.factory("draggable_chairs", function () {
        var data = [
            {
                name: "chair",
                img: "chair.png"
        }, {
                name: "chair",
                img: "chair1.png"
        }
    ];

        return data;
    }) //
	
wixRestClientApp.factory("draggable_misc", function () {
	var data = [
		{
			name: "wall",
			img: "wall.png"
	}, {
			name: "square",
			img: "square.jpg"
	}
];

	return data;
}) //

wixRestClientApp.factory("draggableArray", function () {
	var data = 
			 { 
			"1": {
				'key': "Misc",  
				'value': [   
					{name: "wall", img: "wall.png"},  
					{name: "square", img: "square.png"}
				]  
			},    
		};
	return data;
}) //

wixRestClientApp.factory("droppableData", function () {
    var data = [
        {
            tname: "square",
            img: ""
        }
    ];

    return data;
}); ///


wixRestClientApp.controller("MainController", 
	["$scope", "draggable_tables","draggable_chairs","draggableArray", "draggable_misc", "droppableData", "$timeout",
	function ($scope, draggable_tables, length,width,draggable_chairs, draggable_misc,draggableArray, droppableData,$timeout) {

	$scope.cells = [
        []
    ];
    $scope.sizes = [];

    makeSizes();

    $scope.length = $scope.sizes[0];
    $scope.width = $scope.sizes[0];
	
    $scope.$watch('[width,length]', makeMap, true);

    function makeMap() {
        var cols = $scope.width,
            rows = $scope.length;
		console.log('makeMap');
        $scope.cells = matrix(rows, cols, 'cell');
    }

    function matrix(rows, cols, defaultValue) {
		// code from here http://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
        
		var maps = [{
				ID: "1",
				X: 12,
				Y: 12,
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
		}];
		
		var photos = [
		{
			ID: "1",
			NAME: "table",
			PATH:"table.png"
		}];
		
		var orders = [
		{
			ID: "1",
			takenBitchesId:"1",
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
				arr[i][j] ={id:i+"-"+j,name: "square", img: "square.jpg"};
				//arr[i][j].myStyle = "inset 0px 0px 0px 3px blue";
				
            }
        }

		
		
		
		//Load map bitch (for map 1)
	    for (var j = 0; j < takenBitches.length; j++) {
                // Initializes:
                //arr[i][j] = defaultValue;
				arr[takenBitches[j].X][takenBitches[j].Y] ={id:takenBitches[j].X+"-"+takenBitches[j].Y,name: photos[j].NAME, img: photos[j].PATH};
		}
		
		//Apply order to map 
		for (var j = 0; j < takenBitches.length; j++) {
                // Initializes:
				//arr[takenBitches[j].X][takenBitches[j].Y]).myStyle = "box-shadow:inset 0px 0px 0px 3px blue";

		}
		
        return arr;
    }

    makeMap();

    function makeSizes() {
        for (var i = 0; i < 10; i++) {
            $scope.sizes.push(i + 3);
        }
    }
    

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
}]); //

wixRestClientApp.directive("dragme", ["$timeout", function ($timeout) {
    return {
        restrict: "A",
        replace: true,
        scope: {
            myindex: "=",
        },
        link: function ($scope, $elem, $attr) {
            var backgroundImage = $attr.backgroundimage;
            var myBgcolor = $attr.bgcolor;
            var myLeft = parseInt($attr.left);

            $elem.addClass("draggable");
            $elem.attr("data-answerimage", backgroundImage);
            $elem.attr("data-myindex", $scope.myindex);

            $elem.css({
                left: myLeft,
                backgroundImage: "url(img/" + backgroundImage + ")"
            });

            $elem.draggable({
                helper: "clone",
                revert: false,
                appendTo: "body",
                zIndex: 100,
                drag: function (event, ui) {
                    $(ui.helper).css("border", "0px");
                }
            })

        }
    }
}]); ///

wixRestClientApp.directive("dropme", ["$timeout", function ($timeout) {
    return {
        restrict: "A",
        replace: true,
        scope: {},
        link: function ($scope, $elem, $attr) {
            var backgroundImage = $attr.backgroundimage;

            $elem.addClass("droppable");
            $elem.attr("data-answerimage", backgroundImage);
            $elem.css({
                backgroundImage: "url(img/" + backgroundImage + ")"
            });
            $elem.droppable({
                accept: ".draggable",
                drop: function (event, ui) {
                    var droppedElem = ui.draggable;
                    var myAnswer = $(this).attr("data-answerdata");
                    $(this).css("background-image", "url(img/" + droppedElem.attr("backgroundimage") + ")");
                }
            })
        }
    }
}]); ///

