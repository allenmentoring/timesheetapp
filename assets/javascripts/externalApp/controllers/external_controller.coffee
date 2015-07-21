define ['externalApp/base','angularjs', 'fbase'], (TimeSheetApp) ->

  class ExternalController

    constructor: ($scope, FirebaseService, $window) ->

      $scope.showFreshers = true
      $scope.windowHeight = $window.innerHeight + 'px'



  ExternalController.$inject = ["$scope", "FirebaseService", "$window"]


  TimeSheetApp.controller 'ExternalController', ExternalController

  ExternalController