import nodemailer from 'nodemailer';
import ENV from '../utils/ENV.variables';
import { readFileSync } from "fs";
import { join } from "path";
// import {logo} from ''






const transporter = nodemailer.createTransport({

    host: ENV.EMAIL_HOST,
    port: Number(ENV.EMAIL_PORT),
    secure: true,
    auth: {
        user: ENV.EMAIL_USER,
        pass: ENV.EMAIL_PASS,
    },
});

export async function sendMail({ name, email, phoneNumber, subject: userSubject, message }: { name: string, email: string, phoneNumber: string, subject: string, message: string }): Promise<void> {


    const defaultSubject = "New Message from Contact Us Form"
    const to = [ENV.EMAIL_USER]
    const html = `
        <h1>New Message from Contact Us Form</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phoneNumber}</p>
        <p><strong>Subject:</strong> ${userSubject}</p>
        <p><strong>Message:</strong> ${message}</p>
    `;
    const mailOptions = {
        from: `"Message From Contact Us" <${ENV.EMAIL_USER}>`,
        to,
        defaultSubject,
        html,
    };

    await transporter.sendMail(mailOptions);

}








export async function sendResetEmail({ email, resetUrl }: { email: string, resetUrl: string, }): Promise<void> {

    const templatePath = join(__dirname, "./template/reset-password.html");
    let html = readFileSync(templatePath, "utf-8");

    const defaultSubject = "Reset Your Password"
    const to = [email]

    const logoUrl = "http://localhost:5000/api/img/logo.png"
    html = html
        .replace(/{{RESET_LINK}}/g, resetUrl)
        .replace(/{{COMPANY_NAME}}/g, "YGP")
        .replace(/{{LOGO_URL}}/g, logoUrl);

    //  const html = `
    //         <h1>New Message from Contact Us Form</h1>
    //         <p><strong>resetUrl:</strong> ${resetUrl}</p>
    //         <p><strong>Email:</strong> ${email}</p>
    //     `;
    
    const mailOptions = {
        from: `"Message From Contact Us" <${ENV.EMAIL_USER}>`,
        to,
        defaultSubject,
        html,
    };

    await transporter.sendMail(mailOptions);



}
