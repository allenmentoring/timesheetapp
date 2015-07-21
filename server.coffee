express = require 'express'
bodyParser = require 'body-parser'
engines = require 'consolidate'
compression = require 'compression'
favicon = require 'serve-favicon'
cookieParser = require 'cookie-parser'
errorHandler = require 'errorhandler'
auth = require('http-auth')

exports.startServer = (config, callback) ->
  app = express()

#  auth = express.basicAuth((user, pass) ->
#    user == 'user' and pass == 'pass'
#  )

  basic = auth.basic({ realm: 'USER REGISTRATIONS' }, (username, password, callback) ->
    callback username == 'allen' and password == 'foil6sense'
    return
  )

  authMiddleware = auth.connect(basic)

  if process.env.NODE_ENV != "production"
    RunChowkidar =   require './run_chowkidar'
    (new RunChowkidar).run()

  AppVars = require './lib/app_vars'
  newVar = new AppVars(app: app)
  config.appVars = newVar.getVars()

  # setup views and port
  app.set 'views', config.server.views.path
  app.engine config.server.views.extension, engines[config.server.views.compileWith]
  app.set 'view engine', config.server.views.extension
  app.set 'port', process.env.PORT || config.server.port || 3000

  # middleware
  app.use compression()
  # uncomment and point path at favicon if you have one
  # app.use favicon "path to fav icon"
  app.use bodyParser.json()
  app.use bodyParser.urlencoded {extended: true}
  app.use cookieParser()
  app.use express.static config.watch.compiledDir
  if app.get('env') is 'development'
    app.use errorHandler()

  routeOptions =
    reload:    config.liveReload.enabled
    optimize:  config.isOptimize ? false
    cachebust: if process.env.NODE_ENV isnt "production" then "?b=#{(new Date()).getTime()}" else ''
    rootUrl: config.appVars.rootUrl
    minifiedSource: if process.env.NODE_ENV isnt "production" then false else true

  router = express.Router()
  router.get '/', (req, res) ->
    res.render 'index', routeOptions

  router.get '/sign-in', (req, res) ->
    res.render 'sign-in', routeOptions

  router.get '/register', authMiddleware, (req, res) ->
    res.render 'register', routeOptions

  router.get '/app', (req, res) ->
    res.render 'app', routeOptions

#  router.get '/sign-up', (req, res) ->
#    res.render 'sign-up', routeOptions
    

  # routes
  app.use '/', router

  # start it up
  server = app.listen app.get('port'), ->
    console.log 'Express server listening on port ' + app.get('port')

  callback server