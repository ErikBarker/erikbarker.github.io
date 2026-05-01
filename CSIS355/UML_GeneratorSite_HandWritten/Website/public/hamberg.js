const hambergerbutton = document.getElementById("hamburger");
const hambergermenu = document.getElementById("hamburgerMenu");

hambergerbutton.addEventListener("click",()=>{
    console.log("click")
    hambergermenu.classList.toggle("hidden")
});