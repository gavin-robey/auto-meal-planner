import nodemailer from "nodemailer";

var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "b95941010b90ab",
        pass: "c19c45ddde132b"
    }
});

export const sendVerification = async (email: string, link: string): Promise<void> => {
    const compiledHTML = `<h3> link: ${link} </h3>`

    await transport.sendMail({
        from: "info@test.com",
        subject: "Account Verification",
        to: email,
        html: compiledHTML
    })
}

