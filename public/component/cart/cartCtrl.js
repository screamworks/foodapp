angular.module('servproj').controller('cartCtrl', function($scope, mainSrvc, $http){

  $scope.filledCart  =
    mainSrvc.filledCart().then(response => {
      $scope.cart = response.data
    })


  $scope.deleteFromCart = (mealIwantToRemoveFromCart) => {
    console.log(mealIwantToRemoveFromCart, "firing delete from CTRL")
    mainSrvc.deleteFromCart(mealIwantToRemoveFromCart)
  }

  


});
