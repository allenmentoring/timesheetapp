
define ['app/base','angularjs', 'fbase'], (TimeSheetApp) ->

  class NavBarController

    constructor: ($scope, FirebaseService) ->
      $scope.loggedIn = if FirebaseService.authData then true else false

      $scope.signOut = ($event) ->
        $event.preventDefault()
        FirebaseService.rootRef.unauth()
        window.location = '/'





  NavBarController.$inject = ["$scope", "FirebaseService"]

  TimeSheetApp.controller 'NavBarController', NavBarController

  NavBarController