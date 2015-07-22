define(['externalApp/base', 'angularjs', 'fbase'], function(TimeSheetApp) {
  var RegisterController;
  RegisterController = (function() {
    function RegisterController($scope, FirebaseService, $firebaseObject, $firebaseArray) {
      $scope.users = $firebaseObject(FirebaseService.rootRef.child('registrations'));
      $scope.assignManager = function(user, id) {
        FirebaseService.rootRef.child("users/" + id + "/basic/manager").set(true);
        FirebaseService.rootRef.child("users/" + id + "/basic/mentor").set(false);
        FirebaseService.rootRef.child("users/" + id).setPriority('manager');
        FirebaseService.rootRef.child("registrations/" + id + "/manager").set(true);
        FirebaseService.rootRef.child("registrations/" + id + "/mentor").set(false);
        return FirebaseService.rootRef.child("registrations/" + id).setPriority('manager');
      };
      $scope.assignMentor = function(user, id) {
        FirebaseService.rootRef.child("users/" + id + "/basic/manager").set(false);
        FirebaseService.rootRef.child("users/" + id + "/basic/mentor").set(true);
        FirebaseService.rootRef.child("users/" + id).setPriority('mentor');
        FirebaseService.rootRef.child("registrations/" + id + "/manager").set(false);
        FirebaseService.rootRef.child("registrations/" + id + "/mentor").set(true);
        return FirebaseService.rootRef.child("registrations/" + id).setPriority('mentor');
      };
      $scope.sendEmail = function(user, id) {
        FirebaseService.rootRef.child("queues/sendCredentialsEmail").push().set({
          userId: id
        });
        return alert('All Set!');
      };
    }

    return RegisterController;

  })();
  RegisterController.$inject = ["$scope", "FirebaseService", "$firebaseObject", "$firebaseArray"];
  TimeSheetApp.controller('RegisterController', RegisterController);
  return RegisterController;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvdGltZXNoZWV0YXBwL3B1YmxpYy9qYXZhc2NyaXB0cy9leHRlcm5hbEFwcC9jb250cm9sbGVycy9yZWdpc3Rlcl9jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvdGltZXNoZWV0YXBwL2Fzc2V0cy9qYXZhc2NyaXB0cy9leHRlcm5hbEFwcC9jb250cm9sbGVycy9yZWdpc3Rlcl9jb250cm9sbGVyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFBLENBQU8sQ0FBRSxrQkFBRixFQUFxQixXQUFyQixFQUFrQyxPQUFsQyxDQUFQLEVBQWtELFNBQUMsWUFBRCxHQUFBO0FBRWhELE1BQUEsa0JBQUE7QUFBQSxFQUFNO0FBRVMsSUFBQSw0QkFBQyxNQUFELEVBQVMsZUFBVCxFQUEwQixlQUExQixFQUEyQyxjQUEzQyxHQUFBO0FBRVgsTUFBQSxNQUFNLENBQUMsS0FBUCxHQUFlLGVBQUEsQ0FBZ0IsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUF4QixDQUErQixlQUEvQixDQUFoQixDQUFmLENBQUE7QUFBQSxNQUVBLE1BQU0sQ0FBQyxhQUFQLEdBQXVCLFNBQUMsSUFBRCxFQUFPLEVBQVAsR0FBQTtBQUNyQixRQUFBLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBeEIsQ0FBK0IsUUFBQSxHQUFRLEVBQVIsR0FBVyxnQkFBMUMsQ0FBMEQsQ0FBQyxHQUEzRCxDQUErRCxJQUEvRCxDQUFBLENBQUE7QUFBQSxRQUNBLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBeEIsQ0FBK0IsUUFBQSxHQUFRLEVBQVIsR0FBVyxlQUExQyxDQUF5RCxDQUFDLEdBQTFELENBQThELEtBQTlELENBREEsQ0FBQTtBQUFBLFFBRUEsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUF4QixDQUErQixRQUFBLEdBQVEsRUFBdkMsQ0FBNEMsQ0FBQyxXQUE3QyxDQUEwRCxTQUExRCxDQUZBLENBQUE7QUFBQSxRQUlBLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBeEIsQ0FBK0IsZ0JBQUEsR0FBZ0IsRUFBaEIsR0FBbUIsVUFBbEQsQ0FBNEQsQ0FBQyxHQUE3RCxDQUFpRSxJQUFqRSxDQUpBLENBQUE7QUFBQSxRQUtBLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBeEIsQ0FBK0IsZ0JBQUEsR0FBZ0IsRUFBaEIsR0FBbUIsU0FBbEQsQ0FBMkQsQ0FBQyxHQUE1RCxDQUFnRSxLQUFoRSxDQUxBLENBQUE7ZUFNQSxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQXhCLENBQStCLGdCQUFBLEdBQWdCLEVBQS9DLENBQW9ELENBQUMsV0FBckQsQ0FBa0UsU0FBbEUsRUFQcUI7TUFBQSxDQUZ2QixDQUFBO0FBQUEsTUFXQSxNQUFNLENBQUMsWUFBUCxHQUFzQixTQUFDLElBQUQsRUFBTyxFQUFQLEdBQUE7QUFDcEIsUUFBQSxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQXhCLENBQStCLFFBQUEsR0FBUSxFQUFSLEdBQVcsZ0JBQTFDLENBQTBELENBQUMsR0FBM0QsQ0FBK0QsS0FBL0QsQ0FBQSxDQUFBO0FBQUEsUUFDQSxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQXhCLENBQStCLFFBQUEsR0FBUSxFQUFSLEdBQVcsZUFBMUMsQ0FBeUQsQ0FBQyxHQUExRCxDQUE4RCxJQUE5RCxDQURBLENBQUE7QUFBQSxRQUVBLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBeEIsQ0FBK0IsUUFBQSxHQUFRLEVBQXZDLENBQTRDLENBQUMsV0FBN0MsQ0FBMEQsUUFBMUQsQ0FGQSxDQUFBO0FBQUEsUUFJQSxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQXhCLENBQStCLGdCQUFBLEdBQWdCLEVBQWhCLEdBQW1CLFVBQWxELENBQTRELENBQUMsR0FBN0QsQ0FBaUUsS0FBakUsQ0FKQSxDQUFBO0FBQUEsUUFLQSxlQUFlLENBQUMsT0FBTyxDQUFDLEtBQXhCLENBQStCLGdCQUFBLEdBQWdCLEVBQWhCLEdBQW1CLFNBQWxELENBQTJELENBQUMsR0FBNUQsQ0FBZ0UsSUFBaEUsQ0FMQSxDQUFBO2VBTUEsZUFBZSxDQUFDLE9BQU8sQ0FBQyxLQUF4QixDQUErQixnQkFBQSxHQUFnQixFQUEvQyxDQUFvRCxDQUFDLFdBQXJELENBQWtFLFFBQWxFLEVBUG9CO01BQUEsQ0FYdEIsQ0FBQTtBQUFBLE1Bb0JBLE1BQU0sQ0FBQyxTQUFQLEdBQW1CLFNBQUMsSUFBRCxFQUFPLEVBQVAsR0FBQTtBQUNqQixRQUFBLGVBQWUsQ0FBQyxPQUFPLENBQUMsS0FBeEIsQ0FBK0IsNkJBQS9CLENBQTRELENBQUMsSUFBN0QsQ0FBQSxDQUFtRSxDQUFDLEdBQXBFLENBQXdFO0FBQUEsVUFBQyxNQUFBLEVBQVEsRUFBVDtTQUF4RSxDQUFBLENBQUE7ZUFDQSxLQUFBLENBQU8sVUFBUCxFQUZpQjtNQUFBLENBcEJuQixDQUZXO0lBQUEsQ0FBYjs7OEJBQUE7O01BRkYsQ0FBQTtBQUFBLEVBNkJBLGtCQUFrQixDQUFDLE9BQW5CLEdBQTZCLENBQUUsUUFBRixFQUFZLGlCQUFaLEVBQStCLGlCQUEvQixFQUFrRCxnQkFBbEQsQ0E3QjdCLENBQUE7QUFBQSxFQStCQSxZQUFZLENBQUMsVUFBYixDQUF5QixvQkFBekIsRUFBOEMsa0JBQTlDLENBL0JBLENBQUE7U0FpQ0EsbUJBbkNnRDtBQUFBLENBQWxELENBQUEsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImRlZmluZSBbJ2V4dGVybmFsQXBwL2Jhc2UnLCdhbmd1bGFyanMnLCAnZmJhc2UnXSwgKFRpbWVTaGVldEFwcCkgLT5cblxuICBjbGFzcyBSZWdpc3RlckNvbnRyb2xsZXJcblxuICAgIGNvbnN0cnVjdG9yOiAoJHNjb3BlLCBGaXJlYmFzZVNlcnZpY2UsICRmaXJlYmFzZU9iamVjdCwgJGZpcmViYXNlQXJyYXkpIC0+XG5cbiAgICAgICRzY29wZS51c2VycyA9ICRmaXJlYmFzZU9iamVjdChGaXJlYmFzZVNlcnZpY2Uucm9vdFJlZi5jaGlsZCgncmVnaXN0cmF0aW9ucycpKVxuXG4gICAgICAkc2NvcGUuYXNzaWduTWFuYWdlciA9ICh1c2VyLCBpZCkgLT5cbiAgICAgICAgRmlyZWJhc2VTZXJ2aWNlLnJvb3RSZWYuY2hpbGQoXCJ1c2Vycy8je2lkfS9iYXNpYy9tYW5hZ2VyXCIpLnNldCB0cnVlXG4gICAgICAgIEZpcmViYXNlU2VydmljZS5yb290UmVmLmNoaWxkKFwidXNlcnMvI3tpZH0vYmFzaWMvbWVudG9yXCIpLnNldCBmYWxzZVxuICAgICAgICBGaXJlYmFzZVNlcnZpY2Uucm9vdFJlZi5jaGlsZChcInVzZXJzLyN7aWR9XCIpLnNldFByaW9yaXR5ICdtYW5hZ2VyJ1xuXG4gICAgICAgIEZpcmViYXNlU2VydmljZS5yb290UmVmLmNoaWxkKFwicmVnaXN0cmF0aW9ucy8je2lkfS9tYW5hZ2VyXCIpLnNldCB0cnVlXG4gICAgICAgIEZpcmViYXNlU2VydmljZS5yb290UmVmLmNoaWxkKFwicmVnaXN0cmF0aW9ucy8je2lkfS9tZW50b3JcIikuc2V0IGZhbHNlXG4gICAgICAgIEZpcmViYXNlU2VydmljZS5yb290UmVmLmNoaWxkKFwicmVnaXN0cmF0aW9ucy8je2lkfVwiKS5zZXRQcmlvcml0eSAnbWFuYWdlcidcblxuICAgICAgJHNjb3BlLmFzc2lnbk1lbnRvciA9ICh1c2VyLCBpZCkgLT5cbiAgICAgICAgRmlyZWJhc2VTZXJ2aWNlLnJvb3RSZWYuY2hpbGQoXCJ1c2Vycy8je2lkfS9iYXNpYy9tYW5hZ2VyXCIpLnNldCBmYWxzZVxuICAgICAgICBGaXJlYmFzZVNlcnZpY2Uucm9vdFJlZi5jaGlsZChcInVzZXJzLyN7aWR9L2Jhc2ljL21lbnRvclwiKS5zZXQgdHJ1ZVxuICAgICAgICBGaXJlYmFzZVNlcnZpY2Uucm9vdFJlZi5jaGlsZChcInVzZXJzLyN7aWR9XCIpLnNldFByaW9yaXR5ICdtZW50b3InXG5cbiAgICAgICAgRmlyZWJhc2VTZXJ2aWNlLnJvb3RSZWYuY2hpbGQoXCJyZWdpc3RyYXRpb25zLyN7aWR9L21hbmFnZXJcIikuc2V0IGZhbHNlXG4gICAgICAgIEZpcmViYXNlU2VydmljZS5yb290UmVmLmNoaWxkKFwicmVnaXN0cmF0aW9ucy8je2lkfS9tZW50b3JcIikuc2V0IHRydWVcbiAgICAgICAgRmlyZWJhc2VTZXJ2aWNlLnJvb3RSZWYuY2hpbGQoXCJyZWdpc3RyYXRpb25zLyN7aWR9XCIpLnNldFByaW9yaXR5ICdtZW50b3InXG5cbiAgICAgICRzY29wZS5zZW5kRW1haWwgPSAodXNlciwgaWQpIC0+XG4gICAgICAgIEZpcmViYXNlU2VydmljZS5yb290UmVmLmNoaWxkKFwicXVldWVzL3NlbmRDcmVkZW50aWFsc0VtYWlsXCIpLnB1c2goKS5zZXQge3VzZXJJZDogaWR9XG4gICAgICAgIGFsZXJ0ICdBbGwgU2V0ISdcblxuXG4gIFJlZ2lzdGVyQ29udHJvbGxlci4kaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiRmlyZWJhc2VTZXJ2aWNlXCIsIFwiJGZpcmViYXNlT2JqZWN0XCIsIFwiJGZpcmViYXNlQXJyYXlcIl1cblxuICBUaW1lU2hlZXRBcHAuY29udHJvbGxlciAnUmVnaXN0ZXJDb250cm9sbGVyJywgUmVnaXN0ZXJDb250cm9sbGVyXG5cbiAgUmVnaXN0ZXJDb250cm9sbGVyIl19
