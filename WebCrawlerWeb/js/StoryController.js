
var app = angular.module("realclearpolitics");

var controller = app.controller("StoryController",['$scope','$sce','$routeParams',function($scope,$sce,$routeParams){
    var storyId = $routeParams.id;

    $scope.title="";
    $scope.authorName="";
    $scope.agencyName="";
    $scope.description="";
    $scope.rcpLink="";
    $scope.orginalLink="";
    $scope.pubDate="";
    
    $.post('http://localhost:8000/api/updateViews/'+storyId,function(result){
        
    });
    
    $.get('http://localhost:8000/api/stories/'+storyId,function(data){
        storyData = data.json; 
        $scope.title=storyData[0].Title;
        if(storyData[0].AuthorName != "" ){
            $scope.authorName=storyData[0].AuthorName + ' , ';
        }
        
        $scope.agencyName=storyData[0].AgencyName;
        $scope.description=$sce.trustAsHtml(storyData[0].Description);
        $scope.rcpLink=storyData[0].Link;
        $scope.orginalLink=storyData[0].OriginalLink;
        $scope.pubDate=storyData[0].PubDate.split('T')[0];
        $scope.$apply();
        
        if($scope.orginalLink == ""){
            $('#outsourcelink').addClass('hide');
        }
    }); 
}]);
