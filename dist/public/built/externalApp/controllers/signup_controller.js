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
                usrRef.setPriority('mentor');
                $scope.$apply(function() {
                  return $scope.alertInfo = {
                    spinner: false,
                    alert: true,
                    alertMsg: "User added successfully."
                  };
                });
                return FirebaseService.rootRef.child("queues/sendCredentialsEmail").push().set({
                  userId: userData.uid
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvdGltZXNoZWV0YXBwL3B1YmxpYy9qYXZhc2NyaXB0cy9leHRlcm5hbEFwcC9jb250cm9sbGVycy9zaWdudXBfY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi9Vc2Vycy9rcmlzaG5hcm9raGFsZS9jb2RlL2xldmVsL2xldmVsL3RpbWVzaGVldGFwcC9hc3NldHMvamF2YXNjcmlwdHMvZXh0ZXJuYWxBcHAvY29udHJvbGxlcnMvc2lnbnVwX2NvbnRyb2xsZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE1BQUEsQ0FBTyxDQUFFLGtCQUFGLEVBQXFCLFdBQXJCLEVBQWtDLE9BQWxDLENBQVAsRUFBa0QsU0FBQyxlQUFELEdBQUE7QUFFaEQsTUFBQSxnQkFBQTtBQUFBLEVBQU07QUFFUyxJQUFBLDBCQUFDLE1BQUQsRUFBUyxlQUFULEdBQUE7QUFFWCxNQUFBLElBQUcsZUFBZSxDQUFDLFFBQWhCLElBQTRCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBaEIsS0FBNkIsVUFBNUQ7QUFDRSxRQUFBLE1BQU0sQ0FBQyxRQUFQLEdBQW1CLE1BQW5CLENBREY7T0FBQSxNQUFBO0FBR0UsUUFBQSxNQUFNLENBQUMsSUFBUCxHQUFjLEVBQWQsQ0FBQTtBQUFBLFFBQ0EsTUFBTSxDQUFDLFNBQVAsR0FBbUI7QUFBQSxVQUFDLE9BQUEsRUFBUyxLQUFWO0FBQUEsVUFBaUIsS0FBQSxFQUFPLEtBQXhCO1NBRG5CLENBQUE7QUFBQSxRQUdBLE1BQU0sQ0FBQyxhQUFQLEdBQXVCLFNBQUMsV0FBRCxHQUFBO0FBQ3JCLFVBQUEsSUFBRyxXQUFXLENBQUMsTUFBZjtBQUNFLFlBQUEsTUFBTSxDQUFDLFNBQVAsR0FBbUI7QUFBQSxjQUFDLE9BQUEsRUFBUyxJQUFWO0FBQUEsY0FBZ0IsS0FBQSxFQUFPLEtBQXZCO2FBQW5CLENBQUE7bUJBR0EsZUFBZSxDQUFDLE9B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QUFBQSxvQkFBQyxPQUFBLEVBQVMsS0FBVjtBQUFBLG9CQUFpQixLQUFBLEVBQU8sSUFBeEI7QUFBQSxvQkFBOEIsUUFBQSxFQUFXLDBCQUF6QztvQkFEUDtnQkFBQSxDQUFkLENBTkEsQ0FBQTt1QkFRQSxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQXhCLENBQStCLDZCQUEvQixDQUE0RCxDQUFDLElBQTdELENBQUEsQ0FBbUUsQ0FBQyxHQUFwRSxDQUF3RTtBQUFBLGtCQUFDLE1BQUEsRUFBUSxRQUFRLENBQUMsR0FBbEI7aUJBQXhFLEVBM0JGO2VBREM7WUFBQSxDQUhILEVBSkY7V0FEcUI7UUFBQSxDQUh2QixDQUhGO09BRlc7SUFBQSxDQUFiOzs0QkFBQTs7TUFGRixDQUFBO0FBQUEsRUFrREEsZ0JBQWdCLENBQUMsT0FBakIsR0FBMkIsQ0FBRSxRQUFGLEVBQVksaUJBQVosQ0FsRDNCLENBQUE7QUFBQSxFQW9EQSxlQUFlLENBQUMsVUFBaEIsQ0FBNEIsa0JBQTVCLEVBQStDLGdCQUEvQyxDQXBEQSxDQUFBO1NBc0RBLGlCQXhEZ0Q7QUFBQSxDQUFsRCxDQUFBLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJcbmRlZmluZSBbJ2V4dGVybmFsQXBwL2Jhc2UnLCdhbmd1bGFyanMnLCAnZmJhc2UnXSwgKENhbXBhaWduQ3RybEFwcCkgLT5cblxuICBjbGFzcyBTaWdudXBDb250cm9sbGVyXG5cbiAgICBjb25zdHJ1Y3RvcjogKCRzY29wZSwgRmlyZWJhc2VTZXJ2aWNlKSAtPlxuXG4gICAgICBpZiBGaXJlYmFzZVNlcnZpY2UuYXV0aERhdGEgJiYgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09ICcvc2lnbi11cCdcbiAgICAgICAgd2luZG93LmxvY2F0aW9uID0gJy9hcHAnXG4gICAgICBlbHNlXG4gICAgICAgICRzY29wZS51c2VyID0ge31cbiAgICAgICAgJHNjb3BlLmFsZXJ0SW5mbyA9IHtzcGlubmVyOiBmYWxzZSwgYWxlcnQ6IGZhbHNlfVxuXG4gICAgICAgICRzY29wZS5jcmVhdGVOZXdVc2VyID0gKG5ld1VzZXJGb3JtKSAtPlxuICAgICAgICAgIGlmIG5ld1VzZXJGb3JtLiR2YWxpZFxuICAgICAgICAgICAgJHNjb3BlLmFsZXJ0SW5mbyA9IHtzcGlubmVyOiB0cnVlLCBhbGVydDogZmFsc2V9XG5cblxuICAgICAgICAgICAgRmlyZWJhc2VTZXJ2aWNlLnJvb3RSZWYuY3JlYXRlVXNlciB7XG4gICAgICAgICAgICAgIGVtYWlsOiAkc2NvcGUudXNlci5lbWFpbFxuICAgICAgICAgICAgICBwYXNzd29yZDogJHNjb3BlLnVzZXIucGFzc3dvcmRcbiAgICAgICAgICAgIH0sIChlcnJvciwgdXNlckRhdGEpIC0+XG4gICAgICAgICAgICAgIGlmIGVycm9yXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgZXJyb3JcbiAgICAgICAgICAgICAgICBzd2l0Y2ggZXJyb3IuY29kZVxuICAgICAgICAgICAgICAgICAgd2hlbiAnRU1BSUxfVEFLRU4nXG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5hbGVydEluZm8gPSB7c3Bpbm5lcjogZmFsc2UsIGFsZXJ0OiB0cnVlLCBhbGVydE1zZzogXCJUaGUgZW1haWwgaXMgYWxyZWFkeSBpbiB1c2UuXCJ9XG5cbiAgICAgICAgICAgICAgICAgIHdoZW4gJ0lOVkFMSURfRU1BSUwnXG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5hbGVydEluZm8gPSB7c3Bpbm5lcjogZmFsc2UsIGFsZXJ0OiB0cnVlLCBhbGVydE1zZzogXCJUaGUgc3BlY2lmaWVkIGVtYWlsIGlzIG5vdCBhIHZhbGlkIGVtYWlsLlwifVxuXG4gICAgICAgICAgICAgICAgICBlbHNlXG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLiRhcHBseSAtPlxuICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5hbGVydEluZm8gPSB7c3Bpbm5lcjogZmFsc2UsIGFsZXJ0OiB0cnVlLCBhbGVydE1zZzogXCJFcnJvcjogI3tlcnJvcn1cIn1cblxuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdXNyUmVmID0gRmlyZWJhc2VTZXJ2aWNlLnJvb3RSZWYuY2hpbGQoXCJ1c2Vycy8je3VzZXJEYXRhLnVpZH1cIilcbiAgICAgICAgICAgICAgICByZWdpc3RlclJlZiA9IEZpcmViYXNlU2VydmljZS5yb290UmVmLmNoaWxkKFwicmVnaXN0cmF0aW9ucy8je3VzZXJEYXRhLnVpZH1cIilcbiAgICAgICAgICAgICAgICB1c3JSZWYuY2hpbGQoJ2Jhc2ljJykuc2V0IHttZW50b3I6IHRydWUsIGZpcnN0TmFtZTogJHNjb3BlLnVzZXIuZmlyc3ROYW1lLCBsYXN0TmFtZTogJHNjb3BlLnVzZXIubGFzdE5hbWUsIGVtYWlsOiAkc2NvcGUudXNlci5lbWFpbCwgY3JlYXRlZEF0OiBtb21lbnQoKS51bml4KCl9XG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJSZWYuc2V0IHttZW50b3I6IHRydWUsIGZpcnN0TmFtZTogJHNjb3BlLnVzZXIuZmlyc3ROYW1lLCBsYXN0TmFtZTogJHNjb3BlLnVzZXIubGFzdE5hbWUsIGVtYWlsOiAkc2NvcGUudXNlci5lbWFpbCwgcGFzc3dvcmQ6ICRzY29wZS51c2VyLnBhc3N3b3JkLCBjcmVhdGVkQXQ6IG1vbWVudCgpLnVuaXgoKX1cbiAgICAgICAgICAgICAgICByZWdpc3RlclJlZi5zZXRQcmlvcml0eSAnbWVudG9yJ1xuICAgICAgICAgICAgICAgIHVzclJlZi5zZXRQcmlvcml0eSAnbWVudG9yJ1xuICAgICAgICAgICAgICAgICRzY29wZS4kYXBwbHkgLT5cbiAgICAgICAgICAgICAgICAgICRzY29wZS5hbGVydEluZm8gPSB7c3Bpbm5lcjogZmFsc2UsIGFsZXJ0OiB0cnVlLCBhbGVydE1zZzogXCJVc2VyIGFkZGVkIHN1Y2Nlc3NmdWxseS5cIn1cbiAgICAgICAgICAgICAgICBGaXJlYmFzZVNlcnZpY2Uucm9vdFJlZi5jaGlsZChcInF1ZXVlcy9zZW5kQ3JlZGVudGlhbHNFbWFpbFwiKS5wdXNoKCkuc2V0IHt1c2VySWQ6IHVzZXJEYXRhLnVpZH1cblxuXG5cbiAgU2lnbnVwQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiRmlyZWJhc2VTZXJ2aWNlXCJdXG5cbiAgQ2FtcGFpZ25DdHJsQXBwLmNvbnRyb2xsZXIgJ1NpZ251cENvbnRyb2xsZXInLCBTaWdudXBDb250cm9sbGVyXG5cbiAgU2lnbnVwQ29udHJvbGxlciJdfQ==
