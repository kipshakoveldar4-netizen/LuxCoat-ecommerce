import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1)
});

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid contact form." }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    message:
      "Contact request accepted. Connect this route to Resend, Postmark, CRM, or helpdesk before launch."
  });
}
