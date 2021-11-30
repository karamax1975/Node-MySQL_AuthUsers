const nodemailer = require('nodemailer');

class MailService {


  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      // host: process.env.SMTP_HOST,
      // port: process.env.PORT,
      // secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.GOOGLE_APP_PASS
      }
    })
  }
  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: `Активация аккаунта на сайте ${process.env.API_URL}`,
      html: `<a href="${link}">To activate your account, click the link</a>`
    })
  }
}


module.exports = new MailService();