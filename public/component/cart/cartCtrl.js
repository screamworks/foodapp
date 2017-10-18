angular.module('servproj').controller('cartCtrl', function($scope, mainSrvc, $http, $window){

$scope.deleteFromCart = (mealIwantToRemoveFromCart) => {
    console.log(mealIwantToRemoveFromCart, "firing delete from CTRL")
    mainSrvc.deleteFromCart(mealIwantToRemoveFromCart)
  }


mainSrvc.getCurrentCart().then(response => {
$scope.getCurrentCart = response.data;


///// TEST CODE FOR STRIPE API
$scope.reload = () => {
        $window.location.reload();
}

$scope.openPayment = function(name, desc) {
        var handler = window.StripeCheckout.configure({
        key: 'pk_test_xeg5ieFmQA8ip3yfOfHR14l6',
        locale: 'auto',
        token: function(token) {
        var payload = {
        token: token,
        total: $scope.total * 100,
        }
        mainSrvc.makePayment(payload).then(function(response) {
        console.log(response);
       });
       }
       });
       handler.open({
            name: 'ParMeal',
            description: "Meal-Solutions",
            amount: $scope.total * 100
        });
}

$scope.totalPrice = function(getCurrentCart){
  $scope.total = 0;
  getCurrentCart.forEach(item => {
    $scope.total += item.mealcost;
  })
  console.log("total:", $scope.getCurrentCart)
  return $scope.total;
}

$scope.totalPrice($scope.getCurrentCart);


})































});
