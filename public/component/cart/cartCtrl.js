angular.module('servproj').controller('cartCtrl', function($scope, mainSrvc, $http){


$scope.test = "shiva"

$scope.addToCart =
  mainSrvc.getMeals().then(response => {
    $scope.meals = response.data
    console.log(response);
  })

});
