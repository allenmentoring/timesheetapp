
define ['app/base','angularjs', 'fbase'], (TimeSheetApp) ->

  class DashBoardController

    constructor: ($scope, $rootScope, $sce, FirebaseService, $window, $firebaseObject, $firebaseArray) ->

      $scope.moment = moment
      $scope.startDate = moment({ year :2015, month :6, day :2}).add(Math.floor((moment().diff(moment({ year :2015, month :6, day :2}), 'days'))/14)*13, 'd')
      $scope.endDate = moment({ year :2015, month :6, day :2}).add(Math.ceil((moment().diff(moment({ year :2015, month :6, day :2}), 'days'))/14)*13, 'd')


      $scope.formattedStart = $scope.startDate.format('M/D/YY')
      $scope.formattedEnd = $scope.endDate.format('M/D/YY')

      $scope.currentTimeSheetKey = "#{moment($scope.formattedStart, 'M/D/YY').format("MMMM Do YYYY")}-#{moment($scope.formattedEnd, 'M/D/YY').format("MMMM Do YYYY")}"
      $scope.currentPayPeriod = "#{moment($scope.formattedStart, 'M/D/YY').format("MMMM Do YYYY")}-#{moment($scope.formattedEnd, 'M/D/YY').format("MMMM Do YYYY")}"


      $scope.lessonModel = {student: "", length: "", notes: ""}

      FirebaseService.rootRef.child('students').once "value", (snap) ->
        students = []
        for k,v of snap.val()
          students.push {id: k, name: "#{v.firstName} #{v.lastName}", parent: v.parent}

        $scope.$apply ->
          $scope.students = students


      $rootScope.$watch 'userBasic', (newVal, oldVal) ->
        if $rootScope.userBasic
          unless $rootScope.userBasic.manager || $rootScope.userBasic.mentor
            $rootScope.roleNotSet = true
          else
            $scope.loadDashboard()



      $scope.nextPeriod = () ->
        oldEndDate = $scope.endDate
        $scope.startDate = oldEndDate
        $scope.formattedStart = $scope.startDate.format('M/D/YY')

        $scope.endDate = $scope.startDate.add(13, 'd')
        $scope.formattedEnd = $scope.endDate.format('M/D/YY')

        $scope.currentTimeSheetKey = "#{moment($scope.formattedStart, 'M/D/YY').format("MMMM Do YYYY")}-#{moment($scope.formattedEnd, 'M/D/YY').format("MMMM Do YYYY")}"

        $scope.reRenderDatePicker()

        if $scope.currentDash == 'Mentor'
          $scope.currentTimeSheet.$destroy() if $scope.currentTimeSheet
          $scope.currentTimeSheet = $firebaseObject($rootScope.currentUserRef.child("timesheets/#{$scope.currentTimeSheetKey}/lessons"))
          $scope.currentTimeSheetSubmitted = $firebaseObject($rootScope.currentUserRef.child("timesheets/#{$scope.currentTimeSheetKey}/submitted"))


      $scope.prevPeriod = () ->
        $scope.startDate = moment($scope.formattedStart, 'M/D/YY').subtract(13, 'd')
        $scope.formattedStart = $scope.startDate.format('M/D/YY')

        $scope.endDate = moment($scope.formattedEnd, 'M/D/YY').subtract(13, 'd')
        $scope.formattedEnd = $scope.endDate.format('M/D/YY')

        $scope.currentTimeSheetKey = "#{moment($scope.formattedStart, 'M/D/YY').format("MMMM Do YYYY")}-#{moment($scope.formattedEnd, 'M/D/YY').format("MMMM Do YYYY")}"

        $scope.reRenderDatePicker()

        if $scope.currentDash == 'Mentor'
          $scope.currentTimeSheet.$destroy() if $scope.currentTimeSheet
          $scope.currentTimeSheet = $firebaseObject($rootScope.currentUserRef.child("timesheets/#{$scope.currentTimeSheetKey}/lessons"))
          $scope.currentTimeSheetSubmitted = $firebaseObject($rootScope.currentUserRef.child("timesheets/#{$scope.currentTimeSheetKey}/submitted"))


      $scope.reRenderDatePicker = () ->
        minDate = $scope.startDate.toDate()
        maxDate = $scope.endDate.toDate()
        $('#datepicker-01').datepicker( "option", "maxDate", maxDate )
        $('#datepicker-01').datepicker( "option", "minDate", minDate )
        return


      $scope.loadDashboard = () ->
        if $rootScope.userBasic.manager
          $scope.selectedTab = 'TIMESHEETS'
          $scope.currentDash = 'Manager'
          $scope.mentors = $firebaseObject(FirebaseService.rootRef.child('users').startAt('mentor').endAt('mentor'))

        else
          $scope.currentDash = 'Mentor'

          $scope.currentTimeSheet = $firebaseObject($rootScope.currentUserRef.child("timesheets/#{$scope.currentTimeSheetKey}/lessons"))
          $scope.currentTimeSheetSubmitted = $firebaseObject($rootScope.currentUserRef.child("timesheets/#{$scope.currentTimeSheetKey}/submitted"))

          minDate = $scope.startDate.toDate()
          maxDate = $scope.endDate.toDate()

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

      $scope.openTimesheetsTab = () ->
        $scope.selectedTab = 'TIMESHEETS'


      $scope.formatLabel = (item) ->
        item.name if item


      $scope.openInvoicesTab = () ->
        $scope.selectedTab = 'INVOICES'
        $scope.parents = $firebaseObject($rootScope.rootRef.child("parents"))


      $scope.addLesson = () ->
        unless $scope.lessonModel.student.id
          alert 'Please select a student from the drop down menu.'

        if $scope.lessonModel.student.id and $scope.lessonModel.length.length > 0 and $('#datepicker-01').val().length > 0
          $scope.lessonModel.date = moment($('#datepicker-01').val(), 'M/D/YYYY').format("MMMM Do YYYY")
          $rootScope.currentUserRef.child("timesheets/#{$scope.currentTimeSheetKey}/lessons").push().set $scope.lessonModel
          $scope.lessonModel = {student: "", length: "", notes: ""}

      $scope.removeLesson = (id) ->
        $rootScope.currentUserRef.child("timesheets/#{$scope.currentTimeSheetKey}/lessons/#{id}").set null

      $scope.submitTimeSheet = () ->
        result = confirm("Are you sure? You are finalizing your timesheet for this pay period. This action cannot be undone.")
        if result
          $rootScope.currentUserRef.child("timesheets/#{$scope.currentTimeSheetKey}/submitted").set true

          totalTime = 0.00
          angular.forEach $scope.currentTimeSheet, (value, key) ->
            totalTime = totalTime + parseFloat(value.length)
            $rootScope.rootRef.child("parents/#{value.student.parent.parentId}/invoices/#{$scope.currentTimeSheetKey}").push().set {date: value.date, studentName: value.student.name, length: value.length, notes: value.notes, mentorId: $rootScope.currentUid, mentorName: "#{$rootScope.userBasic.firstName} #{$rootScope.userBasic.lastName}"}

          $rootScope.currentUserRef.child("timesheets/#{$scope.currentTimeSheetKey}/totalTime").set totalTime
          $rootScope.currentUserRef.child("timesheets/#{$scope.currentTimeSheetKey}").setPriority 'submitted'


      $scope.manageMentor = (userid, mentor) ->
        $scope.showManageMentor = true
        $scope.showManageMentorObj = mentor


      $scope.calculateTotalHoursForAParent = (lessons) ->
        totalHours = 0
        for k,v of lessons
          totalHours = parseFloat(v.length) + totalHours
        totalHours

      $scope.manageParent = (userid, parent) ->
        $scope.showManageParent = true
        $scope.showManageParentObj = parent


      $scope.checkCurrentPayPeriod = () ->
        moment().isBetween($scope.startDate, $scope.endDate)




  DashBoardController.$inject = ["$scope", "$rootScope", "$sce", "FirebaseService", "$window", "$firebaseObject", "$firebaseArray"]

  TimeSheetApp.controller 'DashBoardController', DashBoardController

  DashBoardController