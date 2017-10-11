angular.module('servproj').controller('mainCtrl', function (mainSrvc, $interval, $scope, $http){


$scope.id = 4 //$stateParam Value;

$scope.getCurrentMeal = function(id) {
  console.log('fired');
  return $http.get('/current/meal/?id='+id).then(function(res) {
    console.log(res);
    $scope.currentMeal = res.data[0];
  })
}
$scope.getCurrentMeal($scope.id);

//Somehow get access to the user ID

// Get  everything to talk to eachother
// Get access to the user id



// let userInfo = user.authid

//Controllers
$scope.getMeals  =
  mainSrvc.getMeals().then(response => {
    console.log(response.data);
    $scope.meals = response.data
  })





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
const getMeals = (req,res) => {
  console.log(req.body)
  const db = req.app.get('db');
    db.getMeals(req.body)
    .then(response => {
    console.log(response)
    return res.json(response)
})
}

// DB
// $interval(()=>{
//   $scope.mealCost = !$scope.mealCost
// },1000)

// SELECT * FROM addmeal WHERE authid = $1

//




  $scope.submit = (mealName, mealCost, description, vegan, vegetarian, nonVeg, glutenFree, soy, nuts, schedule, image) => {
    mainSrvc.createMeal(mealName, mealCost, description, vegan, vegetarian, nonVeg, glutenFree, soy, nuts, schedule, image)
      }






// test code - control
  $scope.updatemeal = () => {
    var currentMeal = $scope.currentMeal;
    var meal = {
      mealName: $scope.mealName,
      mealCost: $scope.mealCost || null,
      description: $scope.description || null,
      vegan: $scope.vegan || null,
      vegetarian: $scope.vegetarian || null,
      nonveg: $scope.nonveg || null,
      gluetenfree: $scope.glutenfree || null,
      soy: $scope.soy || null,
      nuts: $scope.nuts || null,
      schedule: $scope.schedule || null,
      image: $scope.image || null,
    };
    // console.log(meal)
    mainSrvc.updatemeal(meal, currentMeal)
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



})
