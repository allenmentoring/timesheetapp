define ['app/base','angularjs', 'fbase'], (TimeSheetApp) ->

  class DashBoardController

    constructor: ($scope, $rootScope, $sce, FirebaseService, $window) ->


  DashBoardController.$inject = ["$scope", "$rootScope", "$sce", "FirebaseService", "$window"]

  TimeSheetApp.controller 'DashBoardController', DashBoardController

  DashBoardController