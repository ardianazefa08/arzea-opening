const escapeHtml = (value = "") => String(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const required = ["id", "name", "email", "guests", "date", "time", "dress"];

  if (!data || required.some((field) => !data[field])) {
    return res.status(400).json({ error: "Reservation data is incomplete." });
  }

  if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
    return res.status(500).json({
      error: "Email service has not been configured on this site yet."
    });
  }

  const guest = escapeHtml(data.name);
  const reservationId = escapeHtml(data.id);
  const guests = escapeHtml(data.guests);
  const date = escapeHtml(data.date);
  const time = escapeHtml(data.time);
  const dress = escapeHtml(data.dress);
  const request = escapeHtml(data.request || "—");
  const ticketUrl = `https://arzea-opening.vercel.app/ticket.html?id=${encodeURIComponent(data.id)}`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL,
      to: [data.email],
      reply_to: process.env.RESERVATION_REPLY_TO || undefined,
      subject: `Reservation confirmed — ${reservationId}`,
      html: `<!doctype html>
        <html><body style="margin:0;background:#0d0d0d;color:#fff;font-family:Arial,sans-serif">
          <main style="max-width:620px;margin:0 auto;padding:42px 24px">
            <p style="color:#d4af37;letter-spacing:3px;font-weight:700">ARZEA</p>
            <h1 style="font-size:32px;margin:0 0 16px">Your reservation is confirmed</h1>
            <p>Dear ${guest}, thank you for reserving your exclusive seat at ARZEA Garden & Lounge.</p>
            <section style="background:#171717;border:1px solid #5f4b18;border-radius:16px;padding:22px;margin:28px 0">
              <p><strong>Reservation ID:</strong> ${reservationId}</p>
              <p><strong>Date & time:</strong> ${date}, ${time}</p>
              <p><strong>Guests:</strong> ${guests}</p>
              <p><strong>Dress code:</strong> ${dress}</p>
              <p><strong>Special request:</strong> ${request}</p>
            </section>
            <a href="${ticketUrl}" style="display:inline-block;background:#d4af37;color:#111;padding:14px 22px;border-radius:999px;text-decoration:none;font-weight:700">Open VIP Ticket</a>
          </main>
        </body></html>`
    })
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("Resend error:", result);
    return res.status(response.status).json({
      error: result.message || "Email could not be sent."
    });
  }

  return res.status(200).json({ id: result.id });
}
