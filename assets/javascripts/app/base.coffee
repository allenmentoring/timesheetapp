define ['angularjs', 'angularroute', 'basefileupload', 'sanitize', 'anganimate','fbase', 'afire'], (angular, route, basefileupload, sanitize, anganimate, Firebase, afire) ->


  TimeSheetApp = angular.module('timeSheetApp', ['ngRoute', 'naif.base64', 'ngSanitize', 'ngAnimate', 'firebase']).config ([
                '$routeProvider',
                ($routeProvider) ->

                  $routeProvider.when '/',
#                    template: '<div class="row text-center ng-cloak"><div class="col-md-12"></div><i class="icon-spin5 animate-spin"></i>Loading...</div>'
                    template: '<div class="row text-center ng-cloak"><div class="col-md-12"></div><i class=""></i>The App Canvas</div>'
                    controller: (["$location", "$rootScope", ($location, $rootScope) ->
                      $location.path($rootScope.rootPath)
                    ])

                  $routeProvider.when '/dashboard',
                    templateUrl: "/javascripts/app/templates/dashboard.html"
                    controller: 'DashBoardController'

               ])

  TimeSheetApp.run ([
    "$rootScope", "$location", "$window", "FirebaseService", "$route", "$timeout",
    ($rootScope, $location, $window, FirebaseService, $route, $timeout) ->
      $rootScope.location = $location
      $rootScope.authLoaded = false
      auth = FirebaseService.rootRef.getAuth()
      $rootScope.rootRef = FirebaseService.rootRef

      $rootScope.$on '$locationChangeSuccess', ->
        $rootScope.location = window.location.pathname
        $rootScope.locationHash = window.location.hash

      $rootScope.disableModal = () ->
        $rootScope.enableModal = false


      $rootScope.convertToSlug = (text) ->
        text.toLowerCase().replace(/[^\w ]+/g,'').replace(/[^\w-]+/g,'-')


      if auth
        $rootScope.currentUid = auth.uid


        $rootScope.rootRef.child("users/#{auth.uid}/basic").once "value", (snap) ->

          $rootScope.$apply ->
            $rootScope.userBasic = snap.val()
            $rootScope.currentUserRef = $rootScope.rootRef.child("users/#{auth.uid}")
            $rootScope.authLoaded = true

        $location.path('/dashboard')

      else
        window.location = '/sign-in'

  ])



  angular.element(document).ready ->
    angular.bootstrap document, ['timeSheetApp'], {strictDi:true}


  TimeSheetApp