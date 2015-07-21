chokidar = require("chokidar")


class RunChowkidar

  options: {}

  constructor: (@options) ->


  run: ->
    require("chokidar").watch("./public/javascripts",
      ignored: /[\/\\]\./
    ).on "change", (path, event) ->
      console.log path
#      unless path == 'public/javascripts/refresh_screen.txt' || path == 'public/javascripts/build.js' || path == 'public/javascripts/buildExternal.js'
#        setTimeout ->
#          exec = require("child_process").exec
#          exec "node node_modules/requirejs/bin/r.js -o ./public/javascripts/build.js", (error, stdout, stderr) ->
#            console.log stdout
#            exec "touch .assets/javascripts/refresh_screen.txt"
#            exec "node node_modules/requirejs/bin/r.js -o ./public/javascripts/buildExternal.js", (error, stdout, stderr) ->
#              console.log stdout
#              exec "touch .assets/javascripts/refresh_screen.txt"
#        , 1000
#        setTimeout ->
#          exec = require("child_process").exec
#          exec "node node_modules/requirejs/bin/r.js -o ./public/javascripts/buildExternal.js", (error, stdout, stderr) ->
#            console.log stdout
#            exec "touch .assets/javascripts/refresh_screen.txt"
#        , 2000




exports = module.exports = RunChowkidar