
require =
  optimize: 'none'
  waitSeconds: 600
  #urlArgs: new Date().getTime().toString()

  #appDir: '../assets/javascripts/app'
  baseUrl: '../javascripts'
  dir: '../built'

  paths:
    angularjs: 'vendor/angular'
    jquery: 'vendor/jquery.min'
    flatUi: 'vendor/flatuipro.min'
    fbase: 'vendor/firebase'
    angularroute: 'vendor/angular-route'
    basefileupload: 'vendor/angular-base64-upload'
    sanitize: 'vendor/angular-sanitize'
    anganimate: 'vendor/angular-animate'
    moment: 'vendor/moment'
    afire: 'vendor/afire'
    bowser: 'vendor/bowser'
    uiboot: 'vendor/ui-bootstrap'

  shim:
    angularjs:
      exports: 'angular'
    angularroute:
      deps: ['angularjs']
      exports: 'angular'
    jquery:
      exports: '$'
      deps: ['angularjs']
    fbase:
      exports: 'Firebase'
    basefileupload:
      deps: ['angularjs']
      exports: 'angular'
    sanitize:
      deps: ['angularjs']
      exports: 'angular'
    anganimate:
      deps: ['angularjs']
      exports: 'angular'
    moment:
      exports: 'moment'
    afire:
      deps: ['fbase', 'angularjs']
    uiboot:
      deps: ['angularjs']
    bowser:
      exports: 'bowser'
    flatUi:
      deps: ['jquery', 'angularjs']



  modules: [
    {
      name: "application"

      include: [
        'main'
      ]
    }

  ]
  priority: ['application']



