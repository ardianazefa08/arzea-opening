/*==================================================
ARZEA LOUNGE & GARDEN
SCRIPT.JS V3 PREMIUM
==================================================*/

/*========================================
EMAILJS
========================================*/

emailjs.init({
    publicKey: "-EkYc26ebwGzYOuJW"
});

/*========================================
LOADER
========================================*/

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";

            loader.style.pointerEvents = "none";

            setTimeout(() => {

                loader.remove();

            }, 800);

        }, 1800);

    }

});


/*========================================
AOS
========================================*/

if (typeof AOS !== "undefined") {

    AOS.init({

        duration:1000,

        once:true,

        offset:120

    });

}


/*========================================
COUNTDOWN
========================================*/

const targetDate = new Date("2026-09-19T18:00:00+07:00").getTime();

const day = document.getElementById("days");
const hour = document.getElementById("hours");
const minute = document.getElementById("minutes");
const second = document.getElementById("seconds");

function updateCountdown(){

    if(!day) return;

    const now = new Date().getTime();

    const distance = targetDate - now;

    if(distance <= 0){

        day.textContent="00";
        hour.textContent="00";
        minute.textContent="00";
        second.textContent="00";

        return;

    }

    day.textContent=Math.floor(distance/(1000*60*60*24));

    hour.textContent=Math.floor(

        (distance%(1000*60*60*24))

        /(1000*60*60)

    );

    minute.textContent=Math.floor(

        (distance%(1000*60*60))

        /(1000*60)

    );

    second.textContent=Math.floor(

        (distance%(1000*60))

        /1000

    );

}

updateCountdown();

setInterval(updateCountdown,1000);


/*========================================
NAVBAR
========================================*/

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

    if(!navbar) return;

    if(window.scrollY>60){

        navbar.style.background="rgba(0,0,0,.85)";

        navbar.style.padding="16px 8%";

        navbar.style.boxShadow=

        "0 15px 40px rgba(0,0,0,.35)";

    }

    else{

        navbar.style.background="rgba(0,0,0,.35)";

        navbar.style.padding="22px 8%";

        navbar.style.boxShadow="none";

    }

});


/*========================================
SMOOTH SCROLL
========================================*/

document

.querySelectorAll('a[href^="#"]')

.forEach(anchor=>{

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


/*========================================
RESERVATION FORM
========================================*/

const form=document.querySelector(".reserve-form");

if(form){

    form.addEventListener(

        "submit",

        submitReservation

    );

}

/*========================================
SUBMIT RESERVATION
========================================*/

async function submitReservation(e){

e.preventDefault();

const button=document.querySelector(".reserve-btn");

const fullName=form.querySelector('input[type="text"]').value.trim();

const phone=form.querySelector('input[type="tel"]').value.trim();

const email=form.querySelector('input[type="email"]').value.trim();

const guests=form.querySelector("select").value;

const request=form.querySelector("textarea").value.trim();

if(!fullName){

alert("Please enter your full name.");

return;

}

if(!phone){

alert("Please enter your phone number.");

return;

}

if(!email){

alert("Please enter your email.");

return;

}

if(guests==="Number of Guests"){

alert("Please select number of guests.");

return;

}

button.disabled=true;

button.classList.add("loading");

button.innerHTML="Sending...";

const reservationID=

"ARZEA-GO-"+

new Date().getFullYear()+"-"+

Math.floor(Math.random()*9000+1000);

const reservation={

id:reservationID,

name:fullName,

phone:phone,

email:email,

guests:guests,

message:request,

date:"19 September 2026",

time:"18.00 WIB"

};

try{

await emailjs.send(

"service_yp1tkqq",

"template_zp0batn",

{

name:reservation.name,

phone:reservation.phone,

email:reservation.email,

guests:reservation.guests,

message:reservation.message

}

);

await emailjs.send(

"service_yp1tkqq",

"template_ru3pmnr",

{

name:reservation.name,

email:reservation.email,

phone:reservation.phone,

guests:reservation.guests,

reservationID:reservation.id

}

);

localStorage.setItem(

"arzeaReservation",

JSON.stringify(reservation)

);

button.classList.remove("loading");

button.disabled=false;

button.innerHTML="Reserve Now";

showSuccess(reservation);

}

catch(error){

console.error(error);

button.classList.remove("loading");

button.disabled=false;

button.innerHTML="Reserve Now";

alert("Reservation failed. Please try again.");

}

}

/*========================================
SUCCESS POPUP
========================================*/

function showSuccess(reservation){

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

${reservation.id}

</p>

<p>

<b>Name</b><br>

${reservation.name}

</p>

<p>

<b>Email</b><br>

${reservation.email}

</p>

<p>

<b>Guests</b><br>

${reservation.guests}

</p>

<p>

<b>Date</b><br>

${reservation.date}

</p>

<p>

<b>Time</b><br>

${reservation.time}

</p>

</div>

<div class="qr-box">

<div id="reservationQR"></div>

</div>

<p class="scan-text">

🖤 Scan this QR upon arrival

</p>

<div class="popup-buttons">

<button
id="downloadTicketPopup">

Download Ticket

</button>

<button
id="continuePopup">

Continue

</button>

</div>

</div>

`;

document.body.appendChild(popup);


/*==========================
QR CODE
==========================*/

setTimeout(()=>{

const qrTarget=document.getElementById("reservationQR");

if(qrTarget && typeof QRCode!=="undefined"){

new QRCode(qrTarget,{

text:JSON.stringify(reservation),

width:180,

height:180,

colorDark:"#000000",

colorLight:"#ffffff",

correctLevel:QRCode.CorrectLevel.H

});

}

},200);


/*==========================
DOWNLOAD
==========================*/

document

.getElementById("downloadTicketPopup")

.addEventListener("click",()=>{

window.location.href="ticket.html";

});


/*==========================
CONTINUE
==========================*/

document

.getElementById("continuePopup")

.addEventListener("click",()=>{

popup.classList.add("hide");

setTimeout(()=>{

window.location.href="ticket.html";

},300);

});

}

/*========================================
RIPPLE EFFECT
========================================*/

document

.querySelectorAll(

".hero-btn,.reserve-btn,#continuePopup,#downloadTicketPopup"

)

.forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

ripple.className="ripple";

const size=Math.max(

this.clientWidth,

this.clientHeight

);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=

e.offsetX-size/2+"px";

ripple.style.top=

e.offsetY-size/2+"px";

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},700);

});

});


/*========================================
CURSOR GLOW
========================================*/

const glow=document.createElement("div");

glow.className="cursor-glow";

document.body.appendChild(glow);

window.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});


/*========================================
PARTICLES
========================================*/

const particleContainer=document.getElementById("particles");

if(particleContainer){

for(let i=0;i<80;i++){

const p=document.createElement("span");

p.className="particle";

p.style.left=Math.random()*100+"vw";

p.style.animationDelay=Math.random()*8+"s";

p.style.animationDuration=

6+Math.random()*8+"s";

p.style.opacity=Math.random();

particleContainer.appendChild(p);

}

}


/*========================================
WINDOW LOAD
========================================*/

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

});


/*========================================
END SCRIPT
========================================*/

/*========================================
GOLD CONFETTI
========================================*/

function launchConfetti(){

for(let i=0;i<60;i++){

const confetti=document.createElement("div");

confetti.className="gold-confetti";

confetti.style.left=Math.random()*100+"vw";

confetti.style.animationDuration=

2+Math.random()*3+"s";

confetti.style.animationDelay=

Math.random()*.5+"s";

document.body.appendChild(confetti);

setTimeout(()=>{

confetti.remove();

},5000);

}

}



/*========================================
SUCCESS SOUND
========================================*/

function playSuccessSound(){

try{

const audio=new Audio(

"https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3"

);

audio.volume=.25;

audio.play();

}

catch(e){

console.log(e);

}

}



/*========================================
SHOW SUCCESS EXTENSION
========================================*/

const oldShowSuccess=showSuccess;

showSuccess=function(reservation){

playSuccessSound();

launchConfetti();

oldShowSuccess(reservation);

};



/*========================================
DISABLE FORM AFTER SUCCESS
========================================*/

window.addEventListener("pageshow",()=>{

const form=document.querySelector(".reserve-form");

if(form){

form.reset();

}

});



/*========================================
ANTI DOUBLE SUBMIT
========================================*/

let sending=false;

document.addEventListener("submit",(e)=>{

if(sending){

e.preventDefault();

return;

}

sending=true;

setTimeout(()=>{

sending=false;

},4000);

});



/*========================================
PRELOAD IMAGES
========================================*/

[

"images/logo.png",

"images/hero.png",

"images/indoor.png",

"images/outdoor.jpeg",

"images/wagyu.jpg",

"images/pasta.jpg",

"images/prawn.jpg",

"images/dessert.jpg"

]

.forEach(src=>{

const img=new Image();

img.src=src;

});



/*========================================
CONSOLE
========================================*/

console.log(

"%cARZEA Lounge & Garden V3 Premium",

"color:#d4af37;font-size:18px;font-weight:bold;"

);

console.log(

"Developed with ❤️"

);



/*========================================
END
========================================*/