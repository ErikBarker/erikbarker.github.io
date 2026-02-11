console.log("test")

let div1 = document.querySelector(".div1");
let div2 = document.querySelector(".div2");

console.log(div1);
console.log(div2);

div1.textContent = "chaged text";
div2.textContent = "div2";

const div3 = document.createElement("span");
div3.textContent = "div3";

div2.append(div3);

// div3.innerHTML="<strong>BOLD</strong>";

const div9 = document.querySelector(".div9");
console.log(div9.getAttribute("data-test"));

const div10 = document.querySelector(".div10");
div10.classList.remove("bgblue")
div10.classList.add("bggreen")
div10.classList.add("fgred")

const bigbox = document.querySelector("#bigbox");
const hiddenbox = document.querySelector("#hiddenbox");
const togglebox = document.querySelector(".togglebox");

// hiddenbox.style.display = "block";

bigbox.addEventListener('click', ()=>{
    bigbox.textContent="AHHHHHHHHH was clicked";
    hiddenbox.style.display = "block";

});

bigbox.addEventListener('dblclick', ()=>{
    bigbox.textContent="stop clicking meeeee :(";
    hiddenbox.style.display = "block";

});

hiddenbox.addEventListener('mouseover', ()=>{
    bigbox.style.backgroundColor="Yellow"
});

togglebox.addEventListener('mouseenter', ()=>{
    togglebox.style.backgroundColor = 'yellow';

    setTimeout(() => {
        togglebox.style.backgroundColor="lime"
        hiddenbox.style.display = "none";

    }, 1000);
})