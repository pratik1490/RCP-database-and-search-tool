(function(){
    var app = angular.module("realclearpolitics",["ngRoute"]);
    
    app.config(function($routeProvider){
        
        $routeProvider.when("/",{
            templateUrl:"/html/home.html",
            controller:"HomeController"
        }).when("/story/:id",{
            templateUrl:"/html/story.html",
            controller:"StoryController"
        }).otherwise({
            redirectTo:"/"
        });
        
    });
}());