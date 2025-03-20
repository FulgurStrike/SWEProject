const express = require('express');
const router = express.Router();

router.get('/reservation', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/login');
    }
    res.render('reservation');
});

module.exports = router;