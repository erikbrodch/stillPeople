app.controller('MainCtrl', ['$scope','mainService', '$http',function($scope, mainService, $http){

 var getAllFromContrl = function() { mainService.getAll().then(function () {
    $scope.allPeople = mainService.allPeople; 

  });
 }
  
setInterval(getAllFromContrl, 10000)

    $scope.stolenBy = function(person){
      if(person.stolenBy!== "UD"){
        return {
          'color':"red"
        }
      }
    }

      $scope.showStolen = function(person){
      if(person.stolenBy === "UD"){
        return false;
      }
      return true
    }

    //still from others
    $scope.stillPerson = function(){
      var newVictimUrl = $scope.url;
      console.log(newVictimUrl);
      mainService.stillPerson(newVictimUrl);
    }



}]);



