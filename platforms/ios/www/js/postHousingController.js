app.controller('postHousingController', 
    ["$scope", "$state", "Housing", "postHouse", "$window", "userIdFactory", "$ionicPopup", "$ionicPopover", "$filter",
function($scope, $state, Housing, postHouse, $window, userIdFactory, $ionicPopup, $ionicPopover, $filter) {
  $scope.items = Housing;
  $scope.postHousingClick = function(name, startDate, endDate, price, desc, washingMachine, dryer, pool, gym, gas, water, electric, cable, wifi, dishwasher, balcony) {
    if(isNaN(price)) {
        var alertPopup = $ionicPopup.alert({
            title: 'Error processing form.',
            template: 'Please make sure your price is a number. No special characters; numbers only.'
        });
    }
    else{
        if(name == null || startDate == null || endDate == null || price == null || desc == null){
            $scope.formError = true;
        }
        else{
            if(washingMachine == null){
                washingMachine = false;
            }
            if(dryer == null){
                dryer = false;
            }
            var date1 = $filter('date')(new Date(startDate), 'dd/MM/yyyy');
            var startDate = date1.toString();
            var date2 = $filter('date')(new Date(endDate), 'dd/MM/yyyy');
            var endDate = date2.toString();
            postHouse.name = name;
            postHouse.startDate = startDate;
            postHouse.endDate = endDate;
            postHouse.price = price;
            postHouse.desc = desc;
            postHouse.washingMachine = washingMachine;
            postHouse.dryer = dryer;
            postHouse.pool = pool;
            postHouse.gym = gym;
            postHouse.gas = gas;
            postHouse.water = water;
            postHouse.electric = electric;
            postHouse.cable = cable;
            postHouse.wifi = wifi;
            postHouse.dishwasher = dishwasher;
            postHouse.balcony = balcony;
            $scope.input = postHouse;
            $scope.items.$add({
                "title": $scope.input.name,
                "startDate": $scope.input.startDate,
                "endDate": $scope.input.endDate,
                "price": $scope.input.price,
                "desc": $scope.input.desc,
                "ID": userIdFactory.UserID.uid.substr(9),
                "username": userIdFactory.UserID.facebook.displayName,
                "facebookID": userIdFactory.UserID.facebook.id,
                "washingMachine": $scope.input.washingMachine,
                "dryer": $scope.input.dryer,
                "pool": $scope.input.pool,
                "gym": $scope.input.gym,
                "gas": $scope.input.gas,
                "water": $scope.input.water,
                "electric": $scope.input.electric,
                "cable": $scope.input.cable,
                "wifi": $scope.input.wifi,
                "dishwasher": $scope.input.dishwasher,
                "balcony": $scope.input.balcony
            });
            $state.go('tabs.housing');
        }
    }
  };
}]);