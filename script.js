const targetDate = new Date("September 19, 2026 18:00:00").getTime();

const countdown = setInterval(() => {

    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if (distance < 0) {
        clearInterval(countdown);

        document.getElementById("timer").innerHTML =
        "<h2>Grand Opening Has Started</h2>";
    }

},1000);

// =======================
// ARZEA Reservation Form
// =======================

const form = document.querySelector(".reserve-form");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const fullName = form.querySelector('input[placeholder="Full Name"]').value;
    const phone = form.querySelector('input[placeholder="Phone Number"]').value;
    const email = form.querySelector('input[placeholder="Email Address"]').value;
    const guests = form.querySelector("select").value;
    const request = form.querySelector("textarea").value;

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

    // Kirim Auto Reply ke customer
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
.catch(function(error){

    console.error(error);
    alert("Failed to send reservation.");

});