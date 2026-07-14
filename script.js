/*==================================================
ARZEA V3
script.js
==================================================*/

emailjs.init({
    publicKey: "-EkYc26ebwGzYOuJW"
});

/*========================================
LOADER
========================================*/

window.addEventListener("load",()=>{

const loader=document.getElementById("loader");

setTimeout(()=>{

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

},700);

},1800);

});


/*========================================
COUNTDOWN
========================================*/

const targetDate=new Date("2026-09-19T18:00:00+07:00").getTime();

const day=document.getElementById("days");
const hour=document.getElementById("hours");
const minute=document.getElementById("minutes");
const second=document.getElementById("seconds");

if(day){

setInterval(()=>{

const now=new Date().getTime();

const distance=targetDate-now;

if(distance<0){

day.innerHTML="00";
hour.innerHTML="00";
minute.innerHTML="00";
second.innerHTML="00";

return;

}

day.innerHTML=Math.floor(distance/86400000);

hour.innerHTML=Math.floor(distance%86400000/3600000);

minute.innerHTML=Math.floor(distance%3600000/60000);

second.innerHTML=Math.floor(distance%60000/1000);

},1000);

}


/*========================================
RESERVATION
========================================*/

const form=document.querySelector(".reserve-form");

if(form){

form.addEventListener("submit",sendReservation);

}
/*========================================
SEND RESERVATION
========================================*/

async function sendReservation(e){

e.preventDefault();

const button=document.querySelector(".reserve-btn");

const fullName=form.querySelector('input[type="text"]').value.trim();

const phone=form.querySelector('input[type="tel"]').value.trim();

const email=form.querySelector('input[type="email"]').value.trim();

const guests=form.querySelector("select").value;

const request=form.querySelector("textarea").value.trim();

if(!fullName||!phone||!email){

alert("Please complete all required fields.");

return;

}

const reservationID=

"ARZEA-"+

Date.now().toString().slice(-8);

button.classList.add("loading");

button.disabled=true;

button.innerHTML="Sending...";

try{

await emailjs.send(

"service_yp1tkqq",

"template_zp0batn",

{

name:fullName,

phone:phone,

email:email,

guests:guests,

message:request

}

);

await emailjs.send(

"service_yp1tkqq",

"template_ru3pmnr",

{

name:fullName,

email:email,

phone:phone,

guests:guests,

reservationID:reservationID,

download_link:

window.location.origin+

"/ticket.html"

}

);

localStorage.setItem(

"arzeaReservation",

JSON.stringify({

id:reservationID,

name:fullName,

phone:phone,

email:email,

guests:guests

})

);

button.classList.remove("loading");

button.disabled=false;

button.innerHTML="Reserve Now";

showSuccess(

fullName,

email,

guests,

reservationID

);

}

catch(err){

console.error(err);

button.classList.remove("loading");

button.disabled=false;

button.innerHTML="Reserve Now";

alert("Reservation failed. Please try again.");

}

}
/*========================================
SUCCESS POPUP
========================================*/

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

Scan this QR upon arrival

</p>

<div style="display:flex;gap:15px;justify-content:center;flex-wrap:wrap;">

<button id="downloadTicketPopup">

Download Ticket

</button>

<button id="closePopup">

Continue

</button>

</div>

</div>

`;

document.body.appendChild(popup);



setTimeout(()=>{

new QRCode(

document.getElementById("reservationQR"),

{

text:JSON.stringify({

id:reservationID,

name:name,

email:email,

guests:guests,

date:"19 September 2026",

time:"18.00 WIB"

}),

width:180,

height:180,

colorDark:"#000000",

colorLight:"#ffffff",

correctLevel:QRCode.CorrectLevel.H

}

);

},150);



document

.getElementById("downloadTicketPopup")

.onclick=function(){

window.open(

"ticket.html",

"_blank"

);

};



document

.getElementById("closePopup")

.onclick=function(){

window.location.href="ticket.html";

};

}

/*========================================
DOWNLOAD FROM POPUP
========================================*/

document.addEventListener("click",async function(e){

if(e.target.id==="downloadTicketPopup"){

const reservation=JSON.parse(

localStorage.getItem("arzeaReservation")

);

if(!reservation){

return;

}

window.open(

"ticket.html",

"_blank"

);

}

});


/*========================================
NAVBAR SCROLL EFFECT
========================================*/

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY>80){

navbar.style.background="rgba(0,0,0,.82)";

navbar.style.padding="16px 8%";

navbar.style.boxShadow=

"0 10px 40px rgba(0,0,0,.35)";

}

else{

navbar.style.background="rgba(0,0,0,.35)";

navbar.style.padding="22px 8%";

navbar.style.boxShadow="none";

}

});


/*========================================
BUTTON RIPPLE
========================================*/

document

.querySelectorAll(

".hero-btn,.reserve-btn"

)

.forEach(btn=>{

btn.addEventListener("click",function(e){

const circle=document.createElement("span");

const d=Math.max(

this.clientWidth,

this.clientHeight

);

circle.style.width=d+"px";

circle.style.height=d+"px";

circle.style.left=

e.offsetX-d/2+"px";

circle.style.top=

e.offsetY-d/2+"px";

circle.className="ripple";

this.appendChild(circle);

setTimeout(()=>{

circle.remove();

},700);

});

});


/*========================================
SMOOTH APPEAR
========================================*/

window.addEventListener("load",()=>{

document.body.style.opacity="1";

});


/*========================================
END
========================================*/