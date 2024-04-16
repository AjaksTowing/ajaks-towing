"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function SendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const message = formData.get("message") as string;

  await resend.emails.send({
    from: "Contact Form – <ajaks-towing@isyour.site>",
    subject: `(Ajaks Towing) ${email} – Sent a message!`,
    to: "ajakstowingllc@gmail.com",
    reply_to: email,
    html: `
      <h3>${name} (${email}) contacted you with phone: ${phone}!</h3>
      <p>${message}</p>
    `,
  });
}
