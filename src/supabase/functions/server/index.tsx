import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-976c2dfb/health", (c) => {
  return c.json({ status: "ok" });
});

// Get email configuration (recipient email)
app.get("/make-server-976c2dfb/config/email", async (c) => {
  try {
    const recipientEmail = await kv.get("config:recipient_email");
    return c.json({ 
      recipientEmail: recipientEmail || "admin@molnartimeanoemi.ro" 
    });
  } catch (error) {
    console.error("Error fetching email config:", error);
    return c.json({ error: "Failed to fetch email configuration" }, 500);
  }
});

// Set email configuration (recipient email)
app.post("/make-server-976c2dfb/config/email", async (c) => {
  try {
    const { recipientEmail } = await c.req.json();
    
    if (!recipientEmail || !recipientEmail.includes("@")) {
      return c.json({ error: "Invalid email address" }, 400);
    }
    
    await kv.set("config:recipient_email", recipientEmail);
    return c.json({ success: true, recipientEmail });
  } catch (error) {
    console.error("Error setting email config:", error);
    return c.json({ error: "Failed to set email configuration" }, 500);
  }
});

// Send contact form email
app.post("/make-server-976c2dfb/send-contact", async (c) => {
  try {
    const { name, email, phone, message } = await c.req.json();
    
    // Validate input
    if (!name || !email || !message) {
      return c.json({ error: "Numele, emailul și mesajul sunt obligatorii" }, 400);
    }
    
    // Get recipient email from config
    const recipientEmail = await kv.get("config:recipient_email") || "admin@molnartimeanoemi.ro";
    
    // Get Resend API key from environment
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return c.json({ error: "Email service not configured" }, 500);
    }
    
    // Send email using Resend API
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Molnar Timea Noemi CMS <onboarding@resend.dev>",
        to: recipientEmail,
        reply_to: email,
        subject: `Mesaj nou de contact de la ${name}`,
        html: `
          <h2>Mesaj nou de contact</h2>
          <p><strong>Nume:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone || "Nu a fost furnizat"}</p>
          <p><strong>Mesaj:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error("Resend API error:", result);
      return c.json({ error: "Failed to send email", details: result }, 500);
    }
    
    // Store contact submission in KV for records
    const timestamp = new Date().toISOString();
    await kv.set(`contact:${timestamp}`, { name, email, phone, message, timestamp });
    
    return c.json({ success: true, messageId: result.id });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return c.json({ error: "Failed to send contact email" }, 500);
  }
});

// Subscribe to newsletter
app.post("/make-server-976c2dfb/subscribe", async (c) => {
  try {
    const { email } = await c.req.json();
    
    // Validate email
    if (!email || !email.includes("@")) {
      return c.json({ error: "Email invalid" }, 400);
    }
    
    // Check if already subscribed
    const existing = await kv.get(`subscriber:${email}`);
    if (existing) {
      return c.json({ error: "Acest email este deja abonat" }, 400);
    }
    
    // Get recipient email from config
    const recipientEmail = await kv.get("config:recipient_email") || "admin@molnartimeanoemi.ro";
    
    // Get Resend API key from environment
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return c.json({ error: "Email service not configured" }, 500);
    }
    
    // Send notification email to admin
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Molnar Timea Noemi CMS <onboarding@resend.dev>",
        to: recipientEmail,
        subject: `Abonat nou: ${email}`,
        html: `
          <h2>Abonat nou la newsletter</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Data:</strong> ${new Date().toLocaleString("ro-RO")}</p>
        `,
      }),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      console.error("Resend API error:", result);
      return c.json({ error: "Failed to send notification", details: result }, 500);
    }
    
    // Store subscriber
    const timestamp = new Date().toISOString();
    await kv.set(`subscriber:${email}`, { email, timestamp });
    
    return c.json({ success: true });
  } catch (error) {
    console.error("Error processing subscription:", error);
    return c.json({ error: "Failed to process subscription" }, 500);
  }
});

Deno.serve(app.fetch);