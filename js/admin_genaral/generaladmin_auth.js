const express = require('express');
// const cookieParser = require('cookie-parser')
const router = express.Router();
const axios = require('axios');
const { cookie } = require('express/lib/response');
// const app = express();



// app.use(express.json())
// app.use(cookieParser())

// app.use(express.urlencoded({ extended : true }))


  router.get("/", (req, res) => {
        res.render('admin_genaral/login')
  });

  router.post("/", (req, res) => {
    const {
      email,
      password,
  } = req.body
  console.log(password);

    async function makeGetRequest() {

      const form_data = {
        email: email,
        password: password
      }

      let ress = await axios.post('http://localhost:3030/auth/generaladmin/login', form_data);

      let data = ress.data;
      if(data?.err ==undefined){

        console.log("correct");
        console.log(data.data[0].nom);
        res.cookie('datauser', data.data[0].nom + " " + data.data[0].prenom)

        console.log(data.token);
        res.cookie('token', data.token)

        res.redirect('/generaladmin')

      }else{
        console.log("inccorrect");
        console.log(data.err);
        res.redirect('/login')
      }

  }

  makeGetRequest();

  });

module.exports = router;