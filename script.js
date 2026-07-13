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
                timer.innerHTML = "<h2>Grand Opening Has Started</h2>";
            }
            return;
        }

        days.textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
        hours.textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        minutes.textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        seconds.textContent = Math.floor((distance % (1000 * 60)) / 1000);

    }, 1000);
}


// ===========================
// Reservation Form
// ===========================

const form = document.querySelector(".reserve-form");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        const fullName = form.querySelector('input[placeholder="Full Name"]').value.trim();
        const phone = form.querySelector('input[placeholder="Phone Number"]').value.trim();
        const email = form.querySelector('input[placeholder="Email Address"]').value.trim();
        const guests = form.querySelector("select").value;
        const request = form.querySelector("textarea").value.trim();

        if (!fullName || !phone || !email) {
            alert("Please complete all required fields.");
            return;
        }

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

        .then(function () {

            return emailjs.send(
                "service_yp1tkqq",
                "template_ru3pmnr",
                {
                    name: fullName,
                    phone: phone,
                    email: email,
                    guests: guests,
                    message: request
                }
            );

        })

.then(function () {

    const reservationID =
        "ARZEA-" +
        new Date().getFullYear() +
        String(Math.floor(Math.random() * 9000) + 1000);

    localStorage.setItem(
        "arzeaReservation",
        JSON.stringify({
            id: reservationID,
            name: fullName,
            phone: phone,
            email: email,
            guests: guests
        })
    );

window.location.href = "ticket.html";

})
.catch(function(error){

    console.error(error);
    alert("❌ Failed to send reservation.");

});

    });   

}         

function showSuccess(name, guests, email){

    const reservationID =
"ARZEA-GO-260919-" +
Math.floor(Math.random()*9000+1000);

    const popup = document.createElement("div");

    popup.className = "reservation-popup";

    popup.innerHTML = `
    <div class="popup-card">

        <img src="images/logo.png" class="popup-logo">

        <h2>Reservation Confirmed</h2>

        <p>Thank you for choosing</p>

        <h3>ARZEA Lounge & Garden</h3>

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

setTimeout(() => {

    new QRCode(
    document.getElementById("reservationQR"),
    {
        text: `Reservation ID : ${reservationID}
Name : ${name}
Email : ${email}
Guests : ${guests}
Date : 19 September 2026
Time : 18.00 WIB
Dress Code : Elegant Black`,
        width: 180,
        height: 180
    }
);

},100);

    document
        .getElementById("closePopup")
        .onclick = function(){

            popup.remove();

        };

    }

