import nodemailer from 'nodemailer'
import config from '#config/general.config.js'

const transporter = nodemailer.createTransport({
    service: "mail.ru",
    // port: 587,
    secure: false,
    // requireTLS: true,
    auth: {
      user: config.EMAIL,
      pass: config.EMAIL_PASSWORD
    }
})

export default {
    transporter
}



