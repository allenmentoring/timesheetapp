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


  # seeds for parents and students
  rootRef.child('parents').set null
  rootRef.child('students').set null

  parent1 = rootRef.child('parents').push()
  parent2 = rootRef.child('parents').push()

  parent1.set {firstName: 'Karen', lastName: 'Wu'}
  parent2.set {firstName: 'Kim', lastName: 'Jong'}

  student1 = rootRef.child('students').push()
  student2 = rootRef.child('students').push()

  student1.set {firstName: 'Ninja', lastName: 'Wu'}
  student2.set {firstName: 'Tim', lastName: 'Jong'}

  parent1.child('children').push().set {firstName: 'Ninja', lastName: 'Wu', studentId: student1.key()}
  parent2.child('children').push().set {firstName: 'Tim', lastName: 'Jong', studentId: student2.key()}

  student1.child('parent').set {firstName: 'Karen', lastName: 'Wu', parentId: parent1.key()}
  student2.child('parent').set {firstName: 'Kim', lastName: 'Jong', parentId: parent2.key()}







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







