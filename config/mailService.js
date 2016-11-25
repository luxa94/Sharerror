var nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
    	user: 'bdzjn.co@gmail.com',
    	pass: 'lunjomazobozavanje'
    }
});

// module.exports.mailService = {};
module.exports.send = function(payload) {
  console.log(payload);
  var mailOptions = {
    from: 'Sharerror <bdzjn.co@gmail.com>',
    to: payload.email,
    subject: payload.applicationName + " " + payload.version,
    text: payload.message
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
  	   console.log(error);
    } else {
  	   console.log(info);
    }
  });
}
