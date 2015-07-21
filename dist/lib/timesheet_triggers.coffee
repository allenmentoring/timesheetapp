timeSheetTriggers = (appVars) ->

  console.log "TIMESHEET TRIGGERS BEING INITIALIZED"

  Firebase = appVars.Firebase
  rootRef = appVars.rootRef
  _ = appVars._
  Emailer = appVars.Emailer
  moment = appVars.moment

  sendAnEmail = (options, data) =>
    options['appVars'] = appVars
    emailer = new Emailer options, data
    emailer.send()




  # new user
  rootRef.child("queues/sendCredentialsEmail").on "child_added", (snap, prevChildName) ->

    rootRef.child("registrations/#{snap.val().userId}").once "value", (userSnap) ->

        options =
          email: userSnap.val().email
          subject: "Your Timesheet Credentials"
          template: 'timesheet/user-credentials'

        data =
          first_name: userSnap.val().firstName
          emailId: userSnap.val().email
          password: userSnap.val().password

        sendAnEmail options, data


        rootRef.child("queues/sendCredentialsEmail/#{snap.key()}").set null





exports.timeSheetTriggers = timeSheetTriggers







