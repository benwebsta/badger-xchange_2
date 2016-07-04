// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('badger-xchange', ['ionic', 'firebase', 'ngSanitize', 'ngCordovaOauth']);
var ref = new Firebase("https://badger-xchange.firebaseio.com");
//var authObject = null;
//var ref = new Firebase("https://badger-xchange.firebaseio.com");

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    //banner ad
    if(window.plugins && window.plugins.AdMob) {
                var admob_key = device.platform == "Android" ? "ANDROID_PUBLISHER_KEY" : "ca-app-pub-8780946757864821/6248315999";
                var admob = window.plugins.AdMob;
                admob.createBannerView( 
                    {
                        'publisherId': admob_key,
                        'adSize': admob.AD_SIZE.BANNER,
                        'bannerAtTop': false
                    }, 
                    function() {
                        admob.requestAd(
                            { 'isTesting': false }, 
                            function() {
                                admob.showAd(true);
                            }, 
                            function() { console.log('failed to request ad'); }
                        );
                    }, 
                    function() { console.log('failed to create banner view'); }
                );
    }
    ref = new Firebase("https://badger-xchange.firebaseio.com");
  });
})
app.config(function($stateProvider, $urlRouterProvider) {
$stateProvider
.state('tabs', {
  url: "/tabs",
  abstract: true,
  templateUrl: "templates/tabs.html"
})
.state('tabs.housing', {
  url: "/housing",
  views: {
    'housing2': {
      templateUrl: "templates/housing.html",
      controller: "housingItemController"
    }
  }
})
.state('tabs.books', {
  url: "/books",
  views: {
    'books2': {
      templateUrl: "templates/books.html",
      controller: "bookItemController"
    }
  }
})
.state('tabs.tickets', {
  url: "/tickets",
  views: {
    'tickets2': {
      templateUrl: "templates/tickets.html",
      controller: "ticketItemController"
    }
  }
})
.state('tabs.manageHousing', {
  url: '/manageHousing',
  views: {
    housing2: {
      templateUrl: 'templates/manageHousing.html',
      controller: "manageHousingController"
    }
  }
})
.state('tabs.editHousing', {
  url: '/editHousing',
  views: {
    housing2: {
      templateUrl: 'templates/editHousing.html'
    }
  }
})
.state('tabs.viewHousing', {
  url: '/viewHousing', 
      params: {
        'name': 'default',
        'startDate': 'default start date',
        'endDate': 'default end date',
        'price': 'default price',
        'desc': 'default description',
		    'ID': 'default id'
      }, 
  views: {
    housing2: {
      templateUrl: 'templates/viewHousing.html',
      controller: "viewHousingController"
    }
  }
})
.state('tabs.viewBooks', {
  url: '/viewBooks', 
      params: {
        'name': 'default',
        'startDate': 'default start date',
        'endDate': 'default end date',
        'price': 'default price',
        'desc': 'default description',
        'ID': 'default id'
      }, 
  views: {
    books2: {
      templateUrl: 'templates/viewBooks.html',
      controller: "viewBooksController"
    }
  }
})
.state('tabs.viewTickets', {
  url: '/viewTickets', 
      params: {
        'name': 'default',
        'startDate': 'default start date',
        'endDate': 'default end date',
        'price': 'default price',
        'desc': 'default description',
        'ID': 'default id'
      }, 
  views: {
    tickets2: {
      templateUrl: 'templates/viewTickets.html',
      controller: "viewTicketsController"
    }
  }
})
.state('tabs.postHousing', {
  url: '/postHousing',
  views: {
    housing2: {
      templateUrl: 'templates/postHousing.html',
      controller: "postHousingController"
    }
  }
})
.state('tabs.postBooks', {
  url: '/postBooks',
  views: {
    books2: {
      templateUrl: 'templates/postBooks.html',
      controller: 'postBookController'
    }
  }
})
.state('tabs.editBook', {
  url: '/editBook',
  views: {
    books2: {
      templateUrl: 'templates/editBook.html'
    }
  }
})
.state('tabs.manageBooks', {
  url: '/manageBooks',
  views: {
    books2: {
      templateUrl: 'templates/manageBooks.html',
      controller: 'manageBooksController'
    }
  }
})
.state('tabs.postTickets', {
  url: '/postTickets',
  views: {
    tickets2: {
      templateUrl: 'templates/postTickets.html',
      controller: "postTicketController"
    }
  }
})
.state('tabs.manageTickets', {
  url: '/manageTickets',
  views: {
    tickets2: {
      templateUrl: 'templates/manageTickets.html',
      controller: "manageTicketsController"
    }
  }
})
.state('tabs.editTicket', {
  url: '/editTicket',
  views: {
    tickets2: {
      templateUrl: 'templates/editTicket.html'
    }
  }
})
.state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginController'
  })
  $urlRouterProvider.otherwise("/login");
})
.factory("Auth", function($firebaseAuth) {
  var usersRef = new Firebase("https//badger-xchange.firebaseio.com/users");
  return $firebaseAuth(usersRef);
})
var UserID = null;
app.controller("loginController", function($scope, $state, $firebaseAuth, $location, $cordovaOauth, Auth) {
    $scope.changeState=function(theState){
      $state.go(theState);
    }
    $scope.loginFacebook = function() {
      Auth.$authWithOAuthPopup('facebook').then(function(authData) {
        UserID = authData;
        $state.go('tabs.housing');
        }).catch(function(error) {
          if (error.code === 'TRANSPORT_UNAVAILABLE') {
            console.log("transport unavail");
            console.log(error)
            Auth.$authWithOAuthPopup('facebook').then(function(authData) {
              $state.go('tabs.housing');
            });
          }
          else 
          {
            console.log(error);
          }
      });
    };
});
app.factory("Housing", function($firebaseArray) {
  var itemsRef = new Firebase("https://badger-xchange.firebaseio.com/housing");
  return $firebaseArray(itemsRef);
})
app.factory("Books", function($firebaseArray) {
  var itemsRef = new Firebase("https://badger-xchange.firebaseio.com/books");
  return $firebaseArray(itemsRef);
})
app.factory("Tickets", function($firebaseArray) {
  var itemsRef = new Firebase("https://badger-xchange.firebaseio.com/tickets");
  return $firebaseArray(itemsRef);
})

app.factory("postHouse", function() {
  items = {};
  items.name = '';
  items.startDate = '';
  items.endDate = '';
  items.price = '';
  items.desc = '';
  return items;
})
app.factory("postBook", function() {
  items = {};
  items.name = '';
  items.startDate = '';
  items.endDate = '';
  items.price = '';
  items.desc = '';
  return items;
})
app.factory("postTicket", function() {
  items = {};
  items.name = '';
  items.startDate = '';
  items.endDate = '';
  items.price = '';
  items.desc = '';
  return items;
})
var clickedID = null;
app.controller('postHousingController', function($scope, $state, Housing, postHouse, $window) {
  $scope.items = Housing;
  $scope.postHousingClick = function(name, startDate, endDate, price, desc) {
    console.log("testing");
    postHouse.name = name;
    postHouse.startDate = startDate;
    postHouse.endDate = endDate;
    postHouse.price = price;
    postHouse.desc = desc;
    $scope.input = postHouse;
    $scope.items.$add({
       "title": $scope.input.name,
        "startDate": $scope.input.startDate,
        "endDate": $scope.input.endDate,
        "price": $scope.input.price,
        "desc": $scope.input.desc,
        "ID": UserID.uid.substr(9),
        "username": UserID.facebook.displayName,
        "facebookID": UserID.facebook.id
    });
    $state.go('tabs.housing');
  };
});
var inAppBrowserRef = undefined;
var clickedID = null;
app.controller('viewHousingController', function($scope, $state, $stateParams, $timeout) {
  $timeout(function() {
      $scope.nameId = $stateParams.name;
      $scope.startDateId = $stateParams.startDate;
      $scope.endDateId = $stateParams.endDate;
      $scope.priceId = $stateParams.price;
      $scope.descId = $stateParams.desc;
	    $scope.ID = $stateParams.ID;
	    clickedID = $stateParams.ID;
  }, 0);
  $scope.facebookMessage = function(){
    var tempFacebook = 'https://facebook.com/' + clickedID;
    inAppBrowserRef = window.open(tempFacebook);
  };
});
app.controller('viewBooksController', function($scope, $state, $stateParams, $timeout) {
  $timeout(function() {
      $scope.nameId = $stateParams.name;
      $scope.startDateId = $stateParams.startDate;
      $scope.endDateId = $stateParams.endDate;
      $scope.priceId = $stateParams.price;
      $scope.descId = $stateParams.desc;
      $scope.ID = $stateParams.ID;
      clickedID = $stateParams.ID;
  }, 0);
  $scope.facebookMessage = function(){
    var tempFacebook = 'https://facebook.com/' + clickedID;
    inAppBrowserRef = window.open(tempFacebook);
  };
});

app.controller('viewTicketsController', function($scope, $state, $stateParams, $timeout) {
  $timeout(function() {
      $scope.nameId = $stateParams.name;
      $scope.startDateId = $stateParams.startDate;
      $scope.endDateId = $stateParams.endDate;
      $scope.priceId = $stateParams.price;
      $scope.descId = $stateParams.desc;
      $scope.ID = $stateParams.ID;
      clickedID = $stateParams.ID;
  }, 0);
  $scope.facebookMessage = function(){  
    var tempFacebook = 'https://facebook.com/' + clickedID;
    inAppBrowserRef = window.open(tempFacebook);
  };
});
app.factory("Housing2", function($firebaseArray) {
  var itemsRef = new Firebase("https://badger-xchange.firebaseio.com/housing");
  var refReturn;
  itemsRef.orderByChild('facebookID').equalTo(UserID.facebook.id).on('value', function(snapshot) {
      refReturn = snapshot.val();
  });
  return refReturn;
})
app.factory("Books2", function($firebaseArray) {
  var itemsRef = new Firebase("https://badger-xchange.firebaseio.com/books");
  var refReturn;
  itemsRef.orderByChild('facebookID').equalTo(UserID.facebook.id).on('value', function(snapshot) {
      refReturn = snapshot.val();
  });
  return refReturn;
})
app.factory("Tickets2", function($firebaseArray) {
  var itemsRef = new Firebase("https://badger-xchange.firebaseio.com/tickets");
  var refReturn;
  itemsRef.orderByChild('facebookID').equalTo(UserID.facebook.id).on('value', function(snapshot) {
      refReturn = snapshot.val();
  });
  return refReturn;
})
app.controller('manageHousingController', function($scope, $state, Housing2, Housing, postHouse, $window, $firebaseArray, $timeout, $ionicPopup) {
  var itemsRef = new Firebase("https://badger-xchange.firebaseio.com/housing");
  var refReturn;
  itemsRef.orderByChild('facebookID').equalTo(UserID.facebook.id).on('value', function(snapshot) {
      $scope.items = snapshot.val();
  });
  angular.forEach($scope.items,function(value, key) {
    value.fireBaseKey = key;
  });
  $scope.shouldShowDelete = true;
  $scope.itemInfo = function(index) {
    var messagesRef = new Firebase("https://badger-xchange.firebaseio.com/housing");
    $scope.messages = $firebaseArray(messagesRef);
    var id = $scope.items[index].$id;
    var item;
    $scope.messages.$loaded()
    .then(function() {
      item = $scope.messages.$getRecord(id);
      $state.go('tabs.viewHousing', {'name': item.title, 'startDate': item.startDate, 
                              'endDate': item.endDate, 'price': item.price, 'desc': item.desc, 'ID': item.ID});
    })
    .catch(function(err) {
      console.error(err);
    });
  }
  $scope.remove = function(index) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Delete Housing Post',
     template: 'Are you sure you want to delete this post?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       var deleteFirebaseRef = new Firebase("https://badger-xchange.firebaseio.com/housing/"+ index.fireBaseKey);
       deleteFirebaseRef.remove();
     }
   });
  }
})
app.controller('housingItemController', function($scope, $state, Housing, postHouse, $window, $firebaseArray, $timeout) {
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
                              'endDate': item.endDate, 'price': item.price, 'desc': item.desc, 'ID':item.ID});
    })
    .catch(function(err) {
      console.error(err);
    });
  }
  $scope.facebooklogout = function() {
    ref.unauth();
    $scope.user = null;
    UserID = null;
    $state.go('login');
  }
});
app.controller('bookItemController', function($scope, $state, Books, postBook, $window, $firebaseArray, $timeout) {
  $scope.items = Books;
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
  $scope.facebooklogout = function() {
    ref.unauth();
    $scope.user = null;
    UserID = null;
    $state.go('login');
  }
});
var clickedID = null;
app.controller('postBookController', function($scope, $state, Books, postBook, $window) {
  $scope.items = Books;
  $scope.postBookClick = function(name, startDate, endDate, price, desc) {
    postBook.name = name;
    postBook.startDate = startDate;
    postBook.endDate = endDate;
    postBook.price = price;
    postBook.desc = desc;
    $scope.input = postBook;
    console.log($scope.input.name);
    console.log($scope.input.startDate);
    console.log($scope.input.endDate);
    console.log($scope.input.price);
    console.log($scope.input.desc);
      $scope.items.$add({
       "title": $scope.input.name,
        "startDate": $scope.input.startDate,
        "endDate": $scope.input.endDate,
        "price": $scope.input.price,
        "desc": $scope.input.desc,
        "ID": UserID.uid.substr(9),
        "username": UserID.facebook.displayName,
        "facebookID": UserID.facebook.id
    });
    $state.go('tabs.books');
  };
  $scope.facebookMessage = function(){
    var tempFacebook = clickedID;
    $window.open('//facebook.com/' + tempFacebook);
  };
});
app.controller('manageBooksController', function($scope, $state, Books2, postBook, $window, $firebaseArray, $timeout, $ionicPopup) {
  var itemsRef = new Firebase("https://badger-xchange.firebaseio.com/books");
  var refReturn;
  itemsRef.orderByChild('facebookID').equalTo(UserID.facebook.id).on('value', function(snapshot) {
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
});
var clickedID = null;
app.controller('postTicketController', function($scope, $state, Tickets, postTicket, $window) {
  $scope.items = Tickets;
  $scope.postTicketClick = function(name, startDate, endDate, price, desc) {
    postTicket.name = name;
    postTicket.startDate = startDate;
    postTicket.endDate = endDate;
    postTicket.price = price;
    postTicket.desc = desc;
    $scope.input = postTicket;
      $scope.items.$add({
       "title": $scope.input.name,
        "startDate": $scope.input.startDate,
        "endDate": $scope.input.endDate,
        "price": $scope.input.price,
        "desc": $scope.input.desc,
        "ID": UserID.uid.substr(9),
        "username": UserID.facebook.displayName,
        "facebookID": UserID.facebook.id
    });
    $state.go('tabs.tickets');
  };
  $scope.facebookMessage = function(){
    var tempFacebook = clickedID;
    $window.open('//facebook.com/' + tempFacebook);
  };
});
app.controller('manageTicketsController', function($scope, $state, Tickets2, postTicket, $window, $firebaseArray, $timeout, $ionicPopup) {
  var itemsRef = new Firebase("https://badger-xchange.firebaseio.com/tickets");
  var refReturn;
  itemsRef.orderByChild('facebookID').equalTo(UserID.facebook.id).on('value', function(snapshot) {
      $scope.items = snapshot.val();
  });
  angular.forEach($scope.items,function(value, key) {
    value.fireBaseKey = key;
  });
  $scope.shouldShowDelete = true;
  $scope.itemInfo = function(index) {
    var messagesRef = new Firebase("https://badger-xchange.firebaseio.com/tickets");
    $scope.messages = $firebaseArray(messagesRef);
    var id = $scope.items[index].$id;
    var item;
    $scope.messages.$loaded()
    .then(function() {
      item = $scope.messages.$getRecord(id);
      $state.go('tabs.viewTickets', {'name': item.title, 'startDate': item.startDate, 
                              'endDate': item.endDate, 'price': item.price, 'desc': item.desc, 'ID': item.ID});
    })
    .catch(function(err) {
      console.error(err);
    });
  }
   $scope.remove = function(index) {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Delete Ticket Post',
     template: 'Are you sure you want to delete this post?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       var deleteFirebaseRef = new Firebase("https://badger-xchange.firebaseio.com/tickets/"+ index.fireBaseKey);
       deleteFirebaseRef.remove();
     }
   });
  }
});
app.controller('ticketItemController', function($scope, $state, Tickets, postTicket, $window, $firebaseArray, $timeout) {
  $scope.items = Tickets;
  $scope.itemInfo = function(index) {
    var messagesRef = new Firebase("https://badger-xchange.firebaseio.com/tickets");
    $scope.messages = $firebaseArray(messagesRef);
    var id = $scope.items[index].$id;
    var item;
    $scope.messages.$loaded()
    .then(function() {
      item = $scope.messages.$getRecord(id);
      $state.go('tabs.viewTickets', {'name': item.title, 'startDate': item.startDate, 
                              'endDate': item.endDate, 'price': item.price, 'desc': item.desc, 'ID': item.ID});
    })
    .catch(function(err) {
      console.error(err);
    });
  }
  $scope.facebooklogout = function() {
    ref.unauth();
    $scope.user = null;
    UserID = null;
    $state.go('login');
  }
});