"use strict"

var dragDropSampleApp = angular.module("dragDropSampleApp", []);

dragDropSampleApp.factory("draggableData", function () {
        var data = [
            {
                name: "table",
                img: "table.png"
        }, {
                name: "chair",
                img: "chair.jpg"
        }, {
                name: "fountain",
                img: "f.jpg"
        }, {
            name: "bg",
            img: "bg.jpg"
        }
    ];

        return data;
    }) //

dragDropSampleApp.factory("droppableData", function () {
    var data = [
        {
            tname: "apple",
            img: "apple_callout.png"
        }
    ];

    return data;
}); ///

dragDropSampleApp.controller("MainController", ["$scope", "draggableData", "droppableData","$timeout" ,function ($scope, draggableData, droppableData,$timeout) {

    $scope.draggableArray = draggableData;
    $scope.droppableArray = droppableData;

    $scope.draggableArrayLength = $scope.draggableArray.length;
	
	$scope.bgItem = {name: "bg", img: "square.jpg"}
	
	$scope.getNum = function(num) {
		// read from server
		var arrayToReturn = [1, 2, 3, 4, 5];
		return arrayToReturn;	
	}
}]); //

dragDropSampleApp.directive("dragme", ["$timeout", function ($timeout) {
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

dragDropSampleApp.directive("dropme", ["$timeout", function ($timeout) {
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