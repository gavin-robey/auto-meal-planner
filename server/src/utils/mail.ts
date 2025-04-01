import React from "react";
import nodemailer from "nodemailer";
import ReactDOMServer from 'react-dom/server';
import { VerificationEmail } from "./components/verificationEmail";

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "b95941010b90ab",
        pass: "c19c45ddde132b"
    }
});

export const sendVerification = async (email: string, link: string): Promise<void> => {
    const htmlTemplate = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #333;">Verify Your Email</h1>
            <p style="color: #666; font-size: 16px;">Please click the button below to verify your email address:</p>
            <a href="${link}" 
               style="display: inline-block; 
                      background-color: #007bff; 
                      color: white; 
                      padding: 12px 24px; 
                      text-decoration: none; 
                      border-radius: 5px; 
                      margin: 20px 0;">
                Verify Email
            </a>
            <p style="color: #999; font-size: 14px;">If you didn't create an account, you can safely ignore this email.</p>
        </div>
    `;

    await transport.sendMail({
        from: "info@test.com",
        subject: "Account Verification",
        to: email,
        html: htmlTemplate
    });
}

