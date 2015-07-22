
define ['app/base', 'fbase'], (TimeSheetApp, Firebase) ->


  class FirebaseService

    constructor:() ->
      @rootRef = new Firebase(document.querySelector('.custom-container').getAttribute('data-root-url'))
      @authData = @rootRef.getAuth()


  FirebaseService.$inject = []
  TimeSheetApp.service "FirebaseService", FirebaseService