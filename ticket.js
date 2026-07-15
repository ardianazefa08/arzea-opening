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

function renderTicketQRCode(){

const qrElement=document.getElementById("qrcode");

if(!qrElement || typeof QRCode==="undefined"){

setTicketStatus("QR code could not be loaded. Please refresh the page.");

return;

}

qrElement.innerHTML="";

new QRCode(qrElement,{

text:JSON.stringify({

id:reservation.id,
name:reservation.name,
guests:reservation.guests

}),

width:180,

height:180,

colorDark:"#111111",

colorLight:"#ffffff",

correctLevel:QRCode.CorrectLevel.H

});

}

requestAnimationFrame(renderTicketQRCode);



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
HIGH-QUALITY EXPORT
====================================*/

async function captureTicket(){

const card=document.getElementById("ticketCard");

if(!card || typeof html2canvas==="undefined"){

throw new Error("Ticket image generator is unavailable.");

}

// Wait for the logo and premium fonts, so the downloaded invitation matches
// the card the guest sees on screen.
if(document.fonts && document.fonts.ready){

await document.fonts.ready;

}

await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));

return html2canvas(card,{

scale:3,
useCORS:true,
allowTaint:false,
backgroundColor:"#101010",
imageTimeout:15000,
scrollX:0,
scrollY:-window.scrollY,
// Always export the elegant desktop invitation, even when the guest opens
// the ticket on a phone.
windowWidth:1300,
onclone:clonedDocument=>{

const clonedCard=clonedDocument.getElementById("ticketCard");

if(clonedCard){

clonedCard.style.width="1200px";
clonedCard.style.maxWidth="1200px";
clonedCard.style.animation="none";
clonedCard.style.transform="none";

}

const exportStyle=clonedDocument.createElement("style");
exportStyle.textContent="*,*::before,*::after{animation:none!important;transition:none!important}";
clonedDocument.head.appendChild(exportStyle);

}

});

}

function downloadCanvas(canvas,filename){

return new Promise((resolve,reject)=>{

canvas.toBlob(blob=>{

if(!blob){

reject(new Error("Could not create the image file."));

return;

}

const link=document.createElement("a");
const objectUrl=URL.createObjectURL(blob);

link.href=objectUrl;
link.download=filename;
link.style.display="none";
document.body.appendChild(link);
link.click();
link.remove();

window.setTimeout(()=>URL.revokeObjectURL(objectUrl),1000);
resolve();

},"image/png");

});

}

const pdfBtn=document.getElementById("downloadPDF");

if(pdfBtn){

pdfBtn.addEventListener("click",async()=>{

if(typeof html2canvas==="undefined" || !window.jspdf){

setTicketStatus("PDF generator is still loading. Please try again in a moment.");

return;

}

setTicketStatus("Creating PDF…");

try{

const canvas=await captureTicket();

const img=canvas.toDataURL("image/png");

const {jsPDF}=window.jspdf;

const pdf=new jsPDF("l","mm","a4");

const pageWidth=pdf.internal.pageSize.getWidth();

const pageHeight=pdf.internal.pageSize.getHeight();

const imgWidth=pageWidth-20;

let imgHeight=

canvas.height*imgWidth/canvas.width;

let renderWidth=imgWidth;

if(imgHeight>pageHeight-20){

imgHeight=pageHeight-20;
renderWidth=canvas.width*imgHeight/canvas.height;

}

pdf.addImage(

img,

"PNG",

((pageWidth-renderWidth)/2),

10,

renderWidth,

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

const canvas=await captureTicket();

await downloadCanvas(canvas,reservation.id+".png");

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
