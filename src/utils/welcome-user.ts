import { Resend } from "resend";
import { WelcomeEmail } from "@/components/emails/welcome";
import getSession from "@/lib/getSession";

const resend = new Resend(process.env.RESEND_API_KEY);


export const welcomeUser = async (name:string, email:string) => {
  await resend.emails.send({
    from: "Quillstash <taqib@quillstash.com>",
    to: [email],
    subject: "Thanks for joining Quillstash!",
    react: WelcomeEmail({
      userEmail: email,
      username: name,
    }),
  });
  console.log("Email sent");
};
