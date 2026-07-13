import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  try {
    const {
      name,
      email,
      phone,
      guests,
      reservationId,
    } = req.body;

    const qrLink =
      "https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=" +
      encodeURIComponent(
        JSON.stringify({
          reservationId,
          name,
          email,
        })
      );

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>ARZEA Invitation</title>
</head>

<body style="
background:#0b0b0b;
margin:0;
padding:40px;
font-family:Arial,sans-serif;
">

<table align="center"
width="620"
cellpadding="0"
cellspacing="0"
style="
background:#111;
border:1px solid #b58d2d;
border-radius:18px;
overflow:hidden;
">

<tr>
<td
style="
padding:45px;
text-align:center;
">

<h1
style="
color:#d4af37;
font-size:34px;
margin:0;
">
ARZEA
</h1>

<p
style="
color:#ffffff;
letter-spacing:4px;
margin-top:8px;
font-size:13px;
">
GRAND OPENING
</p>

<div
style="
height:1px;
background:#b58d2d;
margin:35px 0;
">
</div>

<h2
style="
color:white;
font-size:28px;
margin:0;
">
Reservation Confirmed
</h2>

<p
style="
color:#d5d5d5;
font-size:16px;
line-height:28px;
margin-top:18px;
">
Thank you for reserving your seat.
<br>
Your exclusive QR Invitation is below.
</p>

<img
src="${qrLink}"
width="220"
style="
margin-top:25px;
border-radius:12px;
background:white;
padding:12px;
"
/>

<table
width="100%"
cellpadding="10"
style="
margin-top:35px;
border-collapse:collapse;
">

<tr>
<td style="color:#b58d2d;width:180px;">
Guest
</td>

<td style="color:white;">
${name}
</td>
</tr>

<tr>
<td style="color:#b58d2d;">
Reservation ID
</td>

<td style="color:white;">
${reservationId}
</td>
</tr>

<tr>
<td style="color:#b58d2d;">
Email
</td>

<td style="color:white;">
${email}
</td>
</tr>

<tr>
<td style="color:#b58d2d;">
Phone
</td>

<td style="color:white;">
${phone}
</td>
</tr>

<tr>
<td style="color:#b58d2d;">
Guests
</td>

<td style="color:white;">
${guests}
</td>
</tr>

<tr>
<td style="color:#b58d2d;">
Date
</td>

<td style="color:white;">
19 September 2026
</td>
</tr>

<tr>
<td style="color:#b58d2d;">
Time
</td>

<td style="color:white;">
18.00 WIB
</td>
</tr>

<tr>
<td style="color:#b58d2d;">
Dress Code
</td>

<td style="color:white;">
Elegant Black Attire
</td>
</tr>

</table>

<div
style="
height:1px;
background:#b58d2d;
margin:35px 0;
">
</div>

<p
style="
color:#888;
font-size:13px;
line-height:24px;
">
Please present this QR Invitation upon arrival.
</p>

</td>
</tr>

</table>

</body>
</html>
`;

    await resend.emails.send({
      from: "ARZEA Lounge & Garden <onboarding@resend.dev>",
      to: [email],
      subject: "Your ARZEA Grand Opening Invitation",
      html,
    });

    return res.status(200).json({
      success: true,
      message: "Invitation sent successfully",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}