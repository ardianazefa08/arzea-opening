/*======================================================
ARZEA V6
TICKET.JS
PART 1
======================================================*/

document.addEventListener("DOMContentLoaded",()=>{

let reservation=null;

const ticketParams=new URLSearchParams(window.location.search);

try{

reservation=JSON.parse(localStorage.getItem("reservation"));

}catch(error){

console.error("Invalid reservation data:",error);

}

// Email links are opened in a fresh browser with no local storage. Build a
// safe ticket from the reservation ID in the link so the invitation remains
// viewable from the inbox.
if(!reservation && ticketParams.get("id")){

reservation={

id:ticketParams.get("id"),
name:ticketParams.get("name") || "VIP Guest",
guests:ticketParams.get("guests") || "1 Guest"

};

}

const ticketStatus=document.getElementById("ticketStatus");

function setTicketStatus(message){

if(ticketStatus) ticketStatus.textContent=message;

}



/*====================================
CHECK DATA
====================================*/

if(!reservation){

alert("Reservation not found.");

window.location.href="index.html";

return;

}



/*====================================
FILL DATA
====================================*/

document.getElementById("ticketName").textContent=

reservation.name;



document.getElementById("ticketID").textContent=

reservation.id;



document.getElementById("ticketGuests").textContent=

reservation.guests;



/*====================================
QR CODE
====================================*/

if(typeof QRCode!=="undefined"){

new QRCode(

document.getElementById("qrcode"),

{

text:JSON.stringify(reservation),

width:180,

height:180,

colorDark:"#111111",

colorLight:"#ffffff",

correctLevel:QRCode.CorrectLevel.H

}

);

}else{

setTicketStatus("QR code could not be loaded. Please refresh the page.");

}



/*====================================
PRINT
====================================*/

const printBtn=document.getElementById("printTicket");

if(printBtn){

printBtn.onclick=()=>{

window.print();

};

}



/*====================================
PDF
====================================*/

const pdfBtn=document.getElementById("downloadPDF");

if(pdfBtn){

pdfBtn.addEventListener("click",async()=>{

if(typeof html2canvas==="undefined" || !window.jspdf){

setTicketStatus("PDF generator is still loading. Please try again in a moment.");

return;

}

setTicketStatus("Creating PDF…");

try{

const card=document.getElementById("ticketCard");

const canvas=await html2canvas(card,{

scale:2,

useCORS:true

});

const img=canvas.toDataURL("image/png");

const {jsPDF}=window.jspdf;

const pdf=new jsPDF("p","mm","a4");

const pageWidth=pdf.internal.pageSize.getWidth();

const imgWidth=pageWidth-20;

const imgHeight=

canvas.height*imgWidth/canvas.width;

pdf.addImage(

img,

"PNG",

10,

10,

imgWidth,

imgHeight

);

pdf.save(

reservation.id+".pdf"

);

setTicketStatus("PDF downloaded.");

}catch(error){

console.error("PDF download failed:",error);

setTicketStatus("Could not create PDF. Please try again.");

}

});

}

/*====================================
SAVE PNG
====================================*/

const pngBtn=document.getElementById("downloadPNG");

if(pngBtn){

pngBtn.addEventListener("click",async()=>{

if(typeof html2canvas==="undefined"){

setTicketStatus("Image generator is still loading. Please try again in a moment.");

return;

}

setTicketStatus("Creating image…");

try{

const card=document.getElementById("ticketCard");

const canvas=await html2canvas(card,{

scale:3,

useCORS:true,

backgroundColor:null

});

const link=document.createElement("a");

link.download=reservation.id+".png";

link.href=canvas.toDataURL("image/png");

link.click();

setTicketStatus("Image downloaded.");

}catch(error){

console.error("Image download failed:",error);

setTicketStatus("Could not create image. Please try again.");

}

});

}



/*====================================
SUCCESS SOUND
====================================*/

const successAudio=new Audio("audio/success.mp3");

successAudio.volume=.30;



/*====================================
HOVER SOUND
====================================*/

document.querySelectorAll(

".ticket-buttons button,.ticket-buttons a"

).forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="translateY(-5px)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="translateY(0px)";

});

});



/*====================================
CARD FADE IN
====================================*/

const card=document.getElementById("ticketCard");

if(card){

card.animate(

[

{

opacity:0,

transform:"translateY(40px)"

},

{

opacity:1,

transform:"translateY(0)"

}

],

{

duration:900,

fill:"forwards",

easing:"ease"

}

);

}



/*====================================
AUTO PLAY SUCCESS SOUND
====================================*/

window.addEventListener("load",()=>{

successAudio.play().catch(()=>{});

});



/*====================================
READY
====================================*/

console.log("ARZEA VIP Ticket Ready");

});
