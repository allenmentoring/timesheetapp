emailer = require("nodemailer")
fs      = require("fs")
_       = require("underscore")
jade = require('jade')


class Emailer

  options: {}

  data: {}

  constructor: (@options, @data) ->

  send: (callback) =>
    console.log "Mailer working!"
    @processHtml(@options.template, @data)

  getTransport: () =>
    emailer.createTransport "SMTP",
      service: "Mailgun"
      auth:
        user: @options.appVars.mailgunUser
        pass: @options.appVars.mailgunPassword


  processHtml: =>

    transport = @getTransport()
    email = @options.email
    subject = @options.subject
    templateName = @options.template
    from = @options.from || "NodeLabs <do-not-reply@nodelabs.in>"
    data = @data
    attachments = @options.attachments

    jade.renderFile "./email_templates/#{templateName}/html.jade", data, (err, html) ->
      if err
        console.log err
      else
        messageData =
          to: "#{email}"
          from: from
          subject: subject
          html: html
          generateTextFromHTML: true
          attachments: attachments
        transport.sendMail messageData, @afterSendingMail

  afterSendingMail: (err, result) =>
    console.log err
    console.log result

exports = module.exports = Emailer
