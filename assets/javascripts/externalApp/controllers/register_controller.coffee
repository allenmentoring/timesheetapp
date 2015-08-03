define ['externalApp/base','angularjs', 'fbase'], (TimeSheetApp) ->

  class RegisterController

    constructor: ($scope, FirebaseService, $firebaseObject, $firebaseArray) ->

      $scope.users = $firebaseObject(FirebaseService.rootRef.child('registrations'))
      $scope.parents = $firebaseObject(FirebaseService.rootRef.child('parents'))

      $scope.assignManager = (user, id) ->
        FirebaseService.rootRef.child("users/#{id}/basic/manager").set true
        FirebaseService.rootRef.child("users/#{id}/basic/mentor").set false
        FirebaseService.rootRef.child("users/#{id}").setPriority 'manager'

        FirebaseService.rootRef.child("registrations/#{id}/manager").set true
        FirebaseService.rootRef.child("registrations/#{id}/mentor").set false
        FirebaseService.rootRef.child("registrations/#{id}").setPriority 'manager'

      $scope.assignMentor = (user, id) ->
        FirebaseService.rootRef.child("users/#{id}/basic/manager").set false
        FirebaseService.rootRef.child("users/#{id}/basic/mentor").set true
        FirebaseService.rootRef.child("users/#{id}").setPriority 'mentor'

        FirebaseService.rootRef.child("registrations/#{id}/manager").set false
        FirebaseService.rootRef.child("registrations/#{id}/mentor").set true
        FirebaseService.rootRef.child("registrations/#{id}").setPriority 'mentor'

      $scope.sendEmail = (user, id) ->
        FirebaseService.rootRef.child("queues/sendCredentialsEmail").push().set {userId: id}
        alert 'All Set!'


      $scope.createNewChild = (newChildForm, parentId, theChild, parent) ->
        if newChildForm.$valid
          studentRef = FirebaseService.rootRef.child('students').push()
          studentRef.set {firstName: theChild.firstName, lastName: theChild.lastName}

          FirebaseService.rootRef.child("parents/#{parentId}").child('children').push().set {firstName: theChild.firstName, lastName: theChild.lastName, studentId: studentRef.key()}
          studentRef.child('parent').set {firstName: parent.firstName, lastName: parent.lastName, parentId: parentId}


  RegisterController.$inject = ["$scope", "FirebaseService", "$firebaseObject", "$firebaseArray"]

  TimeSheetApp.controller 'RegisterController', RegisterController

  RegisterController