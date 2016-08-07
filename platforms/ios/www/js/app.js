// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('badger-xchange', ['ionic', 'firebase', 'ngSanitize', 'ngCordovaOauth']);
var ref = new Firebase("https://badger-xchange.firebaseio.com");
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
		    'ID': 'default id',
        'washingMachine': false,
        'dryer': false,
        'pool': false,
        'gym': false,
        'gas': false,
        'water': false,
        'electric': false,
        'cable': false,
        'wifi': false,
        'dishwasher': false,
        'balcony': false
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
app.factory("userIdFactory", function() {
  user = {};
  user.UserID = '';
  return user;
})
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
  items.washingMachine = '';
  items.dryer = '';
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
app.factory("Housing2", 
  ["$firebaseArray", "userIdFactory",
  function($firebaseArray, userIdFactory) {
  var itemsRef = new Firebase("https://badger-xchange.firebaseio.com/housing");
  var refReturn;
  itemsRef.orderByChild('facebookID').equalTo(userIdFactory.UserID.facebook.id).on('value', function(snapshot) {
      refReturn = snapshot.val();
  });
  return refReturn;
}])
app.factory("Books2", 
  ["$firebaseArray", "userIdFactory",
  function($firebaseArray, userIdFactory) {
  var itemsRef = new Firebase("https://badger-xchange.firebaseio.com/books");
  var refReturn;
  itemsRef.orderByChild('facebookID').equalTo(userIdFactory.UserID.facebook.id).on('value', function(snapshot) {
      refReturn = snapshot.val();
  });
  return refReturn;
}])
app.factory("Tickets2", 
  ["$firebaseArray", "userIdFactory",
  function($firebaseArray, userIdFactory) {
  var itemsRef = new Firebase("https://badger-xchange.firebaseio.com/tickets");
  var refReturn;
  itemsRef.orderByChild('facebookID').equalTo(userIdFactory.UserID.facebook.id).on('value', function(snapshot) {
      refReturn = snapshot.val();
  });
  return refReturn;
}])