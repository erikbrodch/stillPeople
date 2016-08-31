app.factory('mainService', ['$http', function ($http) {
  var peopleData = {
    allPeople: []
  };
  //get all people to the view from DB
    peopleData.getAll = function () {
    return $http.get('/allPeople').success(function (data) {

        angular.copy(data, peopleData.allPeople); 
    });
    };

 

  return peopleData;
}]);