const express = require('express');
// const cookieParser = require('cookie-parser')
const router = express.Router();
const { cookie } = require('express/lib/response');
const app = express();


// app.use(express.json())
// app.use(cookieParser())

// app.use(express.urlencoded({ extended : true }))


  router.get("/", (req, res) => {
    
    res.cookie('token_centreadmin', 'logout', {
      expires: new Date(Date.now() + 2 * 1000),
      httpOnly: true
    })
    res.redirect('/centrelogin')

  });

module.exports = router;