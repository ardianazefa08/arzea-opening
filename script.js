/*======================================================
ARZEA V6
script.js
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

    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";

            setTimeout(() => {

                loader.style.display = "none";

                showMusicPopup();

            }, 700);

        }, 2000);

    }

    /*==================================================
    MUSIC
    ==================================================*/

    const musicPopup = document.getElementById("musicPopup");

    const bgMusic = document.getElementById("bgMusic");

    const playMusic = document.getElementById("playMusic");

    const skipMusic = document.getElementById("skipMusic");

    const musicToggle = document.getElementById("musicToggle");

    function showMusicPopup() {

        const saved = localStorage.getItem("music");

        if (saved === "play") {

            bgMusic.volume = 0.2;

            bgMusic.play().catch(() => { });

            musicPopup.style.display = "none";

            return;

        }

        if (saved === "mute") {

            musicPopup.style.display = "none";

            return;

        }

        musicPopup.style.display = "flex";

    }

    if (playMusic) {

        playMusic.addEventListener("click", () => {

            bgMusic.volume = 0.2;

            bgMusic.play().catch(() => { });

            localStorage.setItem("music", "play");

            musicPopup.style.display = "none";

        });

    }

    if (skipMusic) {

        skipMusic.addEventListener("click", () => {

            localStorage.setItem("music", "mute");

            musicPopup.style.display = "none";

        });

    }

    if (musicToggle) {

        musicToggle.addEventListener("click", () => {

            if (bgMusic.paused) {

                bgMusic.play();

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

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = days;

        document.getElementById("hours").textContent = hours;

        document.getElementById("minutes").textContent = minutes;

        document.getElementById("seconds").textContent = seconds;

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);

});

/*======================================================
PART 2
NAVBAR • SMOOTH SCROLL • PARTICLES • PARALLAX
======================================================*/

/*=========================
NAVBAR SCROLL
=========================*/

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 80) {

        navbar.style.background = "rgba(0,0,0,.85)";
        navbar.style.backdropFilter = "blur(20px)";
        navbar.style.padding = "16px 8%";
        navbar.style.boxShadow = "0 10px 35px rgba(0,0,0,.45)";

    } else {

        navbar.style.background = "rgba(0,0,0,.35)";
        navbar.style.padding = "22px 8%";
        navbar.style.boxShadow = "none";

    }

});


/*=========================
SMOOTH SCROLL
=========================*/

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth",
                block:"start"

            });

        }

    });

});


/*=========================
PARTICLES
=========================*/

const particleBox = document.getElementById("particles");

if(particleBox){

    for(let i=0;i<60;i++){

        const particle = document.createElement("span");

        particle.className = "particle";

        particle.style.left = Math.random()*100 + "%";

        particle.style.animationDuration =
        (6 + Math.random()*8) + "s";

        particle.style.animationDelay =
        Math.random()*5 + "s";

        particle.style.opacity =
        0.3 + Math.random()*0.7;

        particleBox.appendChild(particle);

    }

}


/*=========================
HERO PARALLAX
=========================*/

const hero = document.querySelector(".hero");

window.addEventListener("scroll",()=>{

    if(!hero) return;

    hero.style.backgroundPositionY =
    -(window.scrollY*0.25)+"px";

});


/*=========================
IMAGE HOVER
=========================*/

document.querySelectorAll(

".gallery-card img,.menu-card img,.guest-card img"

).forEach(img=>{

    img.addEventListener("mouseenter",()=>{

        img.style.transform="scale(1.08)";

    });

    img.addEventListener("mouseleave",()=>{

        img.style.transform="scale(1)";

    });

});


/*=========================
PAGE READY
=========================*/

console.log("ARZEA Part 2 Loaded");

/*======================================================
PART 3
RESERVATION SYSTEM
======================================================*/

const reservationForm = document.getElementById("reservationForm");

function generateReservationID() {

    return "ARZEA-" + Date.now();

}

function showSuccessPopup(data) {

    const popup = document.getElementById("successPopup");

    if (!popup) return;

    popup.style.display = "flex";

    const guestName = document.getElementById("popupGuestName");
    const reservationId = document.getElementById("popupReservationID");

    if (guestName) guestName.textContent = data.name;
    if (reservationId) reservationId.textContent = data.id;

}

if (reservationForm) {

    reservationForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const data = {

            id: generateReservationID(),

            name: document.getElementById("name").value,

            email: document.getElementById("email").value,

            phone: document.getElementById("phone").value,

            guests: document.getElementById("guests").value,

            request: document.getElementById("request").value,

            date: "19 September 2026",

            time: "18:00 WIB",

            dress: "Black & Gold"

        };

        localStorage.setItem(

            "reservation",

            JSON.stringify(data)

        );

        showSuccessPopup(data);

    });

}

/*======================================================
PART 4
EMAIL • QR • SUCCESS
======================================================*/

/*=========================
EMAILJS
=========================*/

emailjs.init({
    publicKey: "-EkYc26ebwGzYOUJW"
});

async function sendReservationEmail(data){

    try{

        await emailjs.send(

            "service_yp1tkqq",

            "template_ru3pmnr",

            {

                reservation_id:data.id,

                guest_name:data.name,

                guest_email:data.email,

                guest_phone:data.phone,

                guest_count:data.guests,

                reservation_date:data.date,

                reservation_time:data.time,

                dress_code:data.dress

            }

        );

        console.log("Email berhasil dikirim");

    }catch(err){

        console.error(err);

    }

}


/*=========================
SUCCESS SOUND
=========================*/

function playSuccessSound(){

    const audio=new Audio("audio/success.mp3");

    audio.volume=0.35;

    audio.play().catch(()=>{});

}


/*=========================
QR CODE
=========================*/

function generateQRCode(data){

    const qr=document.getElementById("popupQRCode");

    if(!qr) return;

    qr.innerHTML="";

    new QRCode(qr,{

        text:JSON.stringify(data),

        width:150,

        height:150,

        colorDark:"#C8A74E",

        colorLight:"#ffffff",

        correctLevel:QRCode.CorrectLevel.H

    });

}


/*=========================
UPGRADE POPUP
=========================*/

const oldShowPopup=showSuccessPopup;

showSuccessPopup=function(data){

    oldShowPopup(data);

    playSuccessSound();

    generateQRCode(data);

    sendReservationEmail(data);

};


/*=========================
CONTINUE BUTTON
=========================*/

const continueBtn=document.getElementById("continueBtn");

if(continueBtn){

    continueBtn.addEventListener("click",()=>{

        window.location.href="ticket.html";

    });

}

/*======================================================
PART 5
FINAL UTILITIES
======================================================*/

/*=========================
RESET FORM
=========================*/

function resetReservationForm(){

    if(reservationForm){

        reservationForm.reset();

    }

}


/*=========================
BUTTON LOADING
=========================*/

const reserveButton=document.querySelector(".reserve-btn");

if(reserveButton){

    reserveButton.addEventListener("click",()=>{

        reserveButton.disabled=true;

        reserveButton.innerHTML="Processing...";

        setTimeout(()=>{

            reserveButton.disabled=false;

            reserveButton.innerHTML="Reserve Now";

        },2200);

    });

}


/*=========================
BACK TO TOP
=========================*/

const topButton=document.createElement("button");

topButton.id="topButton";

topButton.innerHTML="↑";

document.body.appendChild(topButton);

topButton.style.cssText=`
position:fixed;
right:28px;
bottom:28px;
width:54px;
height:54px;
border:none;
border-radius:50%;
background:#C8A74E;
color:#111;
font-size:22px;
cursor:pointer;
display:none;
z-index:99999;
box-shadow:0 10px 25px rgba(0,0,0,.35);
`;

window.addEventListener("scroll",()=>{

    topButton.style.display=

    window.scrollY>450

    ?

    "block"

    :

    "none";

});

topButton.onclick=()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

};


/*=========================
PRELOAD IMAGES
=========================*/

const preloadImages=[

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

];

preloadImages.forEach(src=>{

    const img=new Image();

    img.src=src;

});


/*=========================
SAVE RESERVATION
=========================*/

window.addEventListener("beforeunload",()=>{

    const reservation=

    localStorage.getItem("reservation");

    if(reservation){

        console.log("Reservation Saved");

    }

});


/*=========================
VISITOR COUNTER
=========================*/

let visitors=

Number(localStorage.getItem("visitors")||0);

visitors++;

localStorage.setItem(

"visitors",

visitors

);

console.log("Visitors :",visitors);


/*=========================
READY
=========================*/

console.log("ARZEA V6 READY ✨");