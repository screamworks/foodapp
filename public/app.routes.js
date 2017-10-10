angular.module('servproj').config(($urlRouterProvider, $stateProvider) => {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './component/home/homeTmpl.html',
      controller: 'homeCtrl',
      resolve: {
        user: mainSrvc => mainSrvc.getUser()
          .then(response => response.data)
          .catch(err => err)
      }
    })


    .state('login', {
      url: '/login',
      templateUrl: './component/login/loginTmpl.html',
      controller: 'mainCtrl'
    })


    .state('main', {
      url: '/menu',
      templateUrl: './component/menu/main.html',
      resolve: {
          user: (mainSrvc) => {
            mainSrvc.getUser()
            .then(response => {return response.data})
          }
      }
    })

    .state('addMeal', {
      url: '/addmeal',
      templateUrl: './component/menu/addMeal.html',
      controller: 'mainCtrl'
    })

});
