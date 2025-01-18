require('dotenv').config();
const util = require('util');
const nodemailer = require('nodemailer');

// Konfigurasi transporter dengan informasi SMTP dari file .env
// const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: process.env.SMTP_PORT,
//     // secure: true, // true untuk port 465
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//     },
// });
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Set to false to use STARTTLS (TLS upgrade over standard port)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        // Add TLS options if required
        rejectUnauthorized: false, // Skip verifying server certificate (if needed)
    },
});
const sendMailPromise = util.promisify(transporter.sendMail).bind(transporter);

const sendVerificationCodeEmail = async (toEmail, code) => {

    // template html
    const htmlTemplate = `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="x-apple-disable-message-reformatting">
    <title>Verify your identity</title>
    <style>
        html,
        body {
            margin: 0 auto !important;
            padding: 0 !important;
            height: 100% !important;
            width: 100% !important;
            font-family: "Amazon Ember", "Helvetica Neue", Roboto, Arial, sans-serif;
        }

        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }

        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }

        table,
        td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }

        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }

        table table table {
            table-layout: auto;
        }

        img {
            -ms-interpolation-mode: bicubic;
        }

        *[x-apple-data-detectors],
        /* iOS */
        .x-gmail-data-detectors,
        /* Gmail */
        .x-gmail-data-detectors *,
        .aBn {
            border-bottom: 0 !important;
            cursor: default !important;
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
        @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
            .email-container {
                min-width: 320px !important;
            }
        }

        /* iPhone 6, 6S, 7, 8, and X */
        @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
            .email-container {
                min-width: 375px !important;
            }
        }

        /* iPhone 6+, 7+, and 8+ */
        @media only screen and (min-device-width: 414px) {
            .email-container {
                min-width: 414px !important;
            }
        }

        /* Media Queries */
        @media screen and (max-width: 600px) {
            .email-container {
                padding-top: 0 !important;
            }

            #emailBodyContainer {
                border: 0 !important;
                border-bottom: 1px solid #DDD !important;
            }

            body,
            center {
                background: #FFF !important;
            }

            #logoContainer td {
                padding: 20px 0 20px 0 !important;
            }

            #footer {
                background: #F9F9F9 !important;
            }
        }
    </style>
</head>

<body width="100%" style="margin: 0; mso-line-height-rule: exactly; background-color: #F0F2F3;">
    <div style="margin: auto; max-width: 600px; padding-top: 50px;" class="email-container">
        <table role="presentation" cellspacing="0" cellpadding="0" width="100%" align="center" id="logoContainer"
            style="background: #252F3D; border-radius: 3px 3px 0 0; max-width: 600px;">
            <tr>
                <td style="background: #e5e7e9; border-radius: 3px 3px 0 0; padding: 20px 0 10px 0; text-align: center;">
                    <img src="https://i.ibb.co/SJwmMBz/Group-1.png" width="75"
                        height="75" alt="Nutrify logo" border="0"
                        style="font-family: sans-serif; font-size: 15px; line-height: 140%; color: #555555;">
                </td>
            </tr>
        </table>
        <table role="presentation" cellspacing="0" cellpadding="0" width="100%" align="center" id="emailBodyContainer"
            style="border: 0px; border-bottom: 1px solid #D6D6D6; max-width: 600px;">
            <tr>
                <td class="module"
                    style="background-color: #FFF; color: #444; font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif; font-size: 14px; line-height: 140%; padding: 25px 35px;">
                    <h1 style="font-size: 20px; font-weight: bold; line-height: 1.3; margin: 0 0 15px 0;">Verify your
                        identity</h1>
                    <p style="margin: 0 0 15px 0; padding: 0 0 0 0;">Hello,</p>
                    <p style="margin: 0 0 15px 0; padding: 0 0 0 0;">We have received a request to reset the password for your Nutrify account associated with the user {{email}}. To ensure the security of your account, please enter the verification code below.</p>
                </td>
            </tr>
            <tr>
                <td class="module module-otp"
                    style="background-color: #FFF; color: #444; font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif; font-size: 14px; line-height: 140%; padding: 25px 35px; padding-top: 0; text-align: center;">
                    <div class="label" style="font-weight: bold; padding-bottom: 15px;">Verification code</div>
                    <div class="code" style="color: #000; font-size: 36px; font-weight: bold; padding-bottom: 15px;">
                        {{code}}
                    </div>
                </td>
            </tr>
            <tr>
                <td class="module"
                    style="background-color: #FFF; color: #444; font-family: 'Amazon Ember', 'Helvetica Neue', Roboto, Arial, sans-serif; font-size: 14px; line-height: 140%; padding: 25px 35px;">
                    <p style="margin: 0 0 15px 0; padding: 0 0 0 0;">If you did not initiate this password reset request, we kindly advise you to ignore this message. However, if you suspect any unauthorized activity or did not request this reset, we recommend reviewing your account security settings and taking necessary actions to ensure the safety of your Nutrify account.</p>
                </td>
            </tr>
        </table>
    </div>
</body>

</html>`

    // Buat opsi email
    const mailOptions = {
        from: `"${process.env.SMTP_SENDER_ALIAS}" <${process.env.SMTP_USER}>`,
        to: toEmail,
        subject: 'Nutrify Password Reset Verification',
        html: htmlTemplate.replace('{{code}}', code).replace('{{email}}', toEmail),
    };

    // Kirim email
    try {
        const info = await sendMailPromise(mailOptions);
        console.log('Email sent: ' + info.response);
        return info.response;
    } catch (error) {
        console.error(error.message);
        throw new Error('There was an issue sending the email!');
    }
};

module.exports = {
    sendVerificationCodeEmail,
};