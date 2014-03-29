/*
  Instantiate our module, the "root" of our Angular app.

  You would need to insure the javascript references for the other
  modules were referenced in the same page as this javascript file.
*/
var demo = angular.module('demo', ['ngRoute']);

/*
  Create a "global" value. We will inject this dependency
  into our directive controller below.

  This is just for simplicity sake, there are much more sophisticated
  ways to do this we'll cover later.
*/
demo.value('currentUser', {
    firstName: 'Brian',
    lastName: 'Demo'
  });

/*
  Configure our routes.

  AngularJS uses hash routing, so the URLs for the routes below
  would be:
  http://localhost:3000/# (for MainController)
  http://localhost:3000/#/others (for OtherController)

  Since hash changes are not sent to the server, it keeps the
  unnecessary round trip from happening.
*/
demo.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/main.html',
        controller: 'MainController'
      })
      .when('/other', {
        templateUrl: '/templates/other.html',
        controller: 'OtherController'
      });
  }]);

/*
  Create a user profile directive for a modular,
  user profile type "widget".

  Unlike the routes above, which are "triggered" via
  hash route changes, this directive is triggered
  whenever it is referenced as an attribute of an element
  on the page (restrict: A).
*/
demo.directive('userProfile', [function () {
    return {
      restrict: 'A',
      replace: true,
      templateUrl: 'templates/user-profile.html',
      controller: 'UserProfileController'
    };
  }]);

/*
  Define our controllers. The syntax of the method is as follows:
  .controller(controllerName, angularArray);

  angularArray is that "classic" array value Angular expects almost everywhere
  you declare a component/dependency. The first n values are the dependency
  names of your component. The last value is a function whose arguments are
  the dependencies named earlier.

  Below, our only dependencies are $scope (a child scope off our root module),
  and the currentUser value defined above.
*/
demo.controller('MainController', ['$scope', function ($scope) {
    $scope.exampleValue = 'Here is an example value set by the controller.';
    $scope.exampleFunc = function () {
      alert('This was an arbitrary function example defined by our controller.');
    }
  }])
  .controller('OtherController', [function () {
    /* No-op */
  }])
  .controller('UserProfileController', ['$scope', 'currentUser', function ($scope, currentUser) {
    $scope.user = currentUser;
    $scope.update = function () {
      // We could do a service call to the server here with the appropriate dependency injected.
      alert('Update complete.');
    }
  }]);
