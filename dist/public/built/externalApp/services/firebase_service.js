define(['externalApp/base'], function(TimeSheetApp) {
  var FirebaseService;
  FirebaseService = (function() {
    function FirebaseService() {
      this.rootRef = new Firebase(document.querySelector('.container-handle').getAttribute('data-root-url'));
      this.authData = this.rootRef.getAuth();
    }

    return FirebaseService;

  })();
  return TimeSheetApp.service("FirebaseService", [FirebaseService]);
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvdGltZXNoZWV0YXBwL3B1YmxpYy9qYXZhc2NyaXB0cy9leHRlcm5hbEFwcC9zZXJ2aWNlcy9maXJlYmFzZV9zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL1VzZXJzL2tyaXNobmFyb2toYWxlL2NvZGUvbGV2ZWwvbGV2ZWwvdGltZXNoZWV0YXBwL2Fzc2V0cy9qYXZhc2NyaXB0cy9leHRlcm5hbEFwcC9zZXJ2aWNlcy9maXJlYmFzZV9zZXJ2aWNlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxNQUFBLENBQU8sQ0FBRSxrQkFBRixDQUFQLEVBQTZCLFNBQUMsWUFBRCxHQUFBO0FBRTNCLE1BQUEsZUFBQTtBQUFBLEVBQU07QUFFUSxJQUFBLHlCQUFBLEdBQUE7QUFDVixNQUFBLElBQUMsQ0FBQSxPQUFELEdBQWUsSUFBQSxRQUFBLENBQVMsUUFBUSxDQUFDLGFBQVQsQ0FBd0IsbUJBQXhCLENBQTJDLENBQUMsWUFBNUMsQ0FBMEQsZUFBMUQsQ0FBVCxDQUFmLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxRQUFELEdBQVksSUFBQyxDQUFBLE9BQU8sQ0FBQyxPQUFULENBQUEsQ0FEWixDQURVO0lBQUEsQ0FBWjs7MkJBQUE7O01BRkYsQ0FBQTtTQU9BLFlBQVksQ0FBQyxPQUFiLENBQXNCLGlCQUF0QixFQUF3QyxDQUFDLGVBQUQsQ0FBeEMsRUFUMkI7QUFBQSxDQUE3QixDQUFBLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJcbmRlZmluZSBbJ2V4dGVybmFsQXBwL2Jhc2UnXSwgKFRpbWVTaGVldEFwcCkgLT5cblxuICBjbGFzcyBGaXJlYmFzZVNlcnZpY2VcblxuICAgIGNvbnN0cnVjdG9yOigpIC0+XG4gICAgICBAcm9vdFJlZiA9IG5ldyBGaXJlYmFzZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFpbmVyLWhhbmRsZScpLmdldEF0dHJpYnV0ZSgnZGF0YS1yb290LXVybCcpKVxuICAgICAgQGF1dGhEYXRhID0gQHJvb3RSZWYuZ2V0QXV0aCgpXG5cblxuICBUaW1lU2hlZXRBcHAuc2VydmljZSBcIkZpcmViYXNlU2VydmljZVwiLCBbRmlyZWJhc2VTZXJ2aWNlXSJdfQ==
