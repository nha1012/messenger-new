import nodeMailer from 'nodemailer'
let tranSporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
      user: 'nguyenphucnha111@gmail.com',
      pass: 'nhajavascript'
  }
})
const mailOptions = function (to,subject,text) {
  return {
    from:'nguyenphucnha111@gmail.com',
    to:to,
    subject: subject,
    text:text
  }
} 
module.exports = {
  tranSporter:tranSporter,
  mailOptions:mailOptions
}