/*==================================================
ARZEA LOUNGE & GARDEN
VIP TICKET
==================================================*/

/*========================================
LOAD RESERVATION
========================================*/

const reservation = JSON.parse(

localStorage.getItem("arzeaReservation")

);

if(!reservation){

alert("Reservation data not found.");

window.location.href="index.html";

}



/*========================================
FILL DATA
========================================*/

document.getElementById("guestName").textContent=

reservation.name;

document.getElementById("reservationID").textContent=

reservation.id;

document.getElementById("guestEmail").textContent=

reservation.email;

document.getElementById("guestGuests").textContent=

reservation.guests;



/*========================================
PARTICLES
========================================*/

const particles=document.getElementById("particles");

if(particles){

for(let i=0;i<70;i++){

const p=document.createElement("span");

p.className="particle";

p.style.left=Math.random()*100+"vw";

p.style.animationDuration=

5+Math.random()*8+"s";

p.style.animationDelay=

Math.random()*5+"s";

p.style.opacity=Math.random();

particles.appendChild(p);

}

}



/*========================================
QR CODE
========================================*/

window.addEventListener("load",()=>{

const qrTarget=document.getElementById("qrcode");

if(qrTarget && typeof QRCode!=="undefined"){

new QRCode(qrTarget,{

text:JSON.stringify({

id:reservation.id,

name:reservation.name,

email:reservation.email,

guests:reservation.guests,

date:"19 September 2026",

time:"18.00 WIB"

}),

width:220,

height:220,

colorDark:"#000000",

colorLight:"#ffffff",

correctLevel:QRCode.CorrectLevel.H

});

}

});

/*========================================
DOWNLOAD PDF
========================================*/

document

.getElementById("downloadTicket")

.addEventListener("click",async()=>{

const card=document.getElementById("ticketCard");

const canvas=await html2canvas(card,{

scale:3,

useCORS:true,

backgroundColor:null

});

const img=canvas.toDataURL("image/png");

const {jsPDF}=window.jspdf;

const pdf=new jsPDF({

orientation:"portrait",

unit:"mm",

format:"a4"

});

const pdfWidth=190;

const pdfHeight=

canvas.height*

pdfWidth/

canvas.width;

pdf.addImage(

img,

"PNG",

10,

10,

pdfWidth,

pdfHeight

);

pdf.save(

`${reservation.id}.pdf`

);

});



/*========================================
DOWNLOAD PNG
========================================*/

document

.getElementById("downloadPNG")

.addEventListener("click",async()=>{

const card=document.getElementById("ticketCard");

const canvas=await html2canvas(card,{

scale:3,

useCORS:true,

backgroundColor:null

});

const link=document.createElement("a");

link.download=`${reservation.id}.png`;

link.href=canvas.toDataURL("image/png");

link.click();

});



/*========================================
RIPPLE EFFECT
========================================*/

document

.querySelectorAll(".ticket-buttons button")

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
CARD ANIMATION
========================================*/

window.addEventListener("load",()=>{

const card=document.getElementById("ticketCard");

card.animate([

{

opacity:0,

transform:"translateY(80px) scale(.95)"

},

{

opacity:1,

transform:"translateY(0) scale(1)"

}

],{

duration:900,

easing:"ease-out"

});

});



/*========================================
PRELOAD
========================================*/

const logo=new Image();

logo.src="images/logo.png";



/*========================================
END
========================================*/

