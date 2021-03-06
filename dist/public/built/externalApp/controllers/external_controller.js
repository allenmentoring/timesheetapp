define(['externalApp/base', 'angularjs', 'fbase'], function(TimeSheetApp) {
  var ExternalController;
  ExternalController = (function() {
    function ExternalController($scope, FirebaseService, $window) {
      $scope.showFreshers = true;
      $scope.windowHeight = $window.innerHeight + 'px';
    }

    return ExternalController;

  })();
  ExternalController.$inject = ["$scope", "FirebaseService", "$window"];
  TimeSheetApp.controller('ExternalController', ExternalController);
  return ExternalController;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvdGltZXNoZWV0YXBwL3B1YmxpYy9qYXZhc2NyaXB0cy9leHRlcm5hbEFwcC9jb250cm9sbGVycy9leHRlcm5hbF9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvdGltZXNoZWV0YXBwL2Fzc2V0cy9qYXZhc2NyaXB0cy9leHRlcm5hbEFwcC9jb250cm9sbGVycy9leHRlcm5hbF9jb250cm9sbGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFBLENBQU8sQ0FBRSxrQkFBRixFQUFxQixXQUFyQixFQUFrQyxPQUFsQyxDQUFQLEVBQWtELFNBQUMsWUFBRCxHQUFBO0FBRWhELE1BQUEsa0JBQUE7QUFBQSxFQUFNO0FBRVMsSUFBQSw0QkFBQyxNQUFELEVBQVMsZUFBVCxFQUEwQixPQUExQixHQUFBO0FBRVgsTUFBQSxNQUFNLENBQUMsWUFBUCxHQUFzQixJQUF0QixDQUFBO0FBQUEsTUFDQSxNQUFNLENBQUMsWUFBUCxHQUFzQixPQUFPLENBQUMsV0FBUixHQUF1QixJQUQ3QyxDQUZXO0lBQUEsQ0FBYjs7OEJBQUE7O01BRkYsQ0FBQTtBQUFBLEVBU0Esa0JBQWtCLENBQUMsT0FBbkIsR0FBNkIsQ0FBRSxRQUFGLEVBQVksaUJBQVosRUFBK0IsU0FBL0IsQ0FUN0IsQ0FBQTtBQUFBLEVBWUEsWUFBWSxDQUFDLFVBQWIsQ0FBeUIsb0JBQXpCLEVBQThDLGtCQUE5QyxDQVpBLENBQUE7U0FjQSxtQkFoQmdEO0FBQUEsQ0FBbEQsQ0FBQSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lIFsnZXh0ZXJuYWxBcHAvYmFzZScsJ2FuZ3VsYXJqcycsICdmYmFzZSddLCAoVGltZVNoZWV0QXBwKSAtPlxuXG4gIGNsYXNzIEV4dGVybmFsQ29udHJvbGxlclxuXG4gICAgY29uc3RydWN0b3I6ICgkc2NvcGUsIEZpcmViYXNlU2VydmljZSwgJHdpbmRvdykgLT5cblxuICAgICAgJHNjb3BlLnNob3dGcmVzaGVycyA9IHRydWVcbiAgICAgICRzY29wZS53aW5kb3dIZWlnaHQgPSAkd2luZG93LmlubmVySGVpZ2h0ICsgJ3B4J1xuXG5cblxuICBFeHRlcm5hbENvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIkZpcmViYXNlU2VydmljZVwiLCBcIiR3aW5kb3dcIl1cblxuXG4gIFRpbWVTaGVldEFwcC5jb250cm9sbGVyICdFeHRlcm5hbENvbnRyb2xsZXInLCBFeHRlcm5hbENvbnRyb2xsZXJcblxuICBFeHRlcm5hbENvbnRyb2xsZXIiXX0=
