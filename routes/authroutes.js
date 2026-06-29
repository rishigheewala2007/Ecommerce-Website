const express = require("express");

const router = express.Router();

const User = require("../models/User");

router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hash
    });

    res.status(201).json(user);

});


router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
        return res.status(400).json({ message: "Invalid Email" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
        return res.status(400).json({ message: "Wrong Password" });

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.json({
        token,
        user
    });

});

module.exports = router;