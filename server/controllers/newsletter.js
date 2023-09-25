const Newsletter = require("../models/newsletter");

const subscribeNewsletter = async (req, res) => {
    const { email } = req.body;

    const existed = await Newsletter.findOne({ email });

    if (!email) {
        return res.status(401).json({
            success: false,
            message: "Pleasae provide a valid email address"
        })
    }

    if (existed) {
        return res.status(401).json({
            success: false,
            message: "Already subscribed"
        })
    }


    try {
        const newSubscribe = await Newsletter.create({
            email
        })

        res.status(201).json({
            success: true,
            message: "Subscribed to newsletter. Check E-mail For Regular Updates."
        })
    } catch (err) {
        console.log('error in subscribeNewsletter function in controllers => ', err);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

module.exports = {
    subscribeNewsletter
}