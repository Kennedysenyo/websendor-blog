"use server";

import EmailVerification from "@/emails/email-verification";
import { resend } from "@/lib/resend/resend";

interface SendData {
  to: string;
  subject: string;
  text: string;
}

export async function sendEmail({ to, subject, text }: SendData) {
  const domain = process.env.BASE_URl;
  if (!domain) {
    throw new Error("BASE_URL is required to send email!");
  }

  await resend.emails.send({
    from: "Websendor <noreply@websendor.com>",
    to,
    subject,
    react: EmailVerification({ email: to, domain, text }),
  });
}
