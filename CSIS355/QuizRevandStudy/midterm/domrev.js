const showbtn = document.getElementById("showbtn");
const hidebtn = document.getElementById("hidebtn");
const colorbtn = document.getElementById("colorbtn");
const color2btn = document.getElementById("color2btn");
const textbtn = document.getElementById("textbtn");
const text2btn = document.getElementById("text2btn");

const div = document.getElementById("chngDiv");

showbtn.addEventListener("click",()=>{
    div.style.display = "block";
});

hidebtn.addEventListener("click",()=>{
    div.style.display = "none";
});

colorbtn.addEventListener("click",()=>{
    div.classList.add("color");
});

color2btn.addEventListener("click",()=>{
    div.classList.remove("color");
});

textbtn.addEventListener("click",()=>{
    div.textContent = "sample text";
});

text2btn.addEventListener("click", ()=>{
    div.innerHTML = "<h1> aaaaaaaaaaaaaaaaaa <\h1>";
});