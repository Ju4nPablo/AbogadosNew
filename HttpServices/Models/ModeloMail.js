const nodemailer = require('nodemailer');


// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
module.exports = {

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
            // no se esta enviando la in=magen al correo de gmail, pero al de hotmail si. se debe agregar una imagen a google y ponerla al correo.
            datos.html = datos.html + '<p>Saludos Cordiales,<br/><b>Dr. Stalin Aldás C. Msc.</b><br/><img src="data:image/png;base64,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' +
                'vr1q1ZDDyq2xTFOd+6ue6662idlWDDEgr4e+/evffdd99LL72EXPOjWrSFLxkmEWXixIlRUVGYlU3AhMOwMWPGFChQgHVF51URoIN33nvvvcKFC48cOVJCAR06GR0dXaNGDX2+F6G1GQBpxIYzZ860b9/+5ptvjoiIYKh2GADrSKACS4HBnHZ+I0G1pEZgeOedd9CpWLEiE4qQKsgBy2vx4sX6yRWmlXVGddVVyhwxmGLFihUvXpyZlds8rTqliYmJuIro8sgjj3z44YdMikqxL8ffeuutmuXu3bszHRJKB8cQiqApk8voVItUQAcHEA+GDRvGLFeqVAkn2aBIKaYYC0u/ZcuWy5Yts4FdFRlO6dKliZQ06uaQJgTi0p8vv/zSDoeUfhLJOnbsSF1ce/fdd5OxzZGBDaNHjy5XrhwpedtbMswAcZeFSuBxLxgyNMEOQgTFNefOnUPZlgaAXzZQmYljAQ0YMAC7gwYNcs870OCbNm3aoEGDjz/+2F1EhhkkRkVGRjKM999/n1lDX4SQDrGEGS9fvjw6W7ZscccG1AinrMtFixYRWoHYLaB29uzZvn373nDDDd26dZNH1TQppSy+2bNnV61alfiBY7Tdyjgp/Xz77bcJaZCYcEoV1bVAmQMHuxgnAzZBhmb7hialPOK8okWLcmCCN9YyYEIaNmzYqFEjIp+NDYAAg8OIGffee+/WrVvtJqIUQuDpatWqQWIM2sFiEAUmihn43//+R5fwCB1QLUppAsYzFrxj2wKqxXIqVaoUgyWPsikLiEBsADCO6WP80NAuEYE8YE3jDxSkryJlGBW1CG6MVnJbXRl6KaDpU53po5agnVtFwFH0jJZ2Se3sWGCcacLTlFJXEhVJk1KKRF+KbKkFrUNf6tK6fKOKpIAWkdM6Re66MsWEMGR3LWWYSRoFPrWsQaCKsqNSZZheKqJA3tMDr1kWGEWsDcZCn20tKTAEDIqUtkpgpLFTkNIGrQqSA4SMgQxCoqK7SFAP0AG2l27IguCjoHaxiVyQ3A1KObenbFeQBWVs3gKDKRt1Q7UEPUouqCKpjxxIiHFPzeSl9jHVuVJKRbdTBZVSC/gU2Z4AnxGlKkwTgdgg+DPnNOcp8hm2D1IOXqAuFa0RN1QkszbjA1uqxwtFykbTD3XPnwXkgnl2AaFnMH7qImeuLtR/Qqpm1dwFWUubDZmHAB29iBn5J/F3uoeHTC41XJxlhwypmL1Qa/8mG8LIagizIYwkhNkQRhLCbAgjCWE2hJGEMBvC8OKnn/4PU6VSlxl2ApcAAAAASUVORK5CYII="><br/><b>Teléfono:</b> (03)294 1584 <br/> <b>Celular:</b> (09) 8461 1239 <br/><b>email:</b> draldasstalin@hotmail.com<br/>Riobamba - Ecuador</p>'

            // setup email data with unicode symbols
            let mailOptions = {
                from: '"Aldas Davalos" <foo@example.com>', // sender address
                to: datos.destinatario, // list of receivers 'los destinatarios son separados por ,'
                subject: datos.asunto, // Subject line
                text: datos.texto, // plain text body
                html: datos.html // html body
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    callback(false);
                    return console.log(error);
                }
                /* console.log('Message sent: %s', info.messageId);
                // Preview only available when sending through an Ethereal account
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); */
                callback(true);
                return true;
                // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
                // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            });
        });
    }
}


