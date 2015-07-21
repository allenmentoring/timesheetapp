
define ['app/base', 'fbase'], (CampaignCtrlApp, Firebase) ->


  class FirebaseService

    constructor:() ->
      @rootRef = new Firebase(document.querySelector('.custom-container').getAttribute('data-root-url'))
      @authData = @rootRef.getAuth()


  FirebaseService.$inject = []
  CampaignCtrlApp.service "FirebaseService", FirebaseService