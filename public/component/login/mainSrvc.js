angular.module('servproj').service('mainSrvc', function($http) {
    // you can use this function for every request to get user.
    // don't write new versions of this in every service, keep it DRY

    this.createMeal = (mealName, price, mealDesc, vegan, veg, nonveg, glutenFree, soy, nuts, schedule, image) => {
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

      let uploadParams = [mealName, price, mealDesc, vegan, veg, nonveg, glutenFree, soy, nuts, schedule, image]
          console.log(downloadURL)
      $scope.downloadURL = downloadURL
      console.log(downloadURL, "done");
      return $http.post('/meals', uploadParams)
    });
    }

    this.getUser = () => $http.get('/auth/me');

    this.createUser = (user) => {
      console.log(user)
      return $http.post('/api/user/create', user);
    }








});
