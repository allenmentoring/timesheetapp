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
                  firstName: $scope.user.firstName,
                  lastName: $scope.user.lastName,
                  email: $scope.user.email,
                  createdAt: moment().unix()
                });
                registerRef.set({
                  firstName: $scope.user.firstName,
                  lastName: $scope.user.lastName,
                  email: $scope.user.email,
                  password: $scope.user.password,
                  createdAt: moment().unix()
                });
                registerRef.setPriority($scope.user.email);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvdGltZXNoZWV0YXBwL3B1YmxpYy9qYXZhc2NyaXB0cy9leHRlcm5hbEFwcC9jb250cm9sbGVycy9zaWdudXBfY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi9Vc2Vycy9rcmlzaG5hcm9raGFsZS9jb2RlL2xldmVsL2xldmVsL3RpbWVzaGVldGFwcC9hc3NldHMvamF2YXNjcmlwdHMvZXh0ZXJuYWxBcHAvY29udHJvbGxlcnMvc2lnbnVwX2NvbnRyb2xsZXIuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQUEsQ0FBTyxDQUFFLGtCQUFGLEVBQXFCLFdBQXJCLEVBQWtDLE9BQWxDLENBQVAsRUFBa0QsU0FBQyxlQUFELEdBQUE7QUFFaEQsTUFBQSxnQkFBQTtBQUFBLEVBQU07QUFFUyxJQUFBLDBCQUFDLE1BQUQsRUFBUyxlQUFULEdBQUE7QUFFWCxNQUFBLElBQUcsZUFBZSxDQUFDLFFBQWhCLElBQTRCLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBaEIsS0FBNkIsVUFBNUQ7QUFDRSxRQUFBLE1BQU0sQ0FBQyxRQUFQLEdBQW1CLE1BQW5CLENBREY7T0FBQSxNQUFBO0FBR0UsUUFBQSxNQUFNLENBQUMsSUFBUCxHQUFjLEVBQWQsQ0FBQTtBQUFBLFFBQ0EsTUFBTSxDQUFDLFNBQVAsR0FBbUI7QUFBQSxVQUFDLE9BQUEsRUFBUyxLQUFWO0FBQUEsVUFBaUIsS0FBQSxFQUFPLEtBQXhCO1NBRG5CLENBQUE7QUFBQSxRQUdBLE1BQU0sQ0FBQyxhQUFQLEdBQXVCLFNBQUMsV0FBRCxHQUFBO0FBQ3JCLFVBQUEsSUFBRyxXQUFXLENBQUMsTUFBZjtBQUNFLFlBQUEsTUFBTSxDQUFDLFNBQVAsR0FBbUI7QUFBQSxjQUFDLE9BQUEsRUFBUyxJQUFWO0FBQUEsY0FBZ0IsS0FBQSxFQUFPLEtBQXZCO2FBQW5CLENBQUE7bUJBR0EsZUFBZSxDQUFDLE9B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QUFTLEtBQVY7QUFBQSxvQkFBaUIsS0FBQSxFQUFPLElBQXhCO0FBQUEsb0JBQThCLFFBQUEsRUFBVywwQkFBekM7b0JBRFA7Z0JBQUEsQ0FBZCxFQXpCRjtlQURDO1lBQUEsQ0FISCxFQUpGO1dBRHFCO1FBQUEsQ0FIdkIsQ0FIRjtPQUZXO0lBQUEsQ0FBYjs7NEJBQUE7O01BRkYsQ0FBQTtBQUFBLEVBaURBLGdCQUFnQixDQUFDLE9BQWpCLEdBQTJCLENBQUUsUUFBRixFQUFZLGlCQUFaLENBakQzQixDQUFBO0FBQUEsRUFtREEsZUFBZSxDQUFDLFVBQWhCLENBQTRCLGtCQUE1QixFQUErQyxnQkFBL0MsQ0FuREEsQ0FBQTtTQXFEQSxpQkF2RGdEO0FBQUEsQ0FBbEQsQ0FBQSxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lIFsnZXh0ZXJuYWxBcHAvYmFzZScsJ2FuZ3VsYXJqcycsICdmYmFzZSddLCAoQ2FtcGFpZ25DdHJsQXBwKSAtPlxuXG4gIGNsYXNzIFNpZ251cENvbnRyb2xsZXJcblxuICAgIGNvbnN0cnVjdG9yOiAoJHNjb3BlLCBGaXJlYmFzZVNlcnZpY2UpIC0+XG5cbiAgICAgIGlmIEZpcmViYXNlU2VydmljZS5hdXRoRGF0YSAmJiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT0gJy9zaWduLXVwJ1xuICAgICAgICB3aW5kb3cubG9jYXRpb24gPSAnL2FwcCdcbiAgICAgIGVsc2VcbiAgICAgICAgJHNjb3BlLnVzZXIgPSB7fVxuICAgICAgICAkc2NvcGUuYWxlcnRJbmZvID0ge3NwaW5uZXI6IGZhbHNlLCBhbGVydDogZmFsc2V9XG5cbiAgICAgICAgJHNjb3BlLmNyZWF0ZU5ld1VzZXIgPSAobmV3VXNlckZvcm0pIC0+XG4gICAgICAgICAgaWYgbmV3VXNlckZvcm0uJHZhbGlkXG4gICAgICAgICAgICAkc2NvcGUuYWxlcnRJbmZvID0ge3NwaW5uZXI6IHRydWUsIGFsZXJ0OiBmYWxzZX1cblxuXG4gICAgICAgICAgICBGaXJlYmFzZVNlcnZpY2Uucm9vdFJlZi5jcmVhdGVVc2VyIHtcbiAgICAgICAgICAgICAgZW1haWw6ICRzY29wZS51c2VyLmVtYWlsXG4gICAgICAgICAgICAgIHBhc3N3b3JkOiAkc2NvcGUudXNlci5wYXNzd29yZFxuICAgICAgICAgICAgfSwgKGVycm9yLCB1c2VyRGF0YSkgLT5cbiAgICAgICAgICAgICAgaWYgZXJyb3JcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyBlcnJvclxuICAgICAgICAgICAgICAgIHN3aXRjaCBlcnJvci5jb2RlXG4gICAgICAgICAgICAgICAgICB3aGVuICdFTUFJTF9UQUtFTidcblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFsZXJ0SW5mbyA9IHtzcGlubmVyOiBmYWxzZSwgYWxlcnQ6IHRydWUsIGFsZXJ0TXNnOiBcIlRoZSBlbWFpbCBpcyBhbHJlYWR5IGluIHVzZS5cIn1cblxuICAgICAgICAgICAgICAgICAgd2hlbiAnSU5WQUxJRF9FTUFJTCdcblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFsZXJ0SW5mbyA9IHtzcGlubmVyOiBmYWxzZSwgYWxlcnQ6IHRydWUsIGFsZXJ0TXNnOiBcIlRoZSBzcGVjaWZpZWQgZW1haWwgaXMgbm90IGEgdmFsaWQgZW1haWwuXCJ9XG5cbiAgICAgICAgICAgICAgICAgIGVsc2VcblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmFsZXJ0SW5mbyA9IHtzcGlubmVyOiBmYWxzZSwgYWxlcnQ6IHRydWUsIGFsZXJ0TXNnOiBcIkVycm9yOiAje2Vycm9yfVwifVxuXG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB1c3JSZWYgPSBGaXJlYmFzZVNlcnZpY2Uucm9vdFJlZi5jaGlsZChcInVzZXJzLyN7dXNlckRhdGEudWlkfVwiKVxuICAgICAgICAgICAgICAgIHJlZ2lzdGVyUmVmID0gRmlyZWJhc2VTZXJ2aWNlLnJvb3RSZWYuY2hpbGQoXCJyZWdpc3RyYXRpb25zLyN7dXNlckRhdGEudWlkfVwiKVxuICAgICAgICAgICAgICAgIHVzclJlZi5jaGlsZCgnYmFzaWMnKS5zZXQge2ZpcnN0TmFtZTogJHNjb3BlLnVzZXIuZmlyc3ROYW1lLCBsYXN0TmFtZTogJHNjb3BlLnVzZXIubGFzdE5hbWUsIGVtYWlsOiAkc2NvcGUudXNlci5lbWFpbCwgY3JlYXRlZEF0OiBtb21lbnQoKS51bml4KCl9XG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJSZWYuc2V0IHtmaXJzdE5hbWU6ICRzY29wZS51c2VyLmZpcnN0TmFtZSwgbGFzdE5hbWU6ICRzY29wZS51c2VyLmxhc3ROYW1lLCBlbWFpbDogJHNjb3BlLnVzZXIuZW1haWwsIHBhc3N3b3JkOiAkc2NvcGUudXNlci5wYXNzd29yZCwgY3JlYXRlZEF0OiBtb21lbnQoKS51bml4KCl9XG4gICAgICAgICAgICAgICAgcmVnaXN0ZXJSZWYuc2V0UHJpb3JpdHkgJHNjb3BlLnVzZXIuZW1haWxcbiAgICAgICAgICAgICAgICB1c3JSZWYuc2V0UHJpb3JpdHkgJHNjb3BlLnVzZXIuZW1haWxcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5IC0+XG4gICAgICAgICAgICAgICAgICAkc2NvcGUuYWxlcnRJbmZvID0ge3NwaW5uZXI6IGZhbHNlLCBhbGVydDogdHJ1ZSwgYWxlcnRNc2c6IFwiVXNlciBhZGRlZCBzdWNjZXNzZnVsbHkuXCJ9XG5cblxuXG4gIFNpZ251cENvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIkZpcmViYXNlU2VydmljZVwiXVxuXG4gIENhbXBhaWduQ3RybEFwcC5jb250cm9sbGVyICdTaWdudXBDb250cm9sbGVyJywgU2lnbnVwQ29udHJvbGxlclxuXG4gIFNpZ251cENvbnRyb2xsZXIiXX0=
