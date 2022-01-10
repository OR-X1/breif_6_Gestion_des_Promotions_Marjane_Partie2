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
    fetch("http://localhost:3030/auth/generaladmin/getalladmincenter")
    .then(res => res.json())
    .then(data => {

        console.log("haaahaaa ");
        // console.log(data.result);
        console.log(data.msg);
        res.render('admin_genaral/admincenter',{
            getalladmincenter : data.result
        })
    })

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

    res.redirect('/generaladmin/')

  });



// router.post('/getalladmincenter', authController.isLoginIn, authController.getall)
// router.post('/update/:id', authController.isLoginIn, authController.update)
// router.post('/delete/:id', authController.isLoginIn, authController.delete)
// router.post('/creationcentre', authController.isLoginIn, authController.creationcentre)
// router.post('/login', authController.login)
// router.get('/logout', authController.logout)

module.exports = router;