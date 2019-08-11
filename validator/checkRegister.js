const { check, validationResult } = require('express-validator');
let checkRegister =[
  check('email', 'Email phai co dang example@gmail.com')
    .isEmail()
    .trim(),
  check('gender','Gioi tinh sai')
    .isIn(['male','female']),
  check('password','mat khau phai co toi thieu 8 ky tu bao gom chu hoa, chu thuong, chu so, ky tu dac biet')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/),
  check('password_confirmation', 'Khong trung hai mat khau')
    .custom((value,{req})=>{
      return value === req.body.password
    })
]
module.exports = {checkRegister:checkRegister}