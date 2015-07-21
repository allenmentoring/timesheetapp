
define ['angularjs', 'anganimate', 'sanitize'], (angular) ->

  TimeSheetApp = angular.module("timeSheetApp", ['ngAnimate', 'ngSanitize', 'firebase'])

  angular.element(document).ready ->
    angular.bootstrap document, ['timeSheetApp']


  TimeSheetApp