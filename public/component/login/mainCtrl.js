angular.module('servproj').controller('mainCtrl', function (mainSrvc, $scope){


  $scope.submit = (mealName, price, mealDesc, vegan, veg, nonveg, glutenFree, soy, nuts, schedule, image) => {
    mainSrvc.createMeal(mealName, price, mealDesc, vegan, veg, nonveg, glutenFree, soy, nuts, schedule, image)
      }





})
