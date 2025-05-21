import nodemailer from 'nodemailer';
import ENV from '../utils/ENV.variables';







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





