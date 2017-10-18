angular.module('servproj').controller('mealsOrderedCtrl', function($scope, mealsOrderedSrvc, $http, $window){



mealsOrderedSrvc.getOrderedMeals().then(response => {
  $scope.orderedMeals = response.data;
})


// $scope.getMeals  =
//   mainSrvc.getMeals().then(response => {
//     $scope.meals = response.data
//     console.log(response.data);
//   })

// $scope.getCurrentMeal = function(id) {
//   return $http.get('/current/meal/?id='+id).then(function(res) {
//     // $scope.currentMeal = res.data[0];
//     return res.data[0];
//   })
// }
// if ($scope.id){
// $scope.getCurrentMeal($scope.id).then(response => {
//   console.log(response)
//   $scope.currentMeal = response;
// })
// }



})
