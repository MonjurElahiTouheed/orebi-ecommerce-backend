const nodemailer = require("nodemailer");

async function emailVerification(email, otp) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: "monjurelahitouheed@gmail.com",
            pass: "xieacfumipnnflzp",
        },
    });

    const info = await transporter.sendMail({
        from: '"Monju machine ecom" <monjurelahitouheed.email>',
        to: email,
        subject: "Hello ✔",
        text: "Hello world? dasd", // plain‑text body
        html: `<b>Hello sd? ${otp}</b>`, // HTML body
    });
}

module.exports = emailVerification;