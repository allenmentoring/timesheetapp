
define ['externalApp/base'], (TimeSheetApp) ->

  class FirebaseService

    constructor:() ->
      @rootRef = new Firebase(document.querySelector('.container-handle').getAttribute('data-root-url'))
      @authData = @rootRef.getAuth()


  TimeSheetApp.service "FirebaseService", [FirebaseService]