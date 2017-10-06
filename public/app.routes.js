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
});
