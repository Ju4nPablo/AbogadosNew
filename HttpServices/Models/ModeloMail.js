const nodemailer = require('nodemailer');


// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
module.exports= {
    
    sendMail: function (datos, callback) {
        nodemailer.createTestAccount((err, account) => {
            // create reusable transporter object using the default SMTP transport
            let transporter = nodemailer.createTransport({
               host: 'smtp.gmail.com',
                port: 465,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: 'angellrio2018@gmail.com', // generated ethereal user
                    pass: 'riobytes2018' // generated ethereal password
                }
                /*service: "hotmail",
                auth: {
                    user: "xaipoj@hotmail.com",
                    pass: "xaipocoorp"
                }*/
            });

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Angell" <foo@example.com>', // sender address
                to: datos.destinatario, // list of receivers 'los destinatarios son separados por ,'
                subject: 'Notificacion', // Subject line
                text: datos.texto, // plain text body
               // html: '<b>Hello world?</b>' // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    callback(false);
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                callback(true);
                return true;
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });
    }
}


