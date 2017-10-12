angular.module('servproj').service('mainSrvc', function($http) {
    // you can use this function for every request to get user.
    // don't write new versions of this in every service, keep it DRY

    this.createMeal = (mealName, mealCost, description, vegan, vegetarian, nonVeg, glutenFree, soy, nuts, schedule, image) => {

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child('images/' + image.name).put(image);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {

      const downloadURL = uploadTask.snapshot.downloadURL;

      let uploadParams = [mealName, mealCost, description, vegan, vegetarian, nonVeg, glutenFree, soy, nuts, schedule, downloadURL]



      this.downloadURL = downloadURL
      console.log(downloadURL, "done");
      return $http.post('/addmeal', uploadParams)
    });
    }

    this.getUser = () => $http.get('/auth/me');

    this.createUser = (user) => {
      console.log(user)
      return $http.post('/api/user/create', user);
    }



    this.getMeals = () => {
      return $http.get('/api/menu').then(response => {
        return response;
      })
    }


    this.updatemeal = function(updatedmeal){
      console.log("mainsrv newMeal: ", updatedmeal)
      return $http.put('/api/updatemeal/', updatedmeal)
    }

    // this.deletePrepMeal = (mealIwantToDelete) => {
    //   console.log('deleting a meal, from mainService, horrah!', mealIwantToDelete)
    //   return $http.delete('/api/deletePrepMeal', mealIwantToDelete)
    // }

    this.deletePrepMeal = (current) => { // from mainCtrl IwantoDeleteMeal and currentmeal.id (nickname of CORE name: currentmeal.id)
      console.log('deleting a meal, from mainService, horrah!', current)
      return $http.delete('/api/deletePrepMeal/'+ current)
    }



    // mealName = meal.mealName;
    // if(!mealName){ mealName = newMeal.mealname;}
    //
    // mealCost = meal.mealCost;
    // if(!mealCost){ mealCost = newMeal.mealcost;}
    //
    // mealDesc = meal.description;
    // if(!mealDesc){ mealDesc = newMeal.description;}
    //
    // vegan =  meal.vegan;
    // if(!vegan){ vegan = newMeal.vegan}
    //
    // vegetarian = meal.vegetarian;
    // if(!vegetarian ){ vegetarian = newMeal.vegetarian;}
    //
    // nonVeg = meal.nonVeg;
    // if(!nonVeg){ nonVeg = newMeal.nonveg;}
    //
    // glutenFree = meal.glutenfree;
    // if(!glutenFree){ glutenFree = newMeal.glutenfree;}
    //
    // soy = meal.soy;
    // if(!soy){ soy = newMeal.soy;}
    //
    // nuts = meal.nuts;
    // if(!nuts){ nuts = newMeal.nuts;}
    //
    // schedule = meal.schedule;
    // if(!schedule){ schedule = newMeal.schedule;}
    //
    // image =  meal.image;
    // if(!image){ image = newMeal.image;}


});
