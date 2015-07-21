define ['externalApp/base','angularjs', 'fbase'], (TimeSheetApp) ->

  class RegisterController

    constructor: ($scope, FirebaseService, $firebaseObject, $firebaseArray) ->

      $scope.users = $firebaseObject(FirebaseService.rootRef.child('registrations'))

      $scope.assignManager = (user, id) ->
        FirebaseService.rootRef.child("users/#{id}/basic/manager").set true
        FirebaseService.rootRef.child("users/#{id}/basic/mentor").set false

        FirebaseService.rootRef.child("registrations/#{id}/manager").set true
        FirebaseService.rootRef.child("registrations/#{id}/mentor").set false

      $scope.assignMentor = (user, id) ->
        FirebaseService.rootRef.child("users/#{id}/basic/manager").set false
        FirebaseService.rootRef.child("users/#{id}/basic/mentor").set true

        FirebaseService.rootRef.child("registrations/#{id}/manager").set false
        FirebaseService.rootRef.child("registrations/#{id}/mentor").set true

      $scope.sendEmail = (user, id) ->
        FirebaseService.rootRef.child("queues/sendCredentialsEmail").push().set {userId: id}
        alert 'All Set!'


  RegisterController.$inject = ["$scope", "FirebaseService", "$firebaseObject", "$firebaseArray"]

  TimeSheetApp.controller 'RegisterController', RegisterController

  RegisterController