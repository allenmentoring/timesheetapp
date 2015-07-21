unless document.location.hash == ""
  document.location.href = document.location.href.replace(document.location.hash , "" )

require ['angularjs', 'fbase', 'app/base',
         'app/controllers/nav_controller',
         'app/controllers/dashboard_controller',
         'app/services/firebase_service', 'jquery', 'moment', 'flatUi'
         'vendor/underscore'], (angular ,Firebase, TimeSheetApp,
                                NavBarController, DashBoardController,
                                FirebaseService, $, moment, flatui , _) ->

