
require =
  optimize: 'none'
  waitSeconds: 600
  #urlArgs: new Date().getTime().toString()

  #appDir: '../assets/javascripts/app'
  baseUrl: '../javascripts'
  dir: '../builtExternal'

  paths:
    angularjs: 'vendor/angular'
    jquery: 'vendor/jquery.min'
    fbase: 'vendor/firebase'
    moment: 'vendor/moment'
    anganimate: 'vendor/angular-animate'
    sanitize: 'vendor/angular-sanitize'
    afire: 'vendor/afire'

  shim:
    angularjs:
      exports: 'angular'
    jquery:
      exports: '$'
      deps: ['angularjs']
    fbase:
      exports: 'Firebase'
    moment:
      exports: 'moment'
    sanitize:
      deps: ['angularjs']
      exports: 'angular'
    anganimate:
      deps: ['angularjs']
      exports: 'angular'
    afire:
      deps: ['fbase', 'angularjs']



  modules: [
    {
      name: "applicationExternal"

      include: [
        'mainExternal'
      ]
    }

  ]
  priority: ['applicationExternal']



