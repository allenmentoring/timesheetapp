define ['externalApp/base','angularjs', 'fbase'], (CampaignCtrlApp) ->

  class NavBarController

    constructor: ($scope, FirebaseService) ->
      $scope.loggedIn = if FirebaseService.authData then true else false

      $scope.signOut = ($event) ->
        $event.preventDefault()
        FirebaseService.rootRef.unauth()
        window.location = '/'

      $scope.location = window.location.pathname


  NavBarController.$inject = ["$scope", "FirebaseService"]

  CampaignCtrlApp.controller 'NavBarController', NavBarController

  NavBarController