angular.module('servproj').controller('mainCtrl', function (mainSrvc, $scope){


  $scope.submit = (mealName, mealCost, description, vegan, vegetarian, nonVeg, glutenFree, soy, nuts, schedule, image) => {
    mainSrvc.createMeal(mealName, mealCost, description, vegan, vegetarian, nonVeg, glutenFree, soy, nuts, schedule, image)
      }





})
