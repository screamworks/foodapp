angular.module('servproj').controller('mainCtrl', function (mainSrvc, $scope, $http, $stateParams){

// for stateParams - app.routes.js has id on its updateMeal state and ui-sref on view on main.html

$scope.id = $stateParams.id



$scope.getCurrentMeal = function(id) {
  return $http.get('/current/meal/?id='+id).then(function(res) {
    return res.data[0];
  })
}
if ($scope.id){
$scope.getCurrentMeal($scope.id).then(response => {
  console.log(response)
  $scope.currentMeal = response;
})
}



mainSrvc.getUser().then(response => {
  console.log(response.data.authid)
  $scope.authid = response.data.authid;
})

$scope.getMeals = function() {
    $http.get('/api/menu').then( function(res) {
      $scope.meals = res.data;
    })
  }

$scope.getMeals();




//Controllers
// $scope.getMeals  =
//   mainSrvc.getMeals().then(response => {
//     $scope.meals = response.data
//     console.log(response.data);
//   })


// console.log(meals);

// function getMeals(){
//   mainSrvc.getMeals().then(response => {
//     $scope.meals = response.data
//     console.log(response.data);
//   })
// }
//
// getMeals();






// views
// {{meals}}

//service
// this.getMeals = (id) => {
//   let mealParams = [id]
//   return $http.get('/api/meals', mealParams).then(response => {
//     return response
//   })
// }

//index.js

// app.get('/api/meals', mainCtrl.getMeals)

// mainCtrl


// DB
// $interval(()=>{
//   $scope.mealCost = !$scope.mealCost
// },1000)

// SELECT * FROM addmeal WHERE authid = $1

//




  $scope.submit = (mealName, mealCost, description, vegan, vegetarian, nonVeg, glutenFree, soy, nuts, schedule, image, authid) => {
    mainSrvc.createMeal(mealName, mealCost, description, vegan, vegetarian, nonVeg, glutenFree, soy, nuts, schedule, image, authid)
      }








// test code - control
  $scope.updatemeal = (updatedMeal) => {
    // const id = $stateParams.id
    // updatedMeal.id = id;
    console.log("newMeal with id: ", updatedMeal)
    mainSrvc.updatemeal(updatedMeal)
  }



$scope.deletePrepMeal = (mealIwantToDelete) => { // this mealIwantTOdelete is in update.html called currentMeal.id parameter of func
  console.log(mealIwantToDelete)
  mainSrvc.deletePrepMeal(mealIwantToDelete)
}

// mainSrvce - test Code
  // this.updateMeal = (id) => {
  //   return $http.put('/api/').then(response => {
  //     return response
  //   })
  // }


  // view -
  // {{update Meals}}

// indexjs

// app.put('/api/update', (req, res) => {
//   console.log('req.body')
//   const db = req.app.get('db');
//
//   db.updateMeal(req.body)
//   .then(response => {
//
//   console.log(response)
//   return res.json(response)
//     })
// })



//db

// updateMeal.sql = SELECT  * FROM addmeal WHERE id = $1;





$scope.addToCart = (fname, fschedule, fmealcost, fid, fauthid) => {
  console.log('adding to cart from CTRL', fname, fschedule, fmealcost, fid, fauthid)
  mainSrvc.addToCart(fname, fschedule, fmealcost, fid, fauthid)
}



 $scope.reloadPage = function(){window.location.reload();}



















})
