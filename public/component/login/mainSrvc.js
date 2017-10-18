angular.module('servproj').service('mainSrvc', function($http, $state) {
    // you can use this function for every request to get user.
    // don't write new versions of this in every service, keep it DRY

    this.createMeal = (mealName, mealCost, description, vegan, vegetarian, nonVeg, glutenFree, soy, nuts, schedule, image, authid) => {
        console.log(authid, "createMealSrvce!")
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

        let uploadParams = [mealName, mealCost, description, vegan, vegetarian, nonVeg, glutenFree, soy, nuts, schedule, downloadURL, authid]

        this.downloadURL = downloadURL
        console.log(downloadURL, "done");
        $http.post('/addmeal', uploadParams).then(function() {
          $state.go('main');
        })
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



    this.deletePrepMeal = (current) => { // from mainCtrl IwantoDeleteMeal and currentmeal.id (nickname of CORE name: currentmeal.id)
      console.log('deleting a meal, from mainService, horrah!', current)
      return $http.delete('/api/deletePrepMeal/'+ current)
    }


    this.addToCart = (fname, fschedule, fmealcost, fid, fauthid) => {
      console.log('adding to cart from srvc', fname, fschedule, fmealcost, fid, fauthid)
      console.log('is it getting the AUTHID', fauthid)
      return $http.post('/api/addToCart/',{fname, fschedule, fmealcost, fid, fauthid})
    }


    // this.filledCart = () => {
    //   return $http.get('/api/cart').then(response => {
    //         return response;
    //   })
    // }


    this.deleteFromCart = (mealIwantToRemoveFromCart) => {
      console.log(mealIwantToRemoveFromCart, "deleting from SRVC")
      return $http.delete('/api/deleteFromCart/'+ mealIwantToRemoveFromCart)
    }


    this.getCurrentCart = () => {
      return $http.get('/current/cart').then(response => {
        return response;
      })
    }


    this.makePayment = function(payload) {
        return $http.post('/api/payment', payload);
    }




    this.cartToOrder = function(getCurrentCart){
      return $http.post('/api/cartToOrder', getCurrentCart)
    }
    // this.cartToOrder = (mn, q, fid, aid, mc) => {
    //   console.log(mn, q, fid, aid, mc, "cart to order table mainSRVC")
    //   return $http.post('/api/cartToOrder', {mn, q, fid, aid, mc})
    // }

    // this.emptyCart = () => {
    //   console.log(getCurrentCart, "deleting cart from SRVC")
    //   return $http.delete('/api/emptyTotalCart/:id' + getCurrentCart.authid)
    // }
    this.emptyCart = function(){
      return $http.delete('/api/emptyTotalCart').then(function(response){
        console.log(response.data)
        return response.data;
      })
    }







});
