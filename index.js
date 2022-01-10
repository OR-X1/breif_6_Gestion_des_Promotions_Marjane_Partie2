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

app.use(bodyParser.urlencoded({ extended : true }))

// app.get('/', (req, res) => {
//     res.render('index')
// })

app.use('/generaladmin', require('./js/admin_genaral/generaladmin'));
app.use('/usercenter', require('./js/admin_genaral/admincenter'));
app.use('/center', require('./js/admin_genaral/center'));
app.use('/generaladmin/login', require('./js/admin_genaral/generaladmin_auth'));
// app.use('/responsablerayon', require('./js/rayon/rayon_auth'));
// app.use('/centreadmin', require('./js/admin_centre/centreadmin_auth'));


app.listen(5000, () => {
    console.log("Up Server : http://localhost:5000")
})