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
            var backgroundShadow = $attr.backgroundshadow;
            $elem.addClass("droppable");
            $elem.attr("data-answerimage", backgroundImage);
            $elem.css({
                backgroundImage: "url(img/" + backgroundImage + ")",
                boxShadow:backgroundShadow
            });
            $elem.droppable({
                accept: ".draggable",
                drop: function (event, ui) {
                    //takenPlaces.push({x:$(this).attr("Id").split("-")[0],y:$(this).attr("Id")(this).attr("Id").split("-")[1]})
                    //$(this).attr("data-name").value="table";
                    var droppedElem = ui.draggable;
                    var myAnswer = $(this).attr("data-answerdata");
                    $(this).css("background-image", "url(img/" + droppedElem.attr("backgroundimage") + ")");
                }
            })
        }
    }
}]); ///

wixRestClientApp.directive("accordion", function() {
	return {
		restrict: "EA",
		link: function($scope, $elem, $attr) {
			$elem.on("click", ".link", function() {
				$(this).next().slideToggle();
				$(this).parent().toggleClass("open");
			});
			
			
		}
	};
});