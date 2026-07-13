// ==============================
// Load Reservation Data
// ==============================

const data = JSON.parse(localStorage.getItem("arzeaReservation"));

if(data){

document.getElementById("reservationID").textContent = data.id;
document.getElementById("guestName").textContent = data.name;
document.getElementById("guestEmail").textContent = data.email;
document.getElementById("guestPhone").textContent = data.phone;
document.getElementById("guestGuests").textContent = data.guests;

new QRCode(
document.getElementById("ticketQR"),
{
text:data.id,
width:180,
height:180
}
);

}

// ==============================
// Print Ticket
// ==============================

document
.getElementById("printTicket")
.onclick=function(){

window.print();

};