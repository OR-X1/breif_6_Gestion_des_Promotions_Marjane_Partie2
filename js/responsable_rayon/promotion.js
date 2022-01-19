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
  const { cookies } = req
    // const obj = await fetchData()
    fetch("http://localhost:3030/auth/responsablerayon/getpromo/"+cookies.category_rayon)
    .then(res => res.json())
    .then(data => {

        console.log("haaahaaa ");
        // console.log(data.result);
        console.log(data.data);
        const { cookies } = req
        
        res.render('responsable_rayon/promotion',{
          getallpromotion : data.data,
            cookiesUser: cookies.datauser
        })
    })

  });


  router.post("/", (req, res) => {

    const {
      status,
      commentaire,
      id
  } = req.body
  
    async function makeGetRequest() {

      const form_data = {
        status: status,
        commentaire: commentaire
      }

      let ress = await axios.post('http://localhost:3030/auth/responsablerayon/update/'+id, form_data);

      console.log("center inserted");
      let data = ress.data;

      // console.log(data);
      res.redirect('/updatepromotion')

  }

  makeGetRequest();

  });

 


module.exports = router;