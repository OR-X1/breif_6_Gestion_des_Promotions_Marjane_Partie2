const express = require('express')
const router = express.Router();
const authController = require('../../controller/admin_centre/auth')

router.post('/creation', authController.isLoginIn, authController.creation)
router.post('/creationpromotion', authController.isLoginIn, authController.creationpromotion)
router.get('/getvalidepromo', authController.isLoginIn, authController.getvalidepromo)
router.get('/getinvalidepromo', authController.isLoginIn, authController.getinvalidepromo)
router.get('/promopasencore', authController.isLoginIn, authController.promopasencore)
router.post('/update/:id', authController.isLoginIn, authController.update)
router.post('/delete/:id', authController.isLoginIn, authController.delete)
// router.post('/creationcategorie', authController.isLoginIn, authController.creationproduit)
router.post('/login', authController.login)
router.get('/logout', authController.logout)


module.exports = router;

router.get("/", async(req, res) => {
    const obj = await fetchData()
    res.render("landingPage", { obj });
  });

  function fetchData(){
    return fetch("http://localhost:3000/api/teachers")
        .then(res => res.json())
  }
  
// res.render('index',{
//     title: 'Safi Air',
//     flights : "",
//     villes : rows_ville
// });