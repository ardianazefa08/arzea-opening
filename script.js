// =====================================================
// ARZEA LOUNGE & GARDEN
// SCRIPT.JS PART 1
// =====================================================

// ==========================
// EMAILJS
// ==========================

emailjs.init({
    publicKey: "-EkYc26ebwGzYOuJW"
});

// ==========================
// COUNTDOWN
// ==========================

const eventDate = new Date("September 19, 2026 18:00:00").getTime();

const dayEl = document.getElementById("days");
const hourEl = document.getElementById("hours");
const minuteEl = document.getElementById("minutes");
const secondEl = document.getElementById("seconds");

if(dayEl){

setInterval(()=>{

const now = new Date().getTime();

const distance = eventDate - now;

if(distance <= 0){

dayEl.textContent="00";
hourEl.textContent="00";
minuteEl.textContent="00";
secondEl.textContent="00";

return;

}

dayEl.textContent=Math.floor(distance/(1000*60*60*24));

hourEl.textContent=Math.floor((distance%(1000*60*60*24))/(1000*60*60));

minuteEl.textContent=Math.floor((distance%(1000*60*60))/(1000*60));

secondEl.textContent=Math.floor((distance%(1000*60))/1000);

},1000);

}



// ==========================
// RESERVATION FORM
// ==========================

const form=document.querySelector(".reserve-form");

if(form){

form.addEventListener("submit",function(e){

e.preventDefault();

const name=form.querySelector('input[type="text"]').value.trim();

const phone=form.querySelector('input[type="tel"]').value.trim();

const email=form.querySelector('input[type="email"]').value.trim();

const guests=form.querySelector("select").value;

const request=form.querySelector("textarea").value.trim();

if(!name||!phone||!email){

alert("Please complete all required fields.");

return;

}

const button=document.querySelector(".reserve-btn");

button.classList.add("loading");

button.innerHTML="Sending...";

button.disabled=true;

const reservationID=

"ARZEA-"+

new Date().getFullYear()+"-"+

Math.floor(1000+Math.random()*9000);

// ==========================

// SEND EMAIL

// ==========================

emailjs.send(

"service_yp1tkqq",

"template_ru3pmnr",

{

name:name,

phone:phone,

email:email,

guests:guests,

message:request,

reservationID:reservationID

}

)

.then(function(){

// ==========================

// SAVE DATA

// ==========================

localStorage.setItem(

"arzeaReservation",

JSON.stringify({

id:reservationID,

name:name,

phone:phone,

email:email,

guests:guests

})

);

// ==========================

// BUTTON

// ==========================

button.classList.remove("loading");

button.disabled=false;

button.innerHTML="Reserve Now";

// ==========================

// POPUP

// ==========================

showSuccess(

name,

email,

guests,

reservationID

);

})

.catch(function(error){

console.error(error);

button.classList.remove("loading");

button.disabled=false;

button.innerHTML="Reserve Now";

alert("❌ Failed to send reservation.");

});

});

}

// =====================================================

// SUCCESS POPUP

// =====================================================

function showSuccess(

name,

email,

guests,

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

<p>

<b>Reservation ID</b><br>

${reservationID}

</p>

<p>

<b>Name</b><br>

${name}

</p>

<p>

<b>Email</b><br>

${email}

</p>

<p>

<b>Guests</b><br>

${guests}

</p>

<p>

<b>Date</b><br>

19 September 2026

</p>

<p>

<b>Time</b><br>

18.00 WIB

</p>

</div>

<div class="qr-box">

<div id="reservationQR"></div>

</div>

<p class="scan-text">

🖤 Scan this QR upon arrival

</p>

<button id="closePopup">

Done

</button>

</div>

`;

document.body.appendChild(popup);

// =====================================================
// QR CODE
// =====================================================

setTimeout(function(){

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

Dress Code : Elegant Black`,

width:180,

height:180,

colorDark:"#000000",

colorLight:"#ffffff",

correctLevel:QRCode.CorrectLevel.H

}

);

},200);



// =====================================================
// DONE BUTTON
// =====================================================

document
.getElementById("closePopup")
.addEventListener("click",function(){

window.location.href="ticket.html";

});

}



// =====================================================
// SMOOTH SCROLL
// =====================================================

document
.querySelectorAll('a[href^="#"]')
.forEach(function(anchor){

anchor.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(

this.getAttribute("href")

);

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});



// =====================================================
// PAGE LOADED
// =====================================================

window.addEventListener("load",function(){

document.body.classList.add("loaded");

});



// =====================================================
// END SCRIPT
// =====================================================
