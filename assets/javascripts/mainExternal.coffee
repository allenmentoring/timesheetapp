require ['angularjs', 'fbase', 'externalApp/base',
         'externalApp/controllers/signup_controller',
         'externalApp/controllers/signin_controller',
         'externalApp/controllers/nav_controller',
         'externalApp/controllers/external_controller',
         'externalApp/controllers/register_controller',
         'externalApp/services/firebase_service', 'jquery',
         'vendor/underscore', 'moment', 'afire'], (angular, Firebase, TimeSheetApp ,
                                          SignupController, SigninController, NavBarController,ExternalController,
                                          RegisterController, FirebaseService,
                                          $, flatui, _, moment) ->



