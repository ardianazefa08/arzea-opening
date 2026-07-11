document.addEventListener("DOMContentLoaded", () => {

    const button = document.querySelector("button");

    button.addEventListener("click", () => {

        button.innerHTML = "Welcome...";

        button.style.transform = "scale(0.95)";

        setTimeout(() => {
            alert("Welcome to ARZEA Lounge & Garden ✨");
        }, 600);

    });

});
