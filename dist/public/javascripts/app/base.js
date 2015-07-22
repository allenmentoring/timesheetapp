define(['angularjs', 'angularroute', 'basefileupload', 'sanitize', 'anganimate', 'fbase', 'afire', 'uiboot'], function(angular, route, basefileupload, sanitize, anganimate, Firebase, afire) {
  var TimeSheetApp;
  TimeSheetApp = angular.module('timeSheetApp', ['ngRoute', 'naif.base64', 'ngSanitize', 'ngAnimate', 'firebase', 'ui.bootstrap']).config([
    '$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
        template: '<div class="row text-center ng-cloak"><div class="col-md-12"></div><i class=""></i>The App Canvas</div>',
        controller: [
          "$location", "$rootScope", function($location, $rootScope) {
            return $location.path($rootScope.rootPath);
          }
        ]
      });
      return $routeProvider.when('/dashboard', {
        templateUrl: "/javascripts/app/templates/dashboard.html",
        controller: 'DashBoardController'
      });
    }
  ]);
  TimeSheetApp.run([
    "$rootScope", "$location", "$window", "FirebaseService", "$route", "$timeout", function($rootScope, $location, $window, FirebaseService, $route, $timeout) {
      var auth;
      $rootScope.location = $location;
      $rootScope.authLoaded = false;
      auth = FirebaseService.rootRef.getAuth();
      $rootScope.rootRef = FirebaseService.rootRef;
      $rootScope.$on('$locationChangeSuccess', function() {
        $rootScope.location = window.location.pathname;
        return $rootScope.locationHash = window.location.hash;
      });
      $rootScope.disableModal = function() {
        return $rootScope.enableModal = false;
      };
      $rootScope.convertToSlug = function(text) {
        return text.toLowerCase().replace(/[^\w ]+/g, '').replace(/[^\w-]+/g, '-');
      };
      if (auth) {
        $rootScope.currentUid = auth.uid;
        $rootScope.rootRef.child("users/" + auth.uid + "/basic").once("value", function(snap) {
          return $rootScope.$apply(function() {
            $rootScope.userBasic = snap.val();
            $rootScope.currentUserRef = $rootScope.rootRef.child("users/" + auth.uid);
            return $rootScope.authLoaded = true;
          });
        });
        return $location.path('/dashboard');
      } else {
        return window.location = '/sign-in';
      }
    }
  ]);
  angular.element(document).ready(function() {
    return angular.bootstrap(document, ['timeSheetApp'], {
      strictDi: true
    });
  });
  return TimeSheetApp;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvdGltZXNoZWV0YXBwL3B1YmxpYy9qYXZhc2NyaXB0cy9hcHAvYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi9Vc2Vycy9rcmlzaG5hcm9raGFsZS9jb2RlL2xldmVsL2xldmVsL3RpbWVzaGVldGFwcC9hc3NldHMvamF2YXNjcmlwdHMvYXBwL2Jhc2UuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQUEsQ0FBTyxDQUFFLFdBQUYsRUFBZSxjQUFmLEVBQStCLGdCQUEvQixFQUFpRCxVQUFqRCxFQUE2RCxZQUE3RCxFQUEwRSxPQUExRSxFQUFtRixPQUFuRixFQUE0RixRQUE1RixDQUFQLEVBQTZHLFNBQUMsT0FBRCxFQUFVLEtBQVYsRUFBaUIsY0FBakIsRUFBaUMsUUFBakMsRUFBMkMsVUFBM0MsRUFBdUQsUUFBdkQsRUFBaUUsS0FBakUsR0FBQTtBQUczRyxNQUFBLFlBQUE7QUFBQSxFQUFBLFlBQUEsR0FBZSxPQUFPLENBQUMsTUFBUixDQUFnQixjQUFoQixFQUErQixDQUFFLFNBQUYsRUFBYSxhQUFiLEVBQTRCLFlBQTVCLEVBQTBDLFdBQTFDLEVBQXVELFVBQXZELEVBQW1FLGNBQW5FLENBQS9CLENBQWlILENBQUMsTUFBbEgsQ0FBMEg7SUFDMUgsZ0JBRDBILEVBRTNILFNBQUMsY0FBRCxHQUFBO0FBRUUsTUFBQSxjQUFjLENBQUMsSUFBZixDQUFxQixHQUFyQixFQUVFO0FBQUEsUUFBQSxRQUFBLEVBQVcseUdBQVg7QUFBQSxRQUNBLFVBQUEsRUFBYTtVQUFFLFdBQUYsRUFBZSxZQUFmLEVBQTRCLFNBQUMsU0FBRCxFQUFZLFVBQVosR0FBQTttQkFDdkMsU0FBUyxDQUFDLElBQVYsQ0FBZSxVQUFVLENBQUMsUUFBMUIsRUFEdUM7VUFBQSxDQUE1QjtTQURiO09BRkYsQ0FBQSxDQUFBO2FBT0EsY0FBYyxDQUFDLElBQWYsQ0FBcUIsWUFBckIs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dXRlJywgJ2Jhc2VmaWxldXBsb2FkJywgJ3Nhbml0aXplJywgJ2FuZ2FuaW1hdGUnLCdmYmFzZScsICdhZmlyZScsICd1aWJvb3QnXSwgKGFuZ3VsYXIsIHJvdXRlLCBiYXNlZmlsZXVwbG9hZCwgc2FuaXRpemUsIGFuZ2FuaW1hdGUsIEZpcmViYXNlLCBhZmlyZSkgLT5cblxuXG4gIFRpbWVTaGVldEFwcCA9IGFuZ3VsYXIubW9kdWxlKCd0aW1lU2hlZXRBcHAnLCBbJ25nUm91dGUnLCAnbmFpZi5iYXNlNjQnLCAnbmdTYW5pdGl6ZScsICduZ0FuaW1hdGUnLCAnZmlyZWJhc2UnLCAndWkuYm9vdHN0cmFwJ10pLmNvbmZpZyAoW1xuICAgICAgICAgICAgICAgICckcm91dGVQcm92aWRlcicsXG4gICAgICAgICAgICAgICAgKCRyb3V0ZVByb3ZpZGVyKSAtPlxuXG4gICAgICAgICAgICAgICAgICAkcm91dGVQcm92aWRlci53aGVuICcvJyxcbiMgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInJvdyB0ZXh0LWNlbnRlciBuZy1jbG9ha1wiPjxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj48L2Rpdj48aSBjbGFzcz1cImljb24tc3BpbjUgYW5pbWF0ZS1zcGluXCI+PC9pPkxvYWRpbmcuLi48L2Rpdj4nXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnPGRpdiBjbGFzcz1cInJvdyB0ZXh0LWNlbnRlciBuZy1jbG9ha1wiPjxkaXYgY2xhc3M9XCJjb2wtbWQtMTJcIj48L2Rpdj48aSBjbGFzcz1cIlwiPjwvaT5UaGUgQXBwIENhbnZhczwvZGl2PidcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogKFtcIiRsb2NhdGlvblwiLCBcIiRyb290U2NvcGVcIiwgKCRsb2NhdGlvbiwgJHJvb3RTY29wZSkgLT5cbiAgICAgICAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgkcm9vdFNjb3BlLnJvb3RQYXRoKVxuICAgICAgICAgICAgICAgICAgICBdKVxuXG4gICAgICAgICAgICAgICAgICAkcm91dGVQcm92aWRlci53aGVuICcvZGFzaGJvYXJkJyxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IFwiL2phdmFzY3JpcHRzL2FwcC90ZW1wbGF0ZXMvZGFzaGJvYXJkLmh0bWxcIlxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnRGFzaEJvYXJkQ29udHJvbGxlcidcblxuICAgICAgICAgICAgICAgXSlcblxuICBUaW1lU2hlZXRBcHAucnVuIChbXG4gICAgXCIkcm9vdFNjb3BlXCIsIFwiJGxvY2F0aW9uXCIsIFwiJHdpbmRvd1wiLCBcIkZpcmViYXNlU2VydmljZVwiLCBcIiRyb3V0ZVwiLCBcIiR0aW1lb3V0XCIsXG4gICAgKCRyb290U2NvcGUsICRsb2NhdGlvbiwgJHdpbmRvdywgRmlyZWJhc2VTZXJ2aWNlLCAkcm91dGUsICR0aW1lb3V0KSAtPlxuICAgICAgJHJvb3RTY29wZS5sb2NhdGlvbiA9ICRsb2NhdGlvblxuICAgICAgJHJvb3RTY29wZS5hdXRoTG9hZGVkID0gZmFsc2VcbiAgICAgIGF1dGggPSBGaXJlYmFzZVNlcnZpY2Uucm9vdFJlZi5nZXRBdXRoKClcbiAgICAgICRyb290U2NvcGUucm9vdFJlZiA9IEZpcmViYXNlU2VydmljZS5yb290UmVmXG5cbiAgICAgICRyb290U2NvcGUuJG9uICckbG9jYXRpb25DaGFuZ2VTdWNjZXNzJywgLT5cbiAgICAgICAgJHJvb3RTY29wZS5sb2NhdGlvbiA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZVxuICAgICAgICAkcm9vdFNjb3BlLmxvY2F0aW9uSGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoXG5cbiAgICAgICRyb290U2NvcGUuZGlzYWJsZU1vZGFsID0gKCkgLT5cbiAgICAgICAgJHJvb3RTY29wZS5lbmFibGVNb2RhbCA9IGZhbHNlXG5cblxuICAgICAgJHJvb3RTY29wZS5jb252ZXJ0VG9TbHVnID0gKHRleHQpIC0+XG4gICAgICAgIHRleHQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9bXlxcdyBdKy9nLCcnKS5yZXBsYWNlKC9bXlxcdy1dKy9nLCctJylcblxuXG4gICAgICBpZiBhdXRoXG4gICAgICAgICRyb290U2NvcGUuY3VycmVudFVpZCA9IGF1dGgudWlkXG5cblxuICAgICAgICAkcm9vdFNjb3BlLnJvb3RSZWYuY2hpbGQoXCJ1c2Vycy8je2F1dGgudWlkfS9iYXNpY1wiKS5vbmNlIFwidmFsdWVcIiwgKHNuYXApIC0+XG5cbiAgICAgICAgICAkcm9vdFNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgJHJvb3RTY29wZS51c2VyQmFzaWMgPSBzbmFwLnZhbCgpXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyUmVmID0gJHJvb3RTY29wZS5yb290UmVmLmNoaWxkKFwidXNlcnMvI3thdXRoLnVpZH1cIilcbiAgICAgICAgICAgICRyb290U2NvcGUuYXV0aExvYWRlZCA9IHRydWVcblxuICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2Rhc2hib2FyZCcpXG5cbiAgICAgIGVsc2VcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9zaWduLWluJ1xuXG4gIF0pXG5cblxuXG4gIGFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCkucmVhZHkgLT5cbiAgICBhbmd1bGFyLmJvb3RzdHJhcCBkb2N1bWVudCwgWyd0aW1lU2hlZXRBcHAnXSwge3N0cmljdERpOnRydWV9XG5cblxuICBUaW1lU2hlZXRBcHAiXX0=
