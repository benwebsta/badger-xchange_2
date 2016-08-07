app.controller('viewHousingController', 
  ["$scope", "$state", "$stateParams", "$timeout",
  function($scope, $state, $stateParams, $timeout) {
  $timeout(function() {
      $scope.nameId = $stateParams.name;
      $scope.startDateId = $stateParams.startDate;
      $scope.endDateId = $stateParams.endDate;
      $scope.priceId = $stateParams.price;
      $scope.descId = $stateParams.desc;
	    $scope.ID = $stateParams.ID;
      $scope.washingMachineId = $stateParams.washingMachine;
      $scope.dryerId = $stateParams.dryer;
      $scope.poolId = $stateParams.pool;
      $scope.gymId = $stateParams.gym;
      $scope.gasId = $stateParams.gas;
      $scope.waterId = $stateParams.water;
      $scope.electricId = $stateParams.electric;
      $scope.cableId = $stateParams.cable;
      $scope.wifiId = $stateParams.wifi;
      $scope.dishwasherId = $stateParams.dishwasher;
      $scope.balconyId = $stateParams.balcony;
	    clickedID = $stateParams.ID;

  }, 0);
  $scope.facebookMessage = function(){
    var tempFacebook = 'https://facebook.com/' + clickedID;
    inAppBrowserRef = window.open(tempFacebook, '_system', 'location=yes');
  };
}]);