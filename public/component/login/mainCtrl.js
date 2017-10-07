angular.module('servproj').controller('mainCtrl', function (mainSrvc, $scope){


  $scope.submit = (file) => {
        console.log(file)
      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child('images/' + file.name).put(file);
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

        $scope.downloadURL = downloadURL
        console.log(downloadURL, "done");
      });
      }




})
