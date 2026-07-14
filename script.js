// ======================================================
// ARZEA Lounge & Garden
// script.js
// PART 1
// ======================================================

// ===========================
// Countdown
// ===========================

const targetDate = new Date("September 19, 2026 18:00:00").getTime();

const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const timer = document.getElementById("timer");

if (days && hours && minutes && seconds) {

    setInterval(() => {

        const now = new Date().getTime();

        const distance = targetDate - now;

        if (distance <= 0) {

            if (timer) {

                timer.innerHTML =
                "<h2>Grand Opening Has Started</h2>";

            }

            return;

        }

        days.textContent =
        Math.floor(distance / (1000 * 60 * 60 * 24));

        hours.textContent =
        Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

        minutes.textContent =
        Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

        seconds.textContent =
        Math.floor(
            (distance % (1000 * 60))
            / 1000
        );

    },1000);

}



// ===========================
// Reservation Form
// ===========================

const form =
document.querySelector(".reserve-form");

if(form){

form.addEventListener(
"submit",

function(e){

e.preventDefault();

const fullName =
form.querySelector(
'input[placeholder="Full Name"]'
).value.trim();

const phone =
form.querySelector(
'input[placeholder="Phone Number"]'
).value.trim();

const email =
form.querySelector(
'input[placeholder="Email Address"]'
).value.trim();

const guests =
form.querySelector("select").value;

const request =
form.querySelector("textarea").value.trim();

if(
!fullName ||
!phone ||
!email
){

alert(
"Please complete all required fields."
);

return;

}

const reservationID =
"ARZEA-" +
new Date().getFullYear() +
"-" +
Math.floor(
Math.random()*9000+1000
);

const reservationData={

id:reservationID,

name:fullName,

phone:phone,

email:email,

guests:guests,

request:request

};

localStorage.setItem(
"arzeaReservation",
JSON.stringify(
reservationData
)
);

// ===========================
// Send Email
// ===========================

emailjs.send(
    "service_yp1tkqq",
    "template_zp0batn",
    {
        name: fullName,
        phone: phone,
        email: email,
        guests: guests,
        message: request
    }
)

.then(() => {

    return emailjs.send(
        "service_yp1tkqq",
        "template_ru3pmnr",
        {
            name: fullName,
            reservationID: reservationID,
            email: email,
            phone: phone,
            guests: guests
        }
    );

})

.then(() => {

    showSuccess(
        fullName,
        guests,
        email,
        reservationID
    );

})

.catch((error) => {

    console.error("EmailJS Error:", error);

    alert(
        error.text ||
        error.message ||
        "Failed to send reservation."
    );

});

});

}



// ===========================
// Success Popup
// ===========================

function showSuccess(
name,
guests,
email,
reservationID
){

const popup=document.createElement("div");

popup.className="reservation-popup";

popup.innerHTML=`

<div class="popup-card">

<img
src="images/logo.png"
class="popup-logo">

<h2>
Reservation Confirmed
</h2>

<p>
Thank you for choosing
</p>

<h3>
ARZEA Lounge & Garden
</h3>

<div class="popup-info">

<p><b>Reservation ID</b><br>${reservationID}</p>

<p><b>Name</b><br>${name}</p>

<p><b>Email</b><br>${email}</p>

<p><b>Guests</b><br>${guests}</p>

<p><b>Date</b><br>19 September 2026</p>

<p><b>Time</b><br>18.00 WIB</p>

</div>

<div class="qr-box">

<div id="reservationQR"></div>

</div>

<p class="scan-text">

🖤 Scan this QR upon arrival

</p>

<div class="dress-code">

<b>Dress Code</b><br>

Elegant Black Attire

</div>

<button id="closePopup">

Done

</button>

<p class="popup-footer">

✨ We look forward to welcoming you at
ARZEA Lounge & Garden

</p>

</div>

`;

document.body.appendChild(popup);

// ===========================
// QR Code
// ===========================

setTimeout(() => {

    new QRCode(
        document.getElementById("reservationQR"),
        {
            text:
`ARZEA Lounge & Garden

Reservation ID : ${reservationID}

Name : ${name}

Email : ${email}

Guests : ${guests}

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

},100);


// ===========================
// Close Popup
// ===========================

document
.getElementById("closePopup")
.onclick=function(){

    popup.remove();

    window.location.href="ticket.html";

};

}



// ===========================
// Download Ticket
// ===========================

async function downloadTicket(){

const { jsPDF } = window.jspdf;

const doc = new jsPDF({
orientation:"landscape",
unit:"mm",
format:[90,180]
});

doc.setFillColor(15,15,15);
doc.rect(0,0,180,90,"F");

doc.setDrawColor(212,175,55);
doc.setLineWidth(1);
doc.roundedRect(4,4,172,82,4,4);

doc.setTextColor(212,175,55);
doc.setFontSize(28);
doc.text("ARZEA",90,20,{align:"center"});

doc.setFontSize(12);
doc.text("LOUNGE & GARDEN",90,28,{align:"center"});

doc.setDrawColor(212,175,55);
doc.line(20,35,160,35);

doc.setTextColor(255);

doc.setFontSize(18);
doc.text("VIP INVITATION",90,47,{align:"center"});

doc.setFontSize(11);
doc.text("Grand Opening",20,60);
doc.text("19 September 2026",20,68);
doc.text("18.00 WIB",20,76);

doc.text("Dress Code",105,60);
doc.text("Elegant Black",105,68);

doc.save("ARZEA-VIP-Ticket.pdf");

}
