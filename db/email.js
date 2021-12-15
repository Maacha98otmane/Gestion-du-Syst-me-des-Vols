var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'thisfortestnode@gmail.com',
        pass: 'az12er34'
    }
});



module.exports = email = {
    mail: (emailcl) => {
        var mailOptions = {
            from: 'safiair@airsafi.com',
            to: emailcl,
            subject: 'Success',
            text: 'Reserve'
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    },
};