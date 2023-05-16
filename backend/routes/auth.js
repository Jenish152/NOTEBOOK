const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const fetchuser = require('../middleware/fetchuser');

var jwt = require('jsonwebtoken');

//ADD NEW USER DETAIL INTO DATABASE
router.post('/createuser', [
    body('uname').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {
    //check validation result
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Already User Exit!" })
        }
        const salt = await bcrypt.genSalt(10);

        secpass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            uname: req.body.uname,
            password: secpass,
            email: req.body.email

        })
        //   .then(user=>res.json(user)).catch(err=>{console.log(err)
        //     res.json({error:"uniq value"})})
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, 'jenish');
        
        success = true;
        res.json({ success, authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error!");
    }

})

//THIS IS END POINT FOR LOGIN USER
router.post('/login', [
    body('email').isEmail(),
    body('password').exists()
], async (req, res) => {
    const errors = validationResult(req);
    let success = false;
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Sorry User Does Not Exit!" });
        }
        const passwordcompare = await bcrypt.compare(password, user.password);
        if (!passwordcompare) {
            return res.status(400).json({ error: "Please Enter Correct Passwor!" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, 'jenish');
        success = true;
        console.log(authtoken);
        res.json({ success, authtoken });

    } catch (error) {
        res.status(500).send("Internal Server Error!");
    }

})
//GET USER DETAIL
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.send(user)
    } catch (error) {
        res.status(500).send("Internal Server Error!");
    }
})
module.exports = router