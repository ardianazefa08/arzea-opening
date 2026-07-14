// =====================================================
// ARZEA VIP TICKET
// =====================================================

// ==========================
// LOAD RESERVATION
// ==========================

const reservation = JSON.parse(
localStorage.getItem("arzeaReservation")
);

if(!reservation){

window.location.href="index.html";

}



// ==========================
// FILL DATA
// ==========================

document.getElementById("guestName").textContent=
reservation.name;

document.getElementById("reservationID").textContent=
reservation.id;

document.getElementById("guestEmail").textContent=
reservation.email;

document.getElementById("guestCount").textContent=
reservation.guests;



// ==========================
// QR CODE
// ==========================

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

Dress Code : Elegant Black`,

width:220,

height:220,

colorDark:"#000000",

colorLight:"#ffffff",

correctLevel:QRCode.CorrectLevel.H

}

);



// ==========================
// DOWNLOAD PDF
// ==========================

document

.getElementById("downloadTicket")

.addEventListener(

"click",

async function(){

const ticket=

document.querySelector(".ticket-card");

const canvas=

await html2canvas(ticket,{

scale:2,

backgroundColor:null

});

const img=

canvas.toDataURL("image/png");

const{

jsPDF

}=window.jspdf;

const pdf=

new jsPDF({

orientation:"portrait",

unit:"mm",

format:"a4"

});

const width=190;

const height=

canvas.height*

width/

canvas.width;

pdf.addImage(

img,

"PNG",

10,

10,

width,

height

);

pdf.save(

`ARZEA-${reservation.id}.pdf`

);

}

);



// ==========================
// PRINT
// ==========================

window.addEventListener(

"beforeprint",

()=>{

document.body.style.background="#ffffff";

}

);

window.addEventListener(

"afterprint",

()=>{

document.body.style.background="#050505";

}

);



// ==========================
// COUNTDOWN
// ==========================

const eventDate=

new Date(

"September 19, 2026 18:00:00"

).getTime();

const timer=

setInterval(()=>{

const now=

new Date().getTime();

const distance=

eventDate-now;

if(distance<=0){

clearInterval(timer);

return;

}

},1000);



// ==========================
// END
// ==========================