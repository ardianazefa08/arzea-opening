// ===========================
// Load Reservation Data
// ===========================

const reservation = JSON.parse(
    localStorage.getItem("arzeaReservation")
);

if (!reservation) {

    window.location.href = "index.html";

}

// ===========================
// Fill Ticket
// ===========================

document.getElementById("guestName").textContent =
reservation.name;

document.getElementById("guestEmail").textContent =
reservation.email;

document.getElementById("guestCount").textContent =
reservation.guests + " Guest";

document.getElementById("reservationID").textContent =
reservation.id;


// ===========================
// QR CODE
// ===========================

new QRCode(
    document.getElementById("qrcode"),
    {

        text:
`ARZEA Lounge & Garden

Reservation ID : ${reservation.id}

Name : ${reservation.name}

Email : ${reservation.email}

Guests : ${reservation.guests}

Date : 19 September 2026

Time : 18.00 WIB

Dress Code : Elegant Black Attire`,

        width:180,
        height:180,
        colorDark:"#000000",
        colorLight:"#ffffff",
        correctLevel:QRCode.CorrectLevel.H

    }
);


// ===========================
// Save as PDF
// ===========================

window.addEventListener("beforeprint",()=>{

document.body.style.background="#ffffff";

});

window.addEventListener("afterprint",()=>{

document.body.style.background="#070707";

});