const express = require('express')
const path = require('path')
const app = express();
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')


dotenv.config({
    path: './.env'
})
// public dossier 
app.set('views',path.join(__dirname,'views'));
const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))
app.use(express.urlencoded({
    extended: false
}))

app.use(express.json())
app.use(cookieParser())
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended : false }))


function requireLoginAdmin(req, res, next) {
    const { cookies } = req

    if (cookies.token) {
      next(); // allow the next route to run
    } else {
      // require the user to log in
      res.redirect("/login"); // or render a form, etc.
    }
  }

  function requireLoginCenter(req, res, next) {
    const { cookies } = req

    if (cookies.token_centreadmin) {
      next(); // allow the next route to run
    } else {
      // require the user to log in
      res.redirect("/centrelogin"); // or render a form, etc.
    }
  }

  function requireLoginRayon(req, res, next) {
    const { cookies } = req

    if (cookies.token_rayon) {
      next(); // allow the next route to run
    } else {
      // require the user to log in
      res.redirect("/centrelogin"); // or render a form, etc.
    }
  }

app.use('/generaladmin', requireLoginAdmin,  require('./js/admin_genaral/generaladmin'));
app.use('/usercenter', requireLoginAdmin, require('./js/admin_genaral/admincenter'));
app.use('/center', requireLoginAdmin, require('./js/admin_genaral/center'));

app.use('/login', require('./js/admin_genaral/generaladmin_auth'));
app.use('/logout', require('./js/admin_genaral/logout'));



app.use('/centeradmin', requireLoginCenter,  require('./js/admin_centre/centeradmin'));
app.use('/userrayon', requireLoginCenter, require('./js/admin_centre/responsablerayon'));
app.use('/promotion', requireLoginCenter, require('./js/admin_centre/promotion'));

app.use('/centrelogin', require('./js/admin_centre/admin_centre_auth'));
app.use('/centrelogout', require('./js/admin_centre/logout'));



// app.use('/responsablerayon', requireLoginRayon, require('./js/responsable_rayon/responsablerayon'));
app.use('/updatepromotion', requireLoginRayon, require('./js/responsable_rayon/promotion'));
// app.use('/promotion', require('./js/admin_centre/promotion'));

app.use('/rayonlogin', require('./js/responsable_rayon/responsable_rayon_auth'));
app.use('/rayonlogout', require('./js/responsable_rayon/logout'));


app.listen(5000, () => {
    console.log("Up Server : http://localhost:5000")
})