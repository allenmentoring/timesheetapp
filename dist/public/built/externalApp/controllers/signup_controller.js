define(['externalApp/base', 'angularjs', 'fbase'], function(CampaignCtrlApp) {
  var SignupController;
  SignupController = (function() {
    function SignupController($scope, FirebaseService) {
      if (FirebaseService.authData && window.location.pathname === '/sign-up') {
        window.location = '/app';
      } else {
        $scope.user = {};
        $scope.alertInfo = {
          spinner: false,
          alert: false
        };
        $scope.createNewUser = function(newUserForm) {
          if (newUserForm.$valid) {
            $scope.alertInfo = {
              spinner: true,
              alert: false
            };
            return FirebaseService.rootRef.createUser({
              email: $scope.user.email,
              password: $scope.user.password
            }, function(error, userData) {
              var registerRef, usrRef;
              if (error) {
                console.log(error);
                switch (error.code) {
                  case 'EMAIL_TAKEN':
                    return $scope.$apply(function() {
                      return $scope.alertInfo = {
                        spinner: false,
                        alert: true,
                        alertMsg: "The email is already in use."
                      };
                    });
                  case 'INVALID_EMAIL':
                    return $scope.$apply(function() {
                      return $scope.alertInfo = {
                        spinner: false,
                        alert: true,
                        alertMsg: "The specified email is not a valid email."
                      };
                    });
                  default:
                    return $scope.$apply(function() {
                      return $scope.alertInfo = {
                        spinner: false,
                        alert: true,
                        alertMsg: "Error: " + error
                      };
                    });
                }
              } else {
                usrRef = FirebaseService.rootRef.child("users/" + userData.uid);
                registerRef = FirebaseService.rootRef.child("registrations/" + userData.uid);
                usrRef.child('basic').set({
                  mentor: true,
                  firstName: $scope.user.firstName,
                  lastName: $scope.user.lastName,
                  email: $scope.user.email,
                  createdAt: moment().unix()
                });
                registerRef.set({
                  mentor: true,
                  firstName: $scope.user.firstName,
                  lastName: $scope.user.lastName,
                  email: $scope.user.email,
                  password: $scope.user.password,
                  createdAt: moment().unix()
                });
                registerRef.setPriority('mentor');
                usrRef.setPriority($scope.user.email);
                return $scope.$apply(function() {
                  return $scope.alertInfo = {
                    spinner: false,
                    alert: true,
                    alertMsg: "User added successfully."
                  };
                });
              }
            });
          }
        };
      }
    }

    return SignupController;

  })();
  SignupController.$inject = ["$scope", "FirebaseService"];
  CampaignCtrlApp.controller('SignupController', SignupController);
  return SignupController;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvdGltZXNoZWV0YXBwL3B1YmxpYy9qYXZhc2NyaXB0cy9leHRlcm5hbEFwcC9jb250cm9sbGVycy9zaWdudXBfY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi9Vc2Vycy9rcmlzaG5hcm9raGFsZS9jb2RlL2xldmVsL2xldmVsL3RpbWVzaGVldGFwcC9hc3NldHMvamF2YXNjcmlwdHMvZXh0ZXJuYWxBcHAvY29udHJvbGxlcnMvc2lnbnVwX2NvbnRyb2xsZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQUEsQ0FBTyxDQUFFLGtCQUFGLEVBQXFCLFdBQXJCLEVBQWtDLE9BQWxDLENBQVAsRUFBa0QsU0FBQyxlQUFELEdBQUE7QUFFaEQsTUFBQSxnQkFBQTtBQUFBLEVBQU07QUFFUyxJQUFBLDBCQUFDLE1BQUQsRUFBUyxlQUFULEdBQUE7QUFFWCxNQUFBLElBQUcsZUFBZSxDQUFDLFFBQWhCLElBQTRCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBaEIsS0FBNkIsVUFBNUQ7QUFDRSxRQUFBLE1BQU0sQ0FBQyxRQUFQLEdBQW1CLE1BQW5CLENBREY7T0FBQSxNQUFBO0FBR0UsUUFBQSxNQUFNLENBQUMsSUFBUCxHQUFjLEVBQWQsQ0FBQTtBQUFBLFFBQ0EsTUFBTSxDQUFDLFNBQVAsR0FBbUI7QUFBQSxVQUFDLE9BQUEsRUFBUyxLQUFWO0FBQUEsVUFBaUIsS0FBQSxFQUFPLEtBQXhCO1NBRG5CLENBQUE7QUFBQSxRQUdBLE1BQU0sQ0FBQyxhQUFQLEdBQXVCLFNBQUMsV0FBRCxHQUFBO0FBQ3JCLFVBQUEsSUFBRyxXQUFXLENBQUMsTUFBZjtBQUNFLFlBQUEsTUFBTSxDQUFDLFNBQVAsR0FBbUI7QUFBQSxjQUFDLE9BQUEsRUFBUyxJQUFWO0FBQUEsY0FBZ0IsS0FBQSxFQUFPLEtBQXZCO2FBQW5CLENBQUE7bUJBR0EsZUFBZSxDQUFDLE9B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QUFDLFNBQVAsR0FBbUI7QUFBQSxvQkFBQyxPQUFBLEVBQVMsS0FBVjtBQUFBLG9CQUFpQixLQUFBLEVBQU8sSUFBeEI7QUFBQSxvQkFBOEIsUUFBQSxFQUFXLDBCQUF6QztvQkFEUDtnQkFBQSxDQUFkLEVBekJGO2VBREM7WUFBQSxDQUhILEVBSkY7V0FEcUI7UUFBQSxDQUh2QixDQUhGO09BRlc7SUFBQSxDQUFiOzs0QkFBQTs7TUFGRixDQUFBO0FBQUEsRUFpREEsZ0JBQWdCLENBQUMsT0FBakIsR0FBMkIsQ0FBRSxRQUFGLEVBQVksaUJBQVosQ0FqRDNCLENBQUE7QUFBQSxFQW1EQSxlQUFlLENBQUMsVUFBaEIsQ0FBNEIsa0JBQTVCLEVBQStDLGdCQUEvQyxDQW5EQSxDQUFBO1NBcURBLGlCQXZEZ0Q7QUFBQSxDQUFsRCxDQUFBLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUgWydleHRlcm5hbEFwcC9iYXNlJywnYW5ndWxhcmpzJywgJ2ZiYXNlJ10sIChDYW1wYWlnbkN0cmxBcHApIC0+XG5cbiAgY2xhc3MgU2lnbnVwQ29udHJvbGxlclxuXG4gICAgY29uc3RydWN0b3I6ICgkc2NvcGUsIEZpcmViYXNlU2VydmljZSkgLT5cblxuICAgICAgaWYgRmlyZWJhc2VTZXJ2aWNlLmF1dGhEYXRhICYmIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PSAnL3NpZ24tdXAnXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYXBwJ1xuICAgICAgZWxzZVxuICAgICAgICAkc2NvcGUudXNlciA9IHt9XG4gICAgICAgICRzY29wZS5hbGVydEluZm8gPSB7c3Bpbm5lcjogZmFsc2UsIGFsZXJ0OiBmYWxzZX1cblxuICAgICAgICAkc2NvcGUuY3JlYXRlTmV3VXNlciA9IChuZXdVc2VyRm9ybSkgLT5cbiAgICAgICAgICBpZiBuZXdVc2VyRm9ybS4kdmFsaWRcbiAgICAgICAgICAgICRzY29wZS5hbGVydEluZm8gPSB7c3Bpbm5lcjogdHJ1ZSwgYWxlcnQ6IGZhbHNlfVxuXG5cbiAgICAgICAgICAgIEZpcmViYXNlU2VydmljZS5yb290UmVmLmNyZWF0ZVVzZXIge1xuICAgICAgICAgICAgICBlbWFpbDogJHNjb3BlLnVzZXIuZW1haWxcbiAgICAgICAgICAgICAgcGFzc3dvcmQ6ICRzY29wZS51c2VyLnBhc3N3b3JkXG4gICAgICAgICAgICB9LCAoZXJyb3IsIHVzZXJEYXRhKSAtPlxuICAgICAgICAgICAgICBpZiBlcnJvclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIGVycm9yXG4gICAgICAgICAgICAgICAgc3dpdGNoIGVycm9yLmNvZGVcbiAgICAgICAgICAgICAgICAgIHdoZW4gJ0VNQUlMX1RBS0VOJ1xuXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYWxlcnRJbmZvID0ge3NwaW5uZXI6IGZhbHNlLCBhbGVydDogdHJ1ZSwgYWxlcnRNc2c6IFwiVGhlIGVtYWlsIGlzIGFscmVhZHkgaW4gdXNlLlwifVxuXG4gICAgICAgICAgICAgICAgICB3aGVuICdJTlZBTElEX0VNQUlMJ1xuXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYWxlcnRJbmZvID0ge3NwaW5uZXI6IGZhbHNlLCBhbGVydDogdHJ1ZSwgYWxlcnRNc2c6IFwiVGhlIHNwZWNpZmllZCBlbWFpbCBpcyBub3QgYSB2YWxpZCBlbWFpbC5cIn1cblxuICAgICAgICAgICAgICAgICAgZWxzZVxuXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUuYWxlcnRJbmZvID0ge3NwaW5uZXI6IGZhbHNlLCBhbGVydDogdHJ1ZSwgYWxlcnRNc2c6IFwiRXJyb3I6ICN7ZXJyb3J9XCJ9XG5cbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHVzclJlZiA9IEZpcmViYXNlU2VydmljZS5yb290UmVmLmNoaWxkKFwidXNlcnMvI3t1c2VyRGF0YS51aWR9XCIpXG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJSZWYgPSBGaXJlYmFzZVNlcnZpY2Uucm9vdFJlZi5jaGlsZChcInJlZ2lzdHJhdGlvbnMvI3t1c2VyRGF0YS51aWR9XCIpXG4gICAgICAgICAgICAgICAgdXNyUmVmLmNoaWxkKCdiYXNpYycpLnNldCB7bWVudG9yOiB0cnVlLCBmaXJzdE5hbWU6ICRzY29wZS51c2VyLmZpcnN0TmFtZSwgbGFzdE5hbWU6ICRzY29wZS51c2VyLmxhc3ROYW1lLCBlbWFpbDogJHNjb3BlLnVzZXIuZW1haWwsIGNyZWF0ZWRBdDogbW9tZW50KCkudW5peCgpfVxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyUmVmLnNldCB7bWVudG9yOiB0cnVlLCBmaXJzdE5hbWU6ICRzY29wZS51c2VyLmZpcnN0TmFtZSwgbGFzdE5hbWU6ICRzY29wZS51c2VyLmxhc3ROYW1lLCBlbWFpbDogJHNjb3BlLnVzZXIuZW1haWwsIHBhc3N3b3JkOiAkc2NvcGUudXNlci5wYXNzd29yZCwgY3JlYXRlZEF0OiBtb21lbnQoKS51bml4KCl9XG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJSZWYuc2V0UHJpb3JpdHkgJ21lbnRvcidcbiAgICAgICAgICAgICAgICB1c3JSZWYuc2V0UHJpb3JpdHkgJHNjb3BlLnVzZXIuZW1haWxcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgICAgICAkc2NvcGUuYWxlcnRJbmZvID0ge3NwaW5uZXI6IGZhbHNlLCBhbGVydDogdHJ1ZSwgYWxlcnRNc2c6IFwiVXNlciBhZGRlZCBzdWNjZXNzZnVsbHkuXCJ9XG5cblxuXG4gIFNpZ251cENvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIkZpcmViYXNlU2VydmljZVwiXVxuXG4gIENhbXBhaWduQ3RybEFwcC5jb250cm9sbGVyICdTaWdudXBDb250cm9sbGVyJywgU2lnbnVwQ29udHJvbGxlclxuXG4gIFNpZ251cENvbnRyb2xsZXIiXX0=
