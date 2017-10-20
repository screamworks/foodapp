angular.module('servproj').config(($urlRouterProvider, $stateProvider) => {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: __dirname + 'public/component/home/homeTmpl.html',
      controller: 'homeCtrl',
      resolve: {
        user: (mainSrvc, $state) => mainSrvc.getUser()
          .then(response => response.data)
          .catch(err =>
            err
          )
      }
    })


    .state('login', {
      url: '/login',
      templateUrl: __dirname + 'public/component/login/loginTmpl.html',
      controller: 'mainCtrl',
      resolve: {
        user: (mainSrvc, $state) => mainSrvc.getUser()
          .then(response => response.data)
          .catch(err =>
            $state.go('home')
          )
      }
    })



    .state('about', {
      url: '/about',
      templateUrl: __dirname + 'public/component/home/about.html',
      controller: 'mainCtrl'
    })



    .state('main', {
      url: '/menu',
      templateUrl: __dirname + 'public/component/menu/main.html',
      controller: 'mainCtrl',
      resolve: {
        getMeals($http) {
          return $http.get('/api/menu');
        },
          user: (mainSrvc, $state) => mainSrvc.getUser()
            .then(response => response.data)
            .catch(err =>
              $state.go('home')
            )
      }
    })

    .state('addMeal', {
      url: '/addmeal',
      templateUrl: __dirname + 'public/component/menu/addMeal.html',
      controller: 'mainCtrl',
      resolve: {
        user: (mainSrvc, $state) => mainSrvc.getUser()
          .then(response => response.data)
          .catch(err =>
            $state.go('home')
          )
      }
    })

    .state('updatemeal', {
      url: '/updatemeal/:id',
      templateUrl: __dirname + 'public/component/menu/updatemeal.html',
      controller: 'mainCtrl',
      resolve: {
        user: (mainSrvc, $state) => mainSrvc.getUser()
          .then(response => response.data)
          .catch(err =>
            $state.go('home')
          )
      }
    })

    .state('mealsOrdered', {
      url: '/mealsordered',
      templateUrl: __dirname + 'public/component/orders/mealsOrdered.html',
      controller: 'mealsOrderedCtrl',
      resolve: {
        user: (mainSrvc, $state) => mainSrvc.getUser()
          .then(response => response.data)
          .catch(err =>
            $state.go('home')
          )
      }
    })

    .state('cart', {
      url: '/cart',
      templateUrl: __dirname + 'public/component/cart/cart.html',
      controller: 'cartCtrl',
      resolve: {
        user: (mainSrvc, $state) => mainSrvc.getUser()
          .then(response => response.data)
          .catch(err =>
            $state.go('home')
          )
      }
    })


});
