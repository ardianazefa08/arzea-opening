/*==================================================
ARZEA V6
SCRIPT.JS
==================================================*/

document.addEventListener("DOMContentLoaded",()=>{

/*====================================
AOS
====================================*/

if(typeof AOS!=="undefined"){

AOS.init({

duration:900,
once:true,
offset:120

});

}


/*====================================
LOADER
====================================*/

const loader=document.getElementById("loader");

if(loader){

setTimeout(()=>{

loader.style.opacity="0";

setTimeout(()=>{

loader.style.display="none";

showMusicPopup();

},800);

},2200);

}


/*====================================
MUSIC
====================================*/

const popup=document.getElementById("musicPopup");

const music=document.getElementById("bgMusic");

const toggle=document.getElementById("musicToggle");

function showMusicPopup(){

if(localStorage.getItem("music")=="play"){

music.volume=.25;

music.play().catch(()=>{});

popup.style.display="none";

return;

}

if(localStorage.getItem("music")=="mute"){

popup.style.display="none";

return;

}

popup.style.display="flex";

}

const playBtn=document.getElementById("playMusic");

const skipBtn=document.getElementById("skipMusic");

if(playBtn){

playBtn.onclick=()=>{

music.volume=.25;

music.play().catch(()=>{});

localStorage.setItem("music","play");

popup.style.display="none";

};

}

if(skipBtn){

skipBtn.onclick=()=>{

localStorage.setItem("music","mute");

popup.style.display="none";

};

}

if(toggle){

toggle.onclick=()=>{

if(music.paused){

music.play().catch(()=>{});

toggle.innerHTML="🔊";

}else{

music.pause();

toggle.innerHTML="🔇";

}

};

}



/*====================================
COUNTDOWN
====================================*/

const target=new Date("2026-09-19T18:00:00").getTime();

function countdown(){

const now=new Date().getTime();

const distance=target-now;

if(distance<0)return;

const d=Math.floor(distance/86400000);

const h=Math.floor((distance%86400000)/3600000);

const m=Math.floor((distance%3600000)/60000);

const s=Math.floor((distance%60000)/1000);

const days=document.getElementById("days");

const hours=document.getElementById("hours");

const minutes=document.getElementById("minutes");

const seconds=document.getElementById("seconds");

if(days)days.textContent=d;

if(hours)hours.textContent=h;

if(minutes)minutes.textContent=m;

if(seconds)seconds.textContent=s;

}

countdown();

setInterval(countdown,1000);

});