"use strict"

var wixRestClientApp = angular.module("wixRestClientApp", []);

wixRestClientApp.factory("draggable_tables", function () {
        var data = [
            {
                name: "table",
                img: "table.png"
        }, {
                name: "table1",
                img: "table1.jpeg"
        }, {
                name: "table2",
                img: "table2.jpeg"
        }
    ];

        return data;
    }) //
	
wixRestClientApp.factory("draggable_chairs", function () {
        var data = [
            {
                name: "chair",
                img: "chair.jpg"
        }
    ];

        return data;
    }) //
	
wixRestClientApp.factory("draggable_misc", function () {
	var data = [
		{
			name: "chair",
			img: "f.jpeg"
	}
];

	return data;
}) //

wixRestClientApp.factory("droppableData", function () {
    var data = [
        {
            tname: "apple",
            img: "apple_callout.png"
        }
    ];

    return data;
}); ///

wixRestClientApp.controller("MainController", 
	["$scope", "draggable_tables", "draggable_chairs", "draggable_misc", "droppableData", "$timeout",
	function ($scope, draggable_tables, draggable_chairs, draggable_misc, droppableData,$timeout) {

    $scope.draggableArray_tables = draggable_tables;
	$scope.draggableArray_chairs = draggable_chairs;
	$scope.draggableArray_misc = draggable_misc;
	
    $scope.droppableArray = droppableData;

    $scope.draggableArray_tablesLength = $scope.draggableArray_tables.length;
	
	$scope.bgItem = {name: "bg", img: "square.jpg"}
	
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