angular.module('servproj').service('mainSrvc', function($http) {
    // you can use this function for every request to get user.
    // don't write new versions of this in every service, keep it DRY

    this.createMeal = (mealName, mealCost, description, vegan, vegetarian, nonVeg, glutenFree, soy, nuts, schedule, image) => {
      console.log(image)
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


          // testing
            this.downloadURL = downloadURL
      // $scope.downloadURL = downloadURL
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
      console.log('service');
      return $http.get('/api/menu').then(response => {
      console.log(response.data)
        return response;
      })
    }


    this.updatemeal = (meal, currentMeal) => {
      console.log(meal);
        id = currentMeal.id;
        mealName = meal.mealName;
        if(!mealName){ mealName = currentMeal.mealname;}
        mealCost = meal.mealCost;
        if(!mealCost){ mealCost = currentMeal.mealcost;}
        mealDesc = meal.description;
        if(!mealDesc){ mealDesc = currentMeal.description;}
        vegan =  meal.vegan;
        if(!vegan){ vegan = currentMeal.vegan}
        vegetarian = meal.vegetarian;
        if(!vegetarian ){ vegetarian = currentMeal.vegetarian;}
        nonVeg = meal.nonVeg;
        if(!nonVeg){ nonVeg = currentMeal.nonveg;}
        glutenFree = meal.glutenfree;
        if(!glutenFree){ glutenFree = currentMeal.glutenfree;}
        soy = meal.soy;
        if(!soy){ soy = currentMeal.soy;}
        nuts = meal.nuts;
        if(!nuts){ nuts = currentMeal.nuts;}
        schedule = meal.schedule;
        if(!schedule){ schedule = currentMeal.schedule;}
        image =  meal.image;
        if(!image){ image = currentMeal.image;}

      return $http.put('/api/updatemeal', { id, mealName, mealCost, mealDesc, vegan, vegetarian, nonVeg, glutenFree, soy, nuts, schedule, image  }).then(response => {
        console.log(response)
        return response
      })
    }



});
