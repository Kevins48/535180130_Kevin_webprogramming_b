const express = require('express');

const router = express.Router();

const todo = require('./routes/todo');
app.use('/todo', todo);


router.get('/', async (req,res) => {
    //check user session
    if (!req.session.user) {
        res.redirect('/auth/login');
    } else {
        res.send('ok');
    }
});

module.exports = router;