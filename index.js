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


function requireLogin(req, res, next) {
    const { cookies } = req

    if (cookies.token) {
      next(); // allow the next route to run
    } else {
      // require the user to log in
      res.redirect("/login"); // or render a form, etc.
    }
  }


app.use('/generaladmin', requireLogin,  require('./js/admin_genaral/generaladmin'));
app.use('/usercenter', requireLogin, require('./js/admin_genaral/admincenter'));
app.use('/center', requireLogin, require('./js/admin_genaral/center'));

app.use('/login', require('./js/admin_genaral/generaladmin_auth'));
app.use('/logout', require('./js/admin_genaral/logout'));

// app.use('/responsablerayon', requireLogin,  require('./js/admin_centre/responsablerayon'));
// app.use('/usercenter', requireLogin, require('./js/admin_genaral/admincenter'));
// app.use('/center', requireLogin, require('./js/admin_genaral/center'));

// app.use('/centrelogin', require('./js/admin_centre/admin_centre_auth'));
// app.use('/centrelogout', require('./js/admin_centre/logout'));




app.listen(5000, () => {
    console.log("Up Server : http://localhost:5000")
})