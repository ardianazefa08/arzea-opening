/*======================================================
ARZEA V6
TICKET.JS
PART 1
======================================================*/

document.addEventListener("DOMContentLoaded",()=>{

const reservation=JSON.parse(

localStorage.getItem("reservation")

);



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

pdfBtn.addEventListener("click",async()=>{

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

});

/*====================================
SAVE PNG
====================================*/

const pngBtn=document.getElementById("downloadPNG");

if(pngBtn){

pngBtn.addEventListener("click",async()=>{

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