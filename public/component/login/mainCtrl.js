angular.module('servproj').controller('mainCtrl', function (mainSrvc, $scope){


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

// SELECT * FROM addmeal WHERE authid = $1

//




  $scope.submit = (mealName, mealCost, description, vegan, vegetarian, nonVeg, glutenFree, soy, nuts, schedule, image) => {
    mainSrvc.createMeal(mealName, mealCost, description, vegan, vegetarian, nonVeg, glutenFree, soy, nuts, schedule, image)
      }

  $scope.showUser = () => {
    mainSrvc.showUser()
  }



})
