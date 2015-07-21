define ['externalApp/base','angularjs', 'fbase'], (TimeSheetApp) ->

  class SigninController

    constructor: ($scope, FirebaseService) ->
      if FirebaseService.authData
        window.location = '/app'
      else
        $scope.user = {}
        $scope.alertInfo = {spinner: false, alert: false}

        $scope.logInUser = (userForm) ->
          if userForm.$valid
            $scope.alertInfo = {spinner: true, alert: false}
            console.log $scope.user
            FirebaseService.rootRef.authWithPassword {
              'email': $scope.user.email
              'password': $scope.user.password
            }, (error, authData) ->
              if error
                console.log error
                switch error.code

                  when 'INVALID_USER'
                    $scope.$apply ->
                      $scope.alertInfo = {spinner: false, alert: true, alertMsg: "The user does not exist."}


                  when 'INVALID_PASSWORD'
                    $scope.$apply ->
                      $scope.alertInfo = {spinner: false, alert: true, alertMsg: "The password is incorrect."}

              else
                console.log 'Authenticated successfully with payload:', authData
                FirebaseService.authData = authData
                window.location = '/app'


        $scope.forgotPassword = ($event) ->
          $event.preventDefault()
          $scope.showForgotPassword = !$scope.showForgotPassword

        $scope.sendResetEmail = (forgotPasswordForm) ->
          if forgotPasswordForm.$valid
            $scope.alertInfo = {spinner: true, alert: false}
            console.log $scope.forgotEmail

            FirebaseService.rootRef.resetPassword {email: $scope.forgotEmail}, (error) ->
              if error
                switch error.code
                  when 'INVALID_USER'
                    $scope.$apply ->
                      $scope.alertInfo = {spinner: false, alert: true, alertMsg: "The user does not exist."}
                  else
                    $scope.$apply ->
                      $scope.alertInfo = {spinner: false, alert: true, alertMsg: "Error resetting password"}
              else
                $scope.$apply ->
                  $scope.alertInfo = {spinner: false, alert: true, alertMsg: 'Reset email sent successfully!'}
              return




  SigninController.$inject = ["$scope", "FirebaseService"]

  TimeSheetApp.controller 'SigninController', SigninController

  SigninController