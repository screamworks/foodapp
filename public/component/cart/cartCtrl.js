angular.module('servproj').controller('cartCtrl', function($scope, mainSrvc, $http, $window){

$scope.deleteFromCart = (mealIwantToRemoveFromCart) => {
    console.log(mealIwantToRemoveFromCart, "firing delete from CTRL")
    mainSrvc.deleteFromCart(mealIwantToRemoveFromCart)
  }


mainSrvc.getCurrentCart().then(response => {
console.log(response)
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
        total: $scope.final * 100,
        }
        appSrv.makePayment(payload).then(function(response) {
        console.log(response);
       });
       }
       });
       handler.open({
            name: 'ParMeal',
            description: "Meal-Solutions",
            amount: $scope.final * 100
        });
}






























})






















});
