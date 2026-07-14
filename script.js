/*======================================================
ARZEA V7
script.js
PART 1
======================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==================================================
    AOS
    ==================================================*/

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 900,
            once: true,
            offset: 100
        });
    }

    /*==================================================
    LOADER
    ==================================================*/

    const loader = document.getElementById("loader");

    function showMusicPopup() {

        const popup = document.getElementById("musicPopup");

        if (!popup) return;

        const saved = localStorage.getItem("music");

        if (saved === "play") {

            const bgMusic = document.getElementById("bgMusic");

            if (bgMusic) {

                bgMusic.volume = 0.25;
                bgMusic.play().catch(() => {});

            }

            popup.style.display = "none";
            return;

        }

        if (saved === "mute") {

            popup.style.display = "none";
            return;

        }

        popup.style.display = "flex";

    }

    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

                showMusicPopup();

            }, 700);

        }, 2200);

    }

    /*==================================================
    MUSIC
    ==================================================*/

    const bgMusic = document.getElementById("bgMusic");

    const playMusic = document.getElementById("playMusic");

    const skipMusic = document.getElementById("skipMusic");

    const musicToggle = document.getElementById("musicToggle");

    if (playMusic) {

        playMusic.addEventListener("click", () => {

            bgMusic.volume = 0.25;

            bgMusic.play().catch(() => {});

            localStorage.setItem("music", "play");

            document.getElementById("musicPopup").style.display = "none";

        });

    }

    if (skipMusic) {

        skipMusic.addEventListener("click", () => {

            localStorage.setItem("music", "mute");

            document.getElementById("musicPopup").style.display = "none";

        });

    }

    if (musicToggle) {

        musicToggle.addEventListener("click", () => {

            if (bgMusic.paused) {

                bgMusic.play().catch(() => {});
                musicToggle.innerHTML = "🔊";

            } else {

                bgMusic.pause();
                musicToggle.innerHTML = "🔇";

            }

        });

    }

    /*==================================================
    COUNTDOWN
    ==================================================*/

    const targetDate = new Date("2026-09-19T18:00:00").getTime();

    function updateCountdown() {

        const now = new Date().getTime();

        const distance = targetDate - now;

        if (distance < 0) return;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60)) /
            1000
        );

        const d = document.getElementById("days");
        const h = document.getElementById("hours");
        const m = document.getElementById("minutes");
        const s = document.getElementById("seconds");

        if (d) d.textContent = days;
        if (h) h.textContent = hours;
        if (m) m.textContent = minutes;
        if (s) s.textContent = seconds;

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);

});

/*======================================================
NAVBAR
======================================================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 80) {

        navbar.style.background = "rgba(0,0,0,.85)";
        navbar.style.backdropFilter = "blur(18px)";
        navbar.style.padding = "18px 8%";
        navbar.style.boxShadow = "0 10px 40px rgba(0,0,0,.45)";

    } else {

        navbar.style.background = "rgba(0,0,0,.35)";
        navbar.style.padding = "22px 8%";
        navbar.style.boxShadow = "none";

    }

});

/*======================================================
SMOOTH SCROLL
======================================================*/

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({

                behavior: "smooth",
                block: "start"

            });

        }

    });

});

console.log("ARZEA Part 1 Loaded");

/*======================================================
ARZEA V7
PART 2
Particles • Hero • Hover • Animation
======================================================*/

/*==================================================
PARTICLES
==================================================*/

const particleContainer = document.getElementById("particles");

if (particleContainer) {

    for (let i = 0; i < 60; i++) {

        const particle = document.createElement("span");

        particle.className = "particle";

        particle.style.left = Math.random() * 100 + "%";

        particle.style.width =
            (2 + Math.random() * 4) + "px";

        particle.style.height =
            particle.style.width;

        particle.style.opacity =
            0.2 + Math.random() * 0.8;

        particle.style.animationDuration =
            (6 + Math.random() * 8) + "s";

        particle.style.animationDelay =
            Math.random() * 5 + "s";

        particleContainer.appendChild(particle);

    }

}

/*==================================================
HERO PARALLAX
==================================================*/

const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {

    if (!hero) return;

    hero.style.backgroundPositionY =
        -(window.scrollY * 0.25) + "px";

});

/*==================================================
MENU CARD HOVER
==================================================*/

document.querySelectorAll(".menu-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-12px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0px)";

    });

});

/*==================================================
GALLERY HOVER
==================================================*/

document.querySelectorAll(".gallery-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0px)";

    });

});

/*==================================================
FEATURE CARD HOVER
==================================================*/

document.querySelectorAll(".feature-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-8px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0px)";

    });

});

/*==================================================
GUEST CARD HOVER
==================================================*/

document.querySelectorAll(".guest-card").forEach(card => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-12px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0px)";

    });

});

/*==================================================
IMAGE ZOOM
==================================================*/

document.querySelectorAll(

".gallery-card img, .menu-card img, .guest-card img"

).forEach(img => {

    img.addEventListener("mouseenter", () => {

        img.style.transform = "scale(1.08)";

    });

    img.addEventListener("mouseleave", () => {

        img.style.transform = "scale(1)";

    });

});

/*==================================================
FADE SECTION ON SCROLL
==================================================*/

const sections = document.querySelectorAll(

"section"

);

window.addEventListener("scroll", () => {

    const trigger = window.innerHeight * 0.85;

    sections.forEach(section => {

        const top = section.getBoundingClientRect().top;

        if (top < trigger) {

            section.style.opacity = "1";
            section.style.transform = "translateY(0)";

        }

    });

});

/*==================================================
PAGE READY
==================================================*/

console.log("ARZEA Part 2 Loaded");

/*======================================================
ARZEA V7
PART 3
RESERVATION SYSTEM
======================================================*/

const reservationForm =
document.getElementById("reservationForm");

/*==================================================
GENERATE RESERVATION ID
==================================================*/

function generateReservationID(){

    const random =
    Math.floor(1000 + Math.random()*9000);

    return "ARZEA-" +
    Date.now() +
    "-" +
    random;

}

/*==================================================
SAVE LOCAL STORAGE
==================================================*/

function saveReservation(data){

    localStorage.setItem(

        "reservation",

        JSON.stringify(data)

    );

}

/*==================================================
GET LOCAL STORAGE
==================================================*/

function getReservation(){

    const data =
    localStorage.getItem("reservation");

    if(!data) return null;

    return JSON.parse(data);

}

/*==================================================
SUCCESS POPUP
==================================================*/

function showSuccessPopup(data){

    const popup =
    document.getElementById("successPopup");

    if(!popup) return;

    popup.style.display="flex";

    const guest =
    document.getElementById("popupGuestName");

    const id =
    document.getElementById("popupReservationID");

    if(guest){

        guest.textContent=data.name;

    }

    if(id){

        id.textContent=data.id;

    }

}

/*==================================================
CLOSE POPUP
==================================================*/

window.addEventListener("click",(e)=>{

    const popup =
    document.getElementById("successPopup");

    if(!popup) return;

    if(e.target===popup){

        popup.style.display="none";

    }

});

/*==================================================
RESERVATION FORM
==================================================*/

if(reservationForm){

reservationForm.addEventListener(

"submit",

function(e){

e.preventDefault();

const data={

id:generateReservationID(),

name:
document.getElementById("fullName").value.trim(),

phone:
document.getElementById("phone").value.trim(),

email:
document.getElementById("email").value.trim(),

guests:
document.getElementById("guests").value,

request:
document.getElementById("message").value.trim(),

date:"19 September 2026",

time:"18:00 WIB",

dress:"Black & Gold"

};

saveReservation(data);

showSuccessPopup(data);

console.log(data);

}

);

}

/*==================================================
AUTO LOAD RESERVATION
==================================================*/

const lastReservation =
getReservation();

if(lastReservation){

console.log(

"Reservation Found",

lastReservation

);

}

/*==================================================
PART 3 READY
==================================================*/

console.log("ARZEA Part 3 Loaded");

/*======================================================
ARZEA V7
PART 4
EMAILJS • QR CODE • SUCCESS SOUND • VIP TICKET
======================================================*/

/*==================================================
EMAILJS INIT
==================================================*/

if (typeof emailjs !== "undefined") {

    emailjs.init({
        publicKey: "-EkYc26ebwGzYOUJW"
    });

}

/*==================================================
SEND EMAIL
==================================================*/

async function sendReservationEmail(data){

    try{

        await emailjs.send(

            "service_yp1tkqq",

            "template_ru3pmnr",

            {

                reservation_id : data.id,

                guest_name : data.name,

                guest_email : data.email,

                guest_phone : data.phone,

                guest_count : data.guests,

                reservation_date : data.date,

                reservation_time : data.time,

                dress_code : data.dress

            }

        );

        console.log("✅ Email sent");

    }catch(error){

        console.error("EmailJS :", error);

    }

}

/*==================================================
SUCCESS SOUND
==================================================*/

function playSuccessSound(){

    const audio = new Audio("audio/success.mp3");

    audio.volume = 0.35;

    audio.play().catch(()=>{});

}

/*==================================================
QR CODE
==================================================*/

function generateQRCode(data){

    const qr =
    document.getElementById("popupQRCode");

    if(!qr) return;

    qr.innerHTML = "";

    new QRCode(qr,{

        text: JSON.stringify({

            id:data.id,

            name:data.name,

            guests:data.guests

        }),

        width:150,

        height:150,

        colorDark:"#111111",

        colorLight:"#ffffff",

        correctLevel:QRCode.CorrectLevel.H

    });

}

/*==================================================
UPGRADE POPUP
==================================================*/

const oldPopup = showSuccessPopup;

showSuccessPopup = async function(data){

    oldPopup(data);

    generateQRCode(data);

    playSuccessSound();

    await sendReservationEmail(data);

};

/*==================================================
OPEN VIP TICKET
==================================================*/

const continueBtn =
document.getElementById("continueBtn");

if(continueBtn){

    continueBtn.addEventListener("click",()=>{

        window.location.href="ticket.html";

    });

}

/*==================================================
PART 4 READY
==================================================*/

console.log("ARZEA Part 4 Loaded");

/*======================================================
ARZEA V7
PART 5
FINAL UTILITIES
======================================================*/

/*==================================================
RESET FORM
==================================================*/

function resetReservationForm(){

    if(reservationForm){

        reservationForm.reset();

    }

}

/*==================================================
BUTTON LOADING
==================================================*/

const reserveButton =
document.getElementById("reserveButton");

if(reserveButton){

    reserveButton.addEventListener("click",()=>{

        reserveButton.disabled = true;

        reserveButton.innerHTML = "Processing...";

        setTimeout(()=>{

            reserveButton.disabled = false;

            reserveButton.innerHTML = "Reserve Now";

        },1800);

    });

}

/*==================================================
BACK TO TOP
==================================================*/

const topButton=document.createElement("button");

topButton.id="topButton";

topButton.innerHTML="↑";

document.body.appendChild(topButton);

topButton.style.cssText=`

position:fixed;
right:30px;
bottom:30px;
width:55px;
height:55px;
border:none;
border-radius:50%;
background:#D4AF37;
color:#111;
font-size:22px;
cursor:pointer;
display:none;
z-index:999999;
box-shadow:0 15px 35px rgba(0,0,0,.35);

`;

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        topButton.style.display="block";

    }else{

        topButton.style.display="none";

    }

});

topButton.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};

/*==================================================
PRELOAD IMAGES
==================================================*/

[
"images/logo.png",
"images/hero.png",
"images/indoor.png",
"images/outdoor.jpeg",
"images/meeting.jpg",
"images/wagyu.jpg",
"images/pasta.jpg",
"images/prawn.jpg",
"images/dessert.jpg",
"images/matcha.jpg",
"images/mocktail.jpg",
"images/blush.jpg",
"images/midnight.jpg",
"images/mahalini.jpg",
"images/nagita.jpg",
"images/raim.jpg"

].forEach(src=>{

    const img=new Image();

    img.src=src;

});

/*==================================================
VISITOR COUNTER
==================================================*/

let visitors = Number(

localStorage.getItem("visitors") || 0

);

visitors++;

localStorage.setItem(

"visitors",

visitors

);

console.log("Visitors :",visitors);

/*==================================================
AUTO OPEN TICKET
==================================================*/

const continueButton =
document.getElementById("continueBtn");

if(continueButton){

    continueButton.addEventListener("click",()=>{

        window.location.href="ticket.html";

    });

}

/*==================================================
ESC CLOSE POPUP
==================================================*/

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        const popup=document.getElementById("successPopup");

        if(popup){

            popup.style.display="none";

        }

    }

});

/*==================================================
READY
==================================================*/

console.log("===================================");

console.log("ARZEA V7 FINAL READY");

console.log("Popup ✔");

console.log("EmailJS ✔");

console.log("QR Code ✔");

console.log("VIP Ticket ✔");

console.log("Reservation ✔");

console.log("===================================");


/*==================================================
DRONE PARALLAX
==================================================*/

const droneImage=document.querySelector(".drone-image");

window.addEventListener("scroll",()=>{

if(!droneImage) return;

const y=window.scrollY;

droneImage.style.transform=

`scale(1.08) translateY(${y*0.12}px)`;

});