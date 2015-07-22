define ['app/base', 'fbase'], (TimeSheetApp) ->


  TimeSheetApp.directive 'validNumber', ->
    {
    require: '?ngModel'
    link: (scope, element, attrs, ngModelCtrl) ->
      if !ngModelCtrl
        return
      ngModelCtrl.$parsers.push (val) ->
        `var val`
        if angular.isUndefined(val)
          val = ''
        clean = val.replace(/[^0-9\.]/g, '')
        decimalCheck = clean.split('.')
        if !angular.isUndefined(decimalCheck[1])
          decimalCheck[1] = decimalCheck[1].slice(0, 2)
          clean = decimalCheck[0] + '.' + decimalCheck[1]
        if val != clean
          ngModelCtrl.$setViewValue clean
          ngModelCtrl.$render()
        clean
      element.bind 'keypress', (event) ->
        if event.keyCode == 32
          event.preventDefault()
        return
      return

    }

