app.controller('MainCtrl', ['$scope','mainService', '$http',function($scope, mainService, $http){

 var getAllFromContrl = function() { mainService.getAll().then(function () {
    $scope.allPeople = mainService.allPeople;
  });
 }
  
setInterval(getAllFromContrl, 10000)
  mainService.getAll().then(function () {
    $scope.allPeople = mainService.allPeople;
  });

}]);