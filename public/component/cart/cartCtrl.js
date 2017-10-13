angular.module('servproj').controller('cartCtrl', function($scope, mainSrvc, $http){

  $scope.filledCart  =
    mainSrvc.filledCart().then(response => {
      $scope.cart = response.data
      console.log(response, "hello, i'm cart from CTRL");
    })




});
