
    var app = angular.module("realclearpolitics");
    var storyData ={};
    var months={01:"JAN",02:"FEB",03:"MARCH",04:"APRIL",05:"MAY",06:"JUNE",07:"JULY",08:"AUG",09:"SEP",10:"OCT",11:"NOV",12:"DEC"}


    app.controller("HomeController", ['$scope','$sce', function($scope,$sce){

        $scope.stories ={};
        $scope.searchValue="";
        $scope.searchFilter ="Title";
        $scope.toDate=moment().format().split('T')[0];
        $scope.fromDate=moment().subtract(30,'days').format().split('T')[0];
        
        
        $scope.searchMenuClick = function(searchText){
            $scope.searchFilter = searchText;
            $scope.getSearchData($scope.searchValue);
        }
        
        
        $scope.menuClick = function(time){
            $('#div-search').addClass('hide');
            if(time === "TODAY"){
                $scope.getTodayData();
            }else if(time === "YESTERDAY"){
                $scope.getYesterdayData();
            }else if(time === "WEEK"){
                $scope.getWeekData();
            }else if(time === "MONTH"){
                $scope.getMonthData();
            }
            else if(time === "SEARCH"){
                $('#div-search').removeClass('hide');
                $scope.searchValue="";
                $scope.stories = {};
            }
            
            setLiActiveClass(time);
        }
        
        $scope.searchStory = function(){
            $scope.getSearchData($scope.searchValue);
        }
        
        $scope.getSearchData = function(search){
            var todayDate = moment().format().split('T')[0];
            if($scope.searchFilter === "Title"){
                $.get('http://localhost:8000/api/stories?title='+search+'&date1='+$scope.fromDate+'&date2='+$scope.toDate,function(data){
                    storyData = data.json; 
                    for (var i = 0; i < storyData.length; i++) {
                        storyData[i].Title = $sce.trustAsHtml (storyData[i].Title.toString());
                        storyData[i].AuthorName = $sce.trustAsHtml (storyData[i].AuthorName.toString());
                        storyData[i].Description = $sce.trustAsHtml (storyData[i].Description.toString());
            
                        if(storyData[i].AuthorName != "" ){
                            storyData[i].AuthorName = storyData[i].AuthorName + " , ";
                        }
                        storyData[i].AgencyName = $sce.trustAsHtml (storyData[i].AgencyName.toString());

                        var values = storyData[i].PubDate.split('T')[0].split('-');
                        storyData[i].pubDateDay = values[2];
                        storyData[i].pubDateMonth = months[parseInt(values[1])];
                        storyData[i].pubDateYear = values[0];
                    }
                    $scope.stories = storyData;
                    $scope.$apply();
                }); 
            }
            else if($scope.searchFilter === "Author"){
                $.get('http://localhost:8000/api/stories?author='+search+'&date1='+$scope.fromDate+'&date2='+$scope.toDate,function(data){
                    storyData = data.json; 
                    for (var i = 0; i < storyData.length; i++) {
                        storyData[i].Title = $sce.trustAsHtml (storyData[i].Title.toString());
                        storyData[i].AuthorName = $sce.trustAsHtml (storyData[i].AuthorName.toString());
                        storyData[i].Description = $sce.trustAsHtml (storyData[i].Description.toString());
            
                        if(storyData[i].AuthorName != "" ){
                            storyData[i].AuthorName = storyData[i].AuthorName + " , ";
                        }
                        storyData[i].AgencyName = $sce.trustAsHtml (storyData[i].AgencyName.toString());
                        
                        var values = storyData[i].PubDate.split('T')[0].split('-');
                        storyData[i].pubDateDay = values[2];
                        storyData[i].pubDateMonth = months[parseInt(values[1])];
                        storyData[i].pubDateYear = values[0];
                    }
                    $scope.stories = storyData;
                    $scope.$apply();
                }); 
            }
            else if($scope.searchFilter === "Agency"){
                $.get('http://localhost:8000/api/stories?agency='+search+'&date1='+$scope.fromDate+'&date2='+$scope.toDate,function(data){
                    storyData = data.json; 
                    for (var i = 0; i < storyData.length; i++) {
                        storyData[i].Title = $sce.trustAsHtml (storyData[i].Title.toString());
                        storyData[i].AuthorName = $sce.trustAsHtml (storyData[i].AuthorName.toString());
                        storyData[i].Description = $sce.trustAsHtml (storyData[i].Description.toString());
            
                        if(storyData[i].AuthorName != "" ){
                            storyData[i].AuthorName = storyData[i].AuthorName + " , ";
                        }
                        storyData[i].AgencyName = $sce.trustAsHtml (storyData[i].AgencyName.toString());
                        
                        var values = storyData[i].PubDate.split('T')[0].split('-');
                        storyData[i].pubDateDay = values[2];
                        storyData[i].pubDateMonth = months[parseInt(values[1])];
                        storyData[i].pubDateYear = values[0];
                    }
                    $scope.stories = storyData;
                    $scope.$apply();
                }); 
            }
        }
        
        $scope.getTodayData = function(){
            var todayDate = moment().format().split('T')[0];
            $.get('http://localhost:8000/api/stories?date='+todayDate,function(data){
                storyData = data.json; 
                for (var i = 0; i < storyData.length; i++) {
                    storyData[i].Title = $sce.trustAsHtml (storyData[i].Title.toString());
                    storyData[i].AuthorName = $sce.trustAsHtml (storyData[i].AuthorName.toString());
                    storyData[i].Description = $sce.trustAsHtml (storyData[i].Description.toString());
            
                    if(storyData[i].AuthorName != "" ){
                        storyData[i].AuthorName = storyData[i].AuthorName + " , ";
                    }
                    storyData[i].AgencyName = $sce.trustAsHtml (storyData[i].AgencyName.toString());
                    
                    var values = storyData[i].PubDate.split('T')[0].split('-');
                    storyData[i].pubDateDay = values[2];
                    storyData[i].pubDateMonth = months[parseInt(values[1])];
                    storyData[i].pubDateYear = values[0];
                }
                $scope.stories = storyData;
                $scope.$apply();
            }); 
        }
        
        $scope.getYesterdayData = function(){
            var yestDate = moment().subtract(1,'days').format().split('T')[0];
            $.get('http://localhost:8000/api/stories?date='+yestDate,function(data){
                storyData = data.json; 
                for (var i = 0; i < storyData.length; i++) {
                    storyData[i].Title = $sce.trustAsHtml (storyData[i].Title.toString());
                    storyData[i].AuthorName = $sce.trustAsHtml (storyData[i].AuthorName.toString());
                    storyData[i].Description = $sce.trustAsHtml (storyData[i].Description.toString());
            
                    if(storyData[i].AuthorName != "" ){
                        storyData[i].AuthorName = storyData[i].AuthorName + " , ";
                    }
                    storyData[i].AgencyName = $sce.trustAsHtml (storyData[i].AgencyName.toString());
                    
                    var values = storyData[i].PubDate.split('T')[0].split('-');
                    storyData[i].pubDateDay = values[2];
                    storyData[i].pubDateMonth = months[parseInt(values[1])];
                    storyData[i].pubDateYear = values[0];
                }
                $scope.stories = storyData;
                $scope.$apply();
            }); 
        }
        
        $scope.getWeekData = function(){
            var date1 = moment().format().split('T')[0];
            var date2 = moment().subtract(7,'days').format().split('T')[0];
            $.get('http://localhost:8000/api/stories?range='+date1+','+date2,function(data){
                storyData = data.json; 
                for (var i = 0; i < storyData.length; i++) {
                    storyData[i].Title = $sce.trustAsHtml (storyData[i].Title.toString());
                    storyData[i].AuthorName = $sce.trustAsHtml (storyData[i].AuthorName.toString());
                    storyData[i].Description = $sce.trustAsHtml (storyData[i].Description.toString());
            
                    if(storyData[i].AuthorName != "" ){
                        storyData[i].AuthorName = storyData[i].AuthorName + " , ";
                    }
                    storyData[i].AgencyName = $sce.trustAsHtml (storyData[i].AgencyName.toString());

                    var values = storyData[i].PubDate.split('T')[0].split('-');
                    storyData[i].pubDateDay = values[2];
                    storyData[i].pubDateMonth = months[parseInt(values[1])];
                    storyData[i].pubDateYear = values[0];
                }
                $scope.stories = storyData;
                $scope.$apply();
            }); 
        }
        
        $scope.getMonthData = function(){
            var date1 = moment().format().split('T')[0];
            var date2 = moment().subtract(30,'days').format().split('T')[0];
            $.get('http://localhost:8000/api/stories?range='+date1+','+date2,function(data){
                storyData = data.json; 
                for (var i = 0; i < storyData.length; i++) {
                    storyData[i].Title = $sce.trustAsHtml (storyData[i].Title.toString());
                    storyData[i].AuthorName = $sce.trustAsHtml (storyData[i].AuthorName.toString());
                    storyData[i].Description = $sce.trustAsHtml (storyData[i].Description.toString());
            
                    if(storyData[i].AuthorName != "" ){
                        storyData[i].AuthorName = storyData[i].AuthorName + " , ";
                    }
                    storyData[i].AgencyName = $sce.trustAsHtml (storyData[i].AgencyName.toString());
                    
                    var values = storyData[i].PubDate.split('T')[0].split('-');
                    storyData[i].pubDateDay = values[2];
                    storyData[i].pubDateMonth = months[parseInt(values[1])];
                    storyData[i].pubDateYear = values[0];
                }
                $scope.stories = storyData;
                $scope.$apply();
            }); 
        }
        
        $scope.searchAuthor = function(author){
            $scope.searchFilter = 'Author';
            $('#menu li').removeClass('active');
            $('#li-SEARCH').addClass('active');
            $('#div-search').removeClass('hide');
            $scope.searchValue="";
            $scope.stories = {};
            $scope.searchValue= author.split(',')[0].trim();
            $scope.getSearchData($scope.searchValue);
        }
        
        $scope.searchAgency = function(agency){
            $scope.searchFilter = 'Agency';
            $('#menu li').removeClass('active');
            $('#li-SEARCH').addClass('active');
            $('#div-search').removeClass('hide');
            $scope.searchValue="";
            $scope.stories = {};
            $scope.searchValue = agency;
            $scope.getSearchData($scope.searchValue);
        }
        
    }]);

app.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 2,
                dateFormat: "yy-mm-dd",
                onClose: function( selectedDate ) {
                    console.log(selectedDate);
                }
            });
        }
    };
});


function setLiActiveClass(li){
    $('#menu li').removeClass('active');
    $('#li-'+li).addClass('active');
}
