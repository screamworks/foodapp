angular.module('servproj').config(($urlRouterProvider, $stateProvider) => {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/component/home/homeTmpl.html',
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
      templateUrl: '/component/login/loginTmpl.html',
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
      templateUrl: '/component/home/about.html',
      controller: 'mainCtrl'
    })



    .state('main', {
      url: '/menu',
      templateUrl: '/component/menu/main.html',
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
      templateUrl: '/component/menu/addMeal.html',
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
      templateUrl: '/component/menu/updatemeal.html',
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
      templateUrl: '/component/orders/mealsOrdered.html',
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
      templateUrl: '/component/cart/cart.html',
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
