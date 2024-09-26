import { NextRequest, NextResponse } from 'next/server';
import { Resend } from "resend";
import { WelcomeEmail } from "@/components/emails/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  if (!email) {
    // console.error('Email is required');
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    // console.log(`Attempting to send email to: ${email}`);
    const result = await resend.emails.send({
      from: "Quillstash <taqib@quillstash.com>",
      to: [email],
      subject: "Thanks for joining Quillstash!",
      react: WelcomeEmail({ userEmail: email }),
    });
    // console.log('Resend API response:', result);

    return NextResponse.json({ message: 'Email sent successfully', result }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send email', details: error }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
}