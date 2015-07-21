define(['externalApp/base', 'angularjs', 'fbase'], function(TimeSheetApp) {
  var SigninController;
  SigninController = (function() {
    function SigninController($scope, FirebaseService) {
      if (FirebaseService.authData) {
        window.location = '/app';
      } else {
        $scope.user = {};
        $scope.alertInfo = {
          spinner: false,
          alert: false
        };
        $scope.logInUser = function(userForm) {
          if (userForm.$valid) {
            $scope.alertInfo = {
              spinner: true,
              alert: false
            };
            console.log($scope.user);
            return FirebaseService.rootRef.authWithPassword({
              'email': $scope.user.email,
              'password': $scope.user.password
            }, function(error, authData) {
              if (error) {
                console.log(error);
                switch (error.code) {
                  case 'INVALID_USER':
                    return $scope.$apply(function() {
                      return $scope.alertInfo = {
                        spinner: false,
                        alert: true,
                        alertMsg: "The user does not exist."
                      };
                    });
                  case 'INVALID_PASSWORD':
                    return $scope.$apply(function() {
                      return $scope.alertInfo = {
                        spinner: false,
                        alert: true,
                        alertMsg: "The password is incorrect."
                      };
                    });
                }
              } else {
                console.log('Authenticated successfully with payload:', authData);
                FirebaseService.authData = authData;
                return window.location = '/app';
              }
            });
          }
        };
        $scope.forgotPassword = function($event) {
          $event.preventDefault();
          return $scope.showForgotPassword = !$scope.showForgotPassword;
        };
        $scope.sendResetEmail = function(forgotPasswordForm) {
          if (forgotPasswordForm.$valid) {
            $scope.alertInfo = {
              spinner: true,
              alert: false
            };
            console.log($scope.forgotEmail);
            return FirebaseService.rootRef.resetPassword({
              email: $scope.forgotEmail
            }, function(error) {
              if (error) {
                switch (error.code) {
                  case 'INVALID_USER':
                    $scope.$apply(function() {
                      return $scope.alertInfo = {
                        spinner: false,
                        alert: true,
                        alertMsg: "The user does not exist."
                      };
                    });
                    break;
                  default:
                    $scope.$apply(function() {
                      return $scope.alertInfo = {
                        spinner: false,
                        alert: true,
                        alertMsg: "Error resetting password"
                      };
                    });
                }
              } else {
                $scope.$apply(function() {
                  return $scope.alertInfo = {
                    spinner: false,
                    alert: true,
                    alertMsg: 'Reset email sent successfully!'
                  };
                });
              }
            });
          }
        };
      }
    }

    return SigninController;

  })();
  SigninController.$inject = ["$scope", "FirebaseService"];
  TimeSheetApp.controller('SigninController', SigninController);
  return SigninController;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvdGltZXNoZWV0YXBwL3B1YmxpYy9qYXZhc2NyaXB0cy9leHRlcm5hbEFwcC9jb250cm9sbGVycy9zaWduaW5fY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi9Vc2Vycy9rcmlzaG5hcm9raGFsZS9jb2RlL2xldmVsL2xldmVsL3RpbWVzaGVldGFwcC9hc3NldHMvamF2YXNjcmlwdHMvZXh0ZXJuYWxBcHAvY29udHJvbGxlcnMvc2lnbmluX2NvbnRyb2xsZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQUEsQ0FBTyxDQUFFLGtCQUFGLEVBQXFCLFdBQXJCLEVBQWtDLE9BQWxDLENBQVAsRUFBa0QsU0FBQyxZQUFELEdBQUE7QUFFaEQsTUFBQSxnQkFBQTtBQUFBLEVBQU07QUFFUyxJQUFBLDBCQUFDLE1BQUQsRUFBUyxlQUFULEdBQUE7QUFDWCxNQUFBLElBQUcsZUFBZSxDQUFDLFFBQW5CO0FBQ0UsUUFBQSxNQUFNLENBQUMsUUFBUCxHQUFtQixNQUFuQixDQURGO09BQUEsTUFBQTtBQUdFLFFBQUEsTUFBTSxDQUFDLElBQVAsR0FBYyxFQUFkLENBQUE7QUFBQSxRQUNBLE1BQU0sQ0FBQyxTQUFQLEdBQW1CO0FBQUEsVUFBQyxPQUFBLEVBQVMsS0FBVjtBQUFBLFVBQWlCLEtBQUEsRUFBTyxLQUF4QjtTQURuQixDQUFBO0FBQUEsUUFHQSxNQUFNLENBQUMsU0FBUCxHQUFtQixTQUFDLFFBQUQsR0FBQTtBQUNqQixVQUFBLElBQUcsUUFBUSxDQUFDLE1BQVo7QUFDRSxZQUFBLE1BQU0sQ0FBQyxTQUFQLEdBQW1CO0FBQUEsY0FBQyxPQUFBLEVBQVMsSUFBVjtBQUFBLGNBQWdCLEtBQUEsRUFBTyxLQUF2QjthQUFuQixDQUFBO0FBQUEsWUFDQSxPQUFPLENBQUMsR0FBUixDQUFZLE1BQU0sQ0FBQyxJQUFuQixDQURBLENBQUE7bUJBRUEs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eUJBQ1osTUFBTSxDQUFDLFNBQVAsR0FBbUI7QUFBQSxvQkFBQyxPQUFBLEVBQVMsS0FBVjtBQUFBLG9CQUFpQixLQUFBLEVBQU8sSUFBeEI7QUFBQSxvQkFBOEIsUUFBQSxFQUFXLGdDQUF6QztvQkFEUDtnQkFBQSxDQUFkLENBQUEsQ0FURjtlQURpRTtZQUFBLENBQW5FLEVBSkY7V0FEc0I7UUFBQSxDQWxDeEIsQ0FIRjtPQURXO0lBQUEsQ0FBYjs7NEJBQUE7O01BRkYsQ0FBQTtBQUFBLEVBOERBLGdCQUFnQixDQUFDLE9BQWpCLEdBQTJCLENBQUUsUUFBRixFQUFZLGlCQUFaLENBOUQzQixDQUFBO0FBQUEsRUFnRUEsWUFBWSxDQUFDLFVBQWIsQ0FBeUIsa0JBQXpCLEVBQTRDLGdCQUE1QyxDQWhFQSxDQUFBO1NBa0VBLGlCQXBFZ0Q7QUFBQSxDQUFsRCxDQUFBLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJkZWZpbmUgWydleHRlcm5hbEFwcC9iYXNlJywnYW5ndWxhcmpzJywgJ2ZiYXNlJ10sIChUaW1lU2hlZXRBcHApIC0+XG5cbiAgY2xhc3MgU2lnbmluQ29udHJvbGxlclxuXG4gICAgY29uc3RydWN0b3I6ICgkc2NvcGUsIEZpcmViYXNlU2VydmljZSkgLT5cbiAgICAgIGlmIEZpcmViYXNlU2VydmljZS5hdXRoRGF0YVxuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2FwcCdcbiAgICAgIGVsc2VcbiAgICAgICAgJHNjb3BlLnVzZXIgPSB7fVxuICAgICAgICAkc2NvcGUuYWxlcnRJbmZvID0ge3NwaW5uZXI6IGZhbHNlLCBhbGVydDogZmFsc2V9XG5cbiAgICAgICAgJHNjb3BlLmxvZ0luVXNlciA9ICh1c2VyRm9ybSkgLT5cbiAgICAgICAgICBpZiB1c2VyRm9ybS4kdmFsaWRcbiAgICAgICAgICAgICRzY29wZS5hbGVydEluZm8gPSB7c3Bpbm5lcjogdHJ1ZSwgYWxlcnQ6IGZhbHNlfVxuICAgICAgICAgICAgY29uc29sZS5sb2cgJHNjb3BlLnVzZXJcbiAgICAgICAgICAgIEZpcmViYXNlU2VydmljZS5yb290UmVmLmF1dGhXaXRoUGFzc3dvcmQge1xuICAgICAgICAgICAgICAnZW1haWwnOiAkc2NvcGUudXNlci5lbWFpbFxuICAgICAgICAgICAgICAncGFzc3dvcmQnOiAkc2NvcGUudXNlci5wYXNzd29yZFxuICAgICAgICAgICAgfSwgKGVycm9yLCBhdXRoRGF0YSkgLT5cbiAgICAgICAgICAgICAgaWYgZXJyb3JcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyBlcnJvclxuICAgICAgICAgICAgICAgIHN3aXRjaCBlcnJvci5jb2RlXG5cbiAgICAgICAgICAgICAgICAgIHdoZW4gJ0lOVkFMSURfVVNFUidcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5hbGVydEluZm8gPSB7c3Bpbm5lcjogZmFsc2UsIGFsZXJ0OiB0cnVlLCBhbGVydE1zZzogXCJUaGUgdXNlciBkb2VzIG5vdCBleGlzdC5cIn1cblxuXG4gICAgICAgICAgICAgICAgICB3aGVuICdJTlZBTElEX1BBU1NXT1JEJ1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFsZXJ0SW5mbyA9IHtzcGlubmVyOiBmYWxzZSwgYWxlcnQ6IHRydWUsIGFsZXJ0TXNnOiBcIlRoZSBwYXNzd29yZCBpcyBpbmNvcnJlY3QuXCJ9XG5cbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nICdBdXRoZW50aWNhdGVkIHN1Y2Nlc3NmdWxseSB3aXRoIHBheWxvYWQ6JywgYXV0aERhdGFcbiAgICAgICAgICAgICAgICBGaXJlYmFzZVNlcnZpY2UuYXV0aERhdGEgPSBhdXRoRGF0YVxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICcvYXBwJ1xuXG5cbiAgICAgICAgJHNjb3BlLmZvcmdvdFBhc3N3b3JkID0gKCRldmVudCkgLT5cbiAgICAgICAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICRzY29wZS5zaG93Rm9yZ290UGFzc3dvcmQgPSAhJHNjb3BlLnNob3dGb3Jnb3RQYXNzd29yZFxuXG4gICAgICAgICRzY29wZS5zZW5kUmVzZXRFbWFpbCA9IChmb3Jnb3RQYXNzd29yZEZvcm0pIC0+XG4gICAgICAgICAgaWYgZm9yZ290UGFzc3dvcmRGb3JtLiR2YWxpZFxuICAgICAgICAgICAgJHNjb3BlLmFsZXJ0SW5mbyA9IHtzcGlubmVyOiB0cnVlLCBhbGVydDogZmFsc2V9XG4gICAgICAgICAgICBjb25zb2xlLmxvZyAkc2NvcGUuZm9yZ290RW1haWxcblxuICAgICAgICAgICAgRmlyZWJhc2VTZXJ2aWNlLnJvb3RSZWYucmVzZXRQYXNzd29yZCB7ZW1haWw6ICRzY29wZS5mb3Jnb3RFbWFpbH0sIChlcnJvcikgLT5cbiAgICAgICAgICAgICAgaWYgZXJyb3JcbiAgICAgICAgICAgICAgICBzd2l0Y2ggZXJyb3IuY29kZVxuICAgICAgICAgICAgICAgICAgd2hlbiAnSU5WQUxJRF9VU0VSJ1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFsZXJ0SW5mbyA9IHtzcGlubmVyOiBmYWxzZSwgYWxlcnQ6IHRydWUsIGFsZXJ0TXNnOiBcIlRoZSB1c2VyIGRvZXMgbm90IGV4aXN0LlwifVxuICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFsZXJ0SW5mbyA9IHtzcGlubmVyOiBmYWxzZSwgYWxlcnQ6IHRydWUsIGFsZXJ0TXNnOiBcIkVycm9yIHJlc2V0dGluZyBwYXNzd29yZFwifVxuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICAgICAgJHNjb3BlLmFsZXJ0SW5mbyA9IHtzcGlubmVyOiBmYWxzZSwgYWxlcnQ6IHRydWUsIGFsZXJ0TXNnOiAnUmVzZXQgZW1haWwgc2VudCBzdWNjZXNzZnVsbHkhJ31cbiAgICAgICAgICAgICAgcmV0dXJuXG5cblxuXG5cbiAgU2lnbmluQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiRmlyZWJhc2VTZXJ2aWNlXCJdXG5cbiAgVGltZVNoZWV0QXBwLmNvbnRyb2xsZXIgJ1NpZ25pbkNvbnRyb2xsZXInLCBTaWduaW5Db250cm9sbGVyXG5cbiAgU2lnbmluQ29udHJvbGxlciJdfQ==
