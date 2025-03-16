const fs = require('fs');
const path = require('path');
const util = require('util');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // Set to false to use STARTTLS (TLS upgrade over standard port)
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false, // Skip verifying server certificate (if needed)
    },
});
const sendMailPromise = util.promisify(transporter.sendMail).bind(transporter);

// General function to send an email
const sendEmail = async (templateName, toEmail, subject, replacer) => {
    try {
        const templatePath = path.join(
            __dirname,
            'templates',
            `${templateName}.html`
        );
        let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

        // Replace placeholders with actual values
        for (const key in replacer) {
            const placeholder = `{{${key}}}`;
            htmlTemplate = htmlTemplate.replace(
                new RegExp(placeholder, 'g'),
                replacer[key]
            );
        }

        const mailOptions = {
            from: `"${process.env.SMTP_SENDER_ALIAS}" <${process.env.SMTP_USER}>`,
            to: toEmail,
            subject: subject,
            html: htmlTemplate,
        };

        const info = await sendMailPromise(mailOptions);
        console.log('Email sent:', info.response);
        return info.response;
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email');
    }
};

// Example of specific email function
const sendVerificationCodeEmail = async (
    toEmail,
    username,
    code,
    subject = 'Nutrify Password Reset Verification'
) => {
    return sendEmail('verification', toEmail, subject, {
        email: toEmail,
        username,
        code: code,
    });
};

module.exports = {
    sendEmail,
    sendVerificationCodeEmail,
};
