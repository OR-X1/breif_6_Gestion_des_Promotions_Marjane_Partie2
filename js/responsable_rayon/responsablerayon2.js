const express = require('express');
const router = express.Router();
// const fetch = require("node-fetch");
const fetch = require("cross-fetch")
const axios = require('axios');

const app = express();


// router.get("/", (req, res) => {

//       res.render('admin_centre/dashboard')

// });


router.get("/", (req, res) => {
    // const obj = await fetchData()
    fetch("http://localhost:3030/auth/centreadmin/getallresponsablerayon")
    .then(res => res.json())
    .then(data => {

        console.log("haaahaaa ");
        // console.log(data.result);
        console.log(data.msg);
        const { cookies } = req
        
        res.render('admin_centre/responsable_rayon',{
          getallresponsablerayon : data.getallresponsablerayon,
            cookiesUser: cookies.datauser
        })
    })

  });


router.post("/", (req, res) => {
  const {
    name,
    prenom,
    email,
    password,
    passwordconfirm,
    category
} = req.body

  async function makeGetRequest() {

    const form_data = {
      name: name,
      prenom: prenom,
      email: email,
      password: password,
      passwordconfirm: passwordconfirm,
      category: category
  }

    let ress = await axios.post('http://localhost:3030/auth/centreadmin/creation', form_data);

    console.log("admin center inserted");
    let data = ress.data;

    console.log(data);
    res.redirect('/userrayon')

}

makeGetRequest();

});


  router.post("/delete_responsablerayon/:id", (req, res) => {
    const {
        id,
    } = req.params
    // fetch("http://localhost:3030/auth/generaladmin/delete/"+ id)
    // .then(data => console.log(data))
    // console.log("deleted");

    axios.post(`http://localhost:3030/auth/centreadmin/delete/${id}`)
    .then(res => console.log('Deleted successfully !'))
    .catch(err => console.error(err));

    res.redirect('/userrayon')

  });



module.exports = router;