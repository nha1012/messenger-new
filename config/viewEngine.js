import express from 'express';
import expressEjsExtend from 'express-ejs-extend';
let configEjs = (app)=>{
  app.use(express.static("./public"))
  app.engine("ejs",expressEjsExtend)
  app.set("view engine","ejs")
  app.set('views','./views')
  
}
module.exports = configEjs;
