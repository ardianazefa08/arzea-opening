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

            alert("🎉 Reservation Successfully Sent!");
            form.reset();

        })

        .catch(function (error) {

            console.error(error);
            alert("❌ Failed to send reservation.");

        });

    });

}
