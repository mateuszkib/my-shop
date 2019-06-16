const config = require('../config/config');
const nodemailer = require("nodemailer");

module.exports = {
    send: (email, subject, body) => {
        try {
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: config.email, // generated ethereal user
                    pass: config.password // generated ethereal password
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            // send mail with defined transport object
            let info = transporter.sendMail({
                from: config.email, // sender address
                to: email, // list of receivers
                subject: subject, // Subject line
                html: body, // html body
                text: body.replace(/(<([^>]+)>)/gi, ""),
            }).then(() => {
                console.log("Send mail to " + email);
            })
                .catch(err => {
                    console.log("Cannot send mail to " + info.messageId || 'empty email', err);
                });

        } catch (e) {
            console.error('Error ' + e);
        }
    }
};