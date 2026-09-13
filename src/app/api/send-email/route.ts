import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["YOUR_EXACT_RESEND_REGISTERED_EMAIL@gmail.com"], // Must match your Resend account email!
      subject: `New Portfolio Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: monospace; padding: 20px; background-color: #171717; color: #e5e5e5; border-radius: 8px;">
          <h2 style="color: #f43f5e; margin-top: 0;">New Dispatch from Prabhat OS</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Visitor Email:</strong> ${email}</p>
          <hr style="border-color: #333;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background-color: #0a0a0a; padding: 12px; border-radius: 6px; border: 1px solid #262626;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Server Route Error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to dispatch email" },
      { status: 500 }
    );
  }
}