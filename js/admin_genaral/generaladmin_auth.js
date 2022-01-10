const express = require('express');
const router = express.Router();
// const fetch = require("node-fetch");
const cookieParser = require("cookie-parser");
const fetch = require("cross-fetch")
const axios = require('axios');
const { cookie } = require('express/lib/response');
const app = express();

app.locals.data = {
  'token' : ''
};


  router.get("/", (req, res) => {
        res.render('admin_genaral/login')

  });

  


  router.post("/", (req, res) => {
    const {
      email,
      password,
  } = req.body
  console.log(password);
  

    //  axios.post("http://localhost:3030/auth/generaladmin/login", {
      
    //     email: email,
    //     password: password
      
    // }
    // ).then(res => console.log('Deleted successfully !'))
    // .catch(err => console.error(err))
    async function makeGetRequest() {

      const form_data = {
        email: email,
        password: password
      }

      let ress = await axios.post('http://localhost:3030/auth/generaladmin/login', form_data);
      
      let data = ress.data;
      // ress.cookie("access_token", data.token, {
      //   httpOnly: true,
      // });

      console.log(data.token);

      app.locals.data.token = "dedededded";

      console.log(app.locals.data.token);

      res.redirect('/generaladmin')

  }

  makeGetRequest();

  });

  router.post("/delete_admincenter/:id", (req, res) => {
    const {
        id,
    } = req.params
    // fetch("http://localhost:3030/auth/generaladmin/delete/"+ id)
    // .then(data => console.log(data))
    // console.log("deleted");

    axios.post(`http://localhost:3030/auth/generaladmin/delete/${id}`)
    .then(res => console.log('Deleted successfully !'))
    .catch(err => console.error(err));

    res.redirect('/generaladmin')

  });


  



// router.post('/getalladmincenter', authController.isLoginIn, authController.getall)
// router.post('/update/:id', authController.isLoginIn, authController.update)
// router.post('/delete/:id', authController.isLoginIn, authController.delete)
// router.post('/creationcentre', authController.isLoginIn, authController.creationcentre)
// router.post('/login', authController.login)
// router.get('/logout', authController.logout)

module.exports = router;