define([], function(){
    require(['app'], function(app){
        app.directive("scrollTop", ['$mdUtil', function($mdUtil){
            return {
                restrict: "A",
                link: function (scope, element, attr) {
                    var content = document.getElementById(attr.content);
                    var container = angular.element(content);

                    function toggleScroll(e) {
                        var target = e.target;
                        if(target.scrollTop === 0) {
                            element.removeClass("scrolling", scope);
                        }
                        else {
                            element.addClass("scrolling", scope);
                        }
                    }

                    function scrollTop() {
                        $mdUtil.animateScrollTo(content, 0, 200);
                    }

                    container.on("scroll", toggleScroll);
                    element.on("click", scrollTop);
                }
            };
        }]);
    });
});