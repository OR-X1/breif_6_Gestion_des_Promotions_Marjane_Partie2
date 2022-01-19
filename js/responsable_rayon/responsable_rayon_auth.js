const express = require('express');
// const cookieParser = require('cookie-parser')
const router = express.Router();
const axios = require('axios');
const { cookie } = require('express/lib/response');
// const app = express();


  router.get("/", (req, res) => {
        res.render('responsable_rayon/login')
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

      let ress = await axios.post('http://localhost:3030/auth/responsablerayon/login', form_data);

      let data = ress.data;
      if(data?.err ==undefined){

        console.log("correct");
        console.log(data.data[0].nom);
        res.cookie('datauser', data.data[0].nom + " " + data.data[0].prenom)
        res.cookie('category_rayon', data.data[0].category)
        console.log(data.token);
        res.cookie('token_rayon', data.token)

        res.redirect('/updatepromotion')

      }else{
        console.log("inccorrect");
        console.log(data.err);
        res.redirect('/rayonlogin')
      }
  }

  makeGetRequest();

  });

module.exports = router;