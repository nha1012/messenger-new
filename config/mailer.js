import nodeMailer from 'nodemailer'
let tranSporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
      user: 'nguyenphucnha0111@gmail.com',
      pass: '01689753582'
  }
})
const mailOptions = function (to,subject,text) {
  return {
    from:'nguyenphucnha0111@gmail.com',
    to:to,
    subject: subject,
    text:text
  }
} 
module.exports = {
  tranSporter:tranSporter,
  mailOptions:mailOptions
}
