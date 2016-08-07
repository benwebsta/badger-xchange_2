app.controller('housingItemController', 
	["$scope", "$state", "Housing", "postHouse", "$window", "$firebaseArray", "$timeout", "$ionicPopup", "userIdFactory", 
 function($scope, $state, Housing, postHouse, $window, $firebaseArray, $timeout, $ionicPopup, userIdFactory) {
  $scope.priceCap = 0;
  $scope.data = {
    priceCap : 2000
  }
  $scope.items = Housing;
  $scope.itemInfo = function(index) {
    var messagesRef = new Firebase("https://badger-xchange.firebaseio.com/housing");
    $scope.messages = $firebaseArray(messagesRef);
    var id = $scope.items[index].$id;
    var item;
    $scope.messages.$loaded()
    .then(function() {
      item = $scope.messages.$getRecord(id);
      $state.go('tabs.viewHousing', {'name': item.title, 'startDate': item.startDate, 
                              'endDate': item.endDate, 'price': item.price, 'desc': item.desc, 
                              'ID':item.ID, 'washingMachine': item.washingMachine, 'dryer': item.dryer,
                              'pool':item.pool, 'gym':item.gym, 'gas':item.gas, 'water':item.water,
                              'electric':item.electric, 'cable':item.cable, 'wifi':item.wifi, 
                              'dishwahser':item.dishwasher, 'balcony':item.balcony});
    })
    .catch(function(err) {
      console.error(err);
    });
  }
  $scope.facebooklogout = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Logout',
     template: 'Are you sure you want to log out?'
   });
   confirmPopup.then(function(res) {
     if(res) {
        ref.unauth();
        $scope.user = null;
        userIdFactory.UserID = null;
        $state.go('login');
     }
   });
  }
  $scope.priceFilter = function(item) {
    var itemPrice = Number(item.price);
    $scope.priceCap = $scope.data.priceCap;
    var cap = (itemPrice < $scope.priceCap);
    return (cap);
  }
}]);