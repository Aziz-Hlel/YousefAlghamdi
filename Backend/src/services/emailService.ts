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

export async function sendContactUsMail({ name, email, phoneNumber, subject: userSubject, message }: { name: string, email: string, phoneNumber: string, subject: string, message: string }): Promise<void> {


    const subject = "New Message from Contact Us Form"
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
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);

}






export async function sendPropertyMail({ firstName, lastName, email, subject: userSubject, message, propertyId }: { firstName: string, lastName: string, email: string, subject: string, message: string, propertyId: string }): Promise<void> {


    const subject = "New Message from a client intrested of a property"
    const to = [ENV.EMAIL_USER]
    const html = `
        <h1>Property Reference ${propertyId}  ,  url = https://ygp.ae/property-single/${propertyId} </h1>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${userSubject}</p>
        <p><strong>Message:</strong> ${message}</p>
    `;
    const mailOptions = {
        from: `New Message from an intrested client <${ENV.EMAIL_USER}>`,
        to,
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);

}




export async function sendResetEmail({ email, resetUrl }: { email: string, resetUrl: string, }): Promise<void> {

    const templatePath = join(__dirname, "./template/reset-password.html");
    let html = readFileSync(templatePath, "utf-8");

    const subject = "Reset Your Password"
    const to = [email]

    const logoUrl = "https://ygp.ae/api/img/logo.png"
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
        subject,
        html,
    };

    await transporter.sendMail(mailOptions);



}
