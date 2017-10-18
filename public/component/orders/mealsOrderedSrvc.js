angular.module('servproj').service('mealsOrderedSrvc', function($http, $state) {


  this.getOrderedMeals = () => {
    return $http.get('/api/mealsOrdered').then(response => {
      console.log("hello from SRVCmeals", response)
      return response;

    })
  }







});
