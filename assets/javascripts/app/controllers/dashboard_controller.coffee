define ['app/base','angularjs', 'fbase'], (TimeSheetApp) ->

  class DashBoardController

    constructor: ($scope, $rootScope, $sce, FirebaseService, $window, $firebaseObject, $firebaseArray) ->

      $scope.startDate = moment().date(5).startOf('day')
      $scope.endDate = moment().date(5).endOf('day').add(13, 'd')

      $scope.formattedStart = $scope.startDate.format('M/D/YY')
      $scope.formattedEnd = $scope.endDate.format('M/D/YY')


      $scope.lessonModel = {student: "", length: "", notes: ""}

      FirebaseService.rootRef.child('students').once "value", (snap) ->
        students = []
        for k,v of snap.val()
          students.push {id: k, name: "#{v.firstName} #{v.lastName}"}

        $scope.$apply ->
          $scope.students = students


      $rootScope.$watch 'userBasic', (newVal, oldVal) ->
        if $rootScope.userBasic
          unless $rootScope.userBasic.manager || $rootScope.userBasic.mentor
            $rootScope.roleNotSet = true
          else
            $scope.loadDashboard()





      $scope.loadDashboard = () ->
        if $rootScope.userBasic.manager
          $scope.selectedTab = 'TIMESHEETS'
          $scope.currentDash = 'Manager'
          $scope.mentors = $firebaseObject(FirebaseService.rootRef.child('users').startAt('manager').endAt('manager'))
        else
          $scope.currentDash = 'Mentor'

          startM = moment($scope.formattedStart, 'M/D/YY')
          endM = moment($scope.formattedEnd, 'M/D/YY')

          str = "#{moment($scope.formattedStart, 'M/D/YY').format("MMMM Do YYYY")}-#{moment($scope.formattedEnd, 'M/D/YY').format("MMMM Do YYYY")}"
          $scope.currentTimeSheet = $firebaseObject($rootScope.currentUserRef.child("timesheets/#{str}/lessons"))
          $scope.currentTimeSheetSubmitted = $firebaseObject($rootScope.currentUserRef.child("timesheets/#{str}/submitted"))

          minDate = startM.toDate()
          maxDate = endM.toDate()

          datepickerSelector = $('#datepicker-01')
          datepickerSelector.datepicker(
            showOtherMonths: true
            selectOtherMonths: true
            minDate: minDate
            maxDate: maxDate
            dateFormat: 'm/d/yy'
            yearRange: '-1:+1').prev('.input-group-btn').on 'click', (e) ->
              e and e.preventDefault()
              datepickerSelector.focus()
              return
          $.extend $.datepicker, _checkOffset: (inst, offset, isFixed) ->
            offset
          datepickerSelector.datepicker('widget').css 'margin-left': -datepickerSelector.prev('.input-group-btn').find('.btn').outerWidth() + 3

          $scope.reRenderDatePicker()

      $scope.reRenderDatePicker = () ->
        startM = moment($scope.formattedStart, 'M/D/YY')
        endM = moment($scope.formattedEnd, 'M/D/YY')

        minDate = startM.toDate()
        maxDate = endM.toDate()
        $('#datepicker-01').datepicker( "option", "maxDate", maxDate )
        $('#datepicker-01').datepicker( "option", "minDate", minDate )
        return



      $scope.openTimesheetsTab = () ->
        $scope.selectedTab = 'TIMESHEETS'


      $scope.formatLabel = (item) ->
        item.name if item


      $scope.openInvoicesTab = () ->
        $scope.selectedTab = 'INVOICES'


      $scope.nextPeriod = () ->
        oldEndDate = $scope.endDate
        $scope.startDate = oldEndDate
        $scope.formattedStart = $scope.startDate.format('M/D/YY')

        $scope.endDate = $scope.startDate.add(13, 'd')
        $scope.formattedEnd = $scope.endDate.format('M/D/YY')
        $scope.reRenderDatePicker()

        if $scope.currentDash == 'Mentor'
          $scope.currentTimeSheet.$destroy() if $scope.currentTimeSheet
          str = "#{moment($scope.formattedStart, 'M/D/YY').format("MMMM Do YYYY")}-#{moment($scope.formattedEnd, 'M/D/YY').format("MMMM Do YYYY")}"
          $scope.currentTimeSheet = $firebaseObject($rootScope.currentUserRef.child("timesheets/#{str}/lessons"))
          $scope.currentTimeSheetSubmitted = $firebaseObject($rootScope.currentUserRef.child("timesheets/#{str}/submitted"))


      $scope.prevPeriod = () ->
        $scope.startDate = moment($scope.formattedStart, 'M/D/YY').subtract(13, 'd')
        $scope.formattedStart = $scope.startDate.format('M/D/YY')

        $scope.endDate = moment($scope.formattedEnd, 'M/D/YY').subtract(13, 'd')
        $scope.formattedEnd = $scope.endDate.format('M/D/YY')
        $scope.reRenderDatePicker()

        if $scope.currentDash == 'Mentor'
          $scope.currentTimeSheet.$destroy() if $scope.currentTimeSheet
          str = "#{moment($scope.formattedStart, 'M/D/YY').format("MMMM Do YYYY")}-#{moment($scope.formattedEnd, 'M/D/YY').format("MMMM Do YYYY")}"
          $scope.currentTimeSheet = $firebaseObject($rootScope.currentUserRef.child("timesheets/#{str}/lessons"))
          $scope.currentTimeSheetSubmitted = $firebaseObject($rootScope.currentUserRef.child("timesheets/#{str}/submitted"))


      $scope.addLesson = () ->
        if $scope.lessonModel.student.id and $scope.lessonModel.length.length > 0 and $('#datepicker-01').val().length > 0
          currentTimeSheet = "#{moment($scope.formattedStart, 'M/D/YY').format("MMMM Do YYYY")}-#{moment($scope.formattedEnd, 'M/D/YY').format("MMMM Do YYYY")}"
          $scope.lessonModel.date = moment($('#datepicker-01').val(), 'M/D/YYYY').format("MMMM Do YYYY")
          $rootScope.currentUserRef.child("timesheets/#{currentTimeSheet}/lessons").push().set $scope.lessonModel
          $scope.lessonModel = {student: "", length: "", notes: ""}


      $scope.removeLesson = (id) ->
        str = "#{moment($scope.formattedStart, 'M/D/YY').format("MMMM Do YYYY")}-#{moment($scope.formattedEnd, 'M/D/YY').format("MMMM Do YYYY")}"
        $rootScope.currentUserRef.child("timesheets/#{str}/lessons/#{id}").set null

      $scope.submitTimeSheet = () ->
        result = confirm("Are you sure?")
        if result
          str = "#{moment($scope.formattedStart, 'M/D/YY').format("MMMM Do YYYY")}-#{moment($scope.formattedEnd, 'M/D/YY').format("MMMM Do YYYY")}"
          $rootScope.currentUserRef.child("timesheets/#{str}/submitted").set true







  DashBoardController.$inject = ["$scope", "$rootScope", "$sce", "FirebaseService", "$window", "$firebaseObject", "$firebaseArray"]

  TimeSheetApp.controller 'DashBoardController', DashBoardController

  DashBoardController