
define ['externalApp/base','angularjs', 'fbase'], (CampaignCtrlApp) ->

  class SignupController

    constructor: ($scope, FirebaseService) ->

      if FirebaseService.authData && window.location.pathname == '/sign-up'
        window.location = '/app'
      else
        $scope.user = {}
        $scope.alertInfo = {spinner: false, alert: false}

        $scope.createNewUser = (newUserForm) ->
          if newUserForm.$valid
            $scope.alertInfo = {spinner: true, alert: false}


            FirebaseService.rootRef.createUser {
              email: $scope.user.email
              password: $scope.user.password
            }, (error, userData) ->
              if error
                console.log error
                switch error.code
                  when 'EMAIL_TAKEN'

                    $scope.$apply ->
                      $scope.alertInfo = {spinner: false, alert: true, alertMsg: "The email is already in use."}

                  when 'INVALID_EMAIL'

                    $scope.$apply ->
                      $scope.alertInfo = {spinner: false, alert: true, alertMsg: "The specified email is not a valid email."}

                  else

                    $scope.$apply ->
                      $scope.alertInfo = {spinner: false, alert: true, alertMsg: "Error: #{error}"}

              else
                usrRef = FirebaseService.rootRef.child("users/#{userData.uid}")
                registerRef = FirebaseService.rootRef.child("registrations/#{userData.uid}")
                usrRef.child('basic').set {mentor: true, firstName: $scope.user.firstName, lastName: $scope.user.lastName, email: $scope.user.email, createdAt: moment().unix()}
                registerRef.set {mentor: true, firstName: $scope.user.firstName, lastName: $scope.user.lastName, email: $scope.user.email, password: $scope.user.password, createdAt: moment().unix()}
                registerRef.setPriority 'mentor'
                usrRef.setPriority 'mentor'
                $scope.$apply ->
                  $scope.alertInfo = {spinner: false, alert: true, alertMsg: "User added successfully."}


        $scope.createNewParent = (newParentForm) ->
          if newParentForm.$valid
            parentRef = FirebaseService.rootRef.child('parents').push()
            parentRef.set {firstName: $scope.parent.firstName, lastName: $scope.parent.lastName}




  SignupController.$inject = ["$scope", "FirebaseService"]

  CampaignCtrlApp.controller 'SignupController', SignupController

  SignupController