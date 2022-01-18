const express = require('express');
const router = express.Router();
// const fetch = require("node-fetch");
const fetch = require("cross-fetch")
const axios = require('axios');

const app = express();

// router.get('/', (req, res) => {
//     res.render('admin_genaral/dashboard')
// })

// router.post('/creation', authController.isLoginIn, authController.creation)

router.get("/", (req, res) => {
    // const obj = await fetchData()
    fetch("http://localhost:3030/auth/centreadmin/getallpromotion")
    .then(res => res.json())
    .then(data => {

        console.log("haaahaaa ");
        // console.log(data.result);
        console.log(data.msg);
        const { cookies } = req
        
        res.render('admin_centre/promotion',{
          getallpromotion : data.getallpromotion,
          getallproduct : data.getallproduct,
            cookiesUser: cookies.datauser
        })
    })

  });


  router.post("/", (req, res) => {
    const {
      porcentage,
      produit_id
  } = req.body
  
    async function makeGetRequest() {

      const form_data = {
        porcentage: porcentage,
        produit_id: produit_id
      }

      let ress = await axios.post('http://localhost:3030/auth/centreadmin/creationpromotion', form_data);

      console.log("center inserted");
      let data = ress.data;

      // console.log(data);
      res.redirect('/promotion')

  }

  makeGetRequest();

  });

 


module.exports = router;