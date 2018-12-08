const nodemailer = require('nodemailer');
const cryptoRandomString = require('crypto-random-string');
const { EMAIL, PASSWORD } = require('../constants/dev.credentials');

const verifyURL = cryptoRandomString(16);

module.exports = {
  verifyURL,
  sendMail: (userEmail) => {
    nodemailer.createTestAccount((err, account) => {
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: EMAIL,
          pass: PASSWORD
        }
      });
  
      let mailOptions = {
        from: 'Your Name',
        to: userEmail,
        subject: 'Email Verification ✔',
        text: 'Welcome!',
        html: `Please confirm your account by clicking the following link: 
        <a href="http://localhost:4200/email-verification/${verifyURL}" target="_blank">Verify my account</a>`
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error)
        }
      });
  
      transporter.verify(function(error, success) {
        if (error) {
          throw error
        } else {
          console.log('Server is ready to take our messages', success)
        }
     })
  })
  }
};
