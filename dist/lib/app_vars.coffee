Firebase = require('firebase')
_ = require('underscore')
Emailer = require('../lib/mail_sender')
moment = require 'moment'



class AppVars

  options: {}

  constructor: (@options) ->


  getVars: () =>
    theVars = {}
    theVars._ = _
    theVars.moment = moment
    theVars.Emailer = Emailer



    if @options.app.settings.env == 'production'
      currentServer = ''

      rootUrl = 'https://am-timesheets.firebaseio.com/'

      rootRef = new Firebase(rootUrl)

#      mailgunUser = "postmaster@gilders.in"
#      mailgunPassword = "17998c2efeb7d868f7585371773d1aeas"
      mailgunUser = "postmaster@allenmentoring.com"
      mailgunPassword = "92c5a30f29cba6e5923c23a2d7105cd8"

      faceBookAppId = ''

      currentEnv = 'production'


    else
      rootUrl = 'https://am-timesheets.firebaseio.com/'
      rootRef = new Firebase(rootUrl)

      currentServer = 'http://localhost:3000'

      mailgunUser = "postmaster@allenmentoring.com"
      mailgunPassword = "92c5a30f29cba6e5923c23a2d7105cd8"

#      mailgunUser = "postmaster@gilders.in"
      #      mailgunPassword = "17998c2efeb7d868f7585371773d1aeas"

      faceBookAppId = ''


      currentEnv = 'development'


    theVars.Firebase = Firebase
    theVars.rootRef = rootRef
    theVars.rootUrl = rootUrl

    theVars.currentServer = currentServer
    theVars.mailgunUser = mailgunUser
    theVars.mailgunPassword = mailgunPassword
    theVars.faceBookAppId = faceBookAppId

    timeSheetTriggers = require './timesheet_triggers'
    timeSheetTriggers.timeSheetTriggers(theVars)

    theVars.currentEnv = currentEnv


    theVars



exports = module.exports = AppVars