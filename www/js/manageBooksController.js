app.controller('manageBooksController', 
  ["$scope", "$state", "Books2", "postBook", "$window", "$firebaseArray", "$timeout", "$ionicPopup", "userIdFactory",
  function($scope, $state, Books2, postBook, $window, $firebaseArray, $timeout, $ionicPopup, userIdFactory) {
  var itemsRef = new Firebase("https://badger-xchange.firebaseio.com/books");
  var refReturn;
  itemsRef.orderByChild('facebookID').equalTo(userIdFactory.UserID.facebook.id).on('value', function(snapshot) {
      $scope.items = snapshot.val();
  });
    angular.forEach($scope.items,function(value, key) {
    value.fireBaseKey = key;
  });
  $scope.shouldShowDelete = true;
  $scope.itemInfo = function(index) {
    var messagesRef = new Firebase("https://badger-xchange.firebaseio.com/books");
    $scope.messages = $firebaseArray(messagesRef);
    var id = $scope.items[index].$id;
    var item;
    $scope.messages.$loaded()
    .then(function() {
      item = $scope.messages.$getRecord(id);
      $state.go('tabs.viewBooks', {'name': item.title, 'startDate': item.startDate, 
                              'endDate': item.endDate, 'price': item.price, 'desc': item.desc, 'ID': item.ID});
    })
    .catch(function(err) {
      console.error(err);
    });
  }
  $scope.remove = function(index) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Delete Book Post',
     template: 'Are you sure you want to delete this post?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       var deleteFirebaseRef = new Firebase("https://badger-xchange.firebaseio.com/books/"+ index.fireBaseKey);
       deleteFirebaseRef.remove();
     }
   });
  }
}]);