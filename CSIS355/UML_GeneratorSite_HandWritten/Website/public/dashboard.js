const usernameP = document.getElementById("userName");
const logoutBtn = document.getElementById("logoutBtn");
const getBtn = document.getElementById("getBTN");
const idInput = document.getElementById("idInput");
const versionInput = document.getElementById("versionInput");
const stableInput = document.getElementById("stableInput");
const depricatedInput = document.getElementById("depricatedInput");
const osInput = document.getElementById("osInput");
const descInput = document.getElementById("descInput");
const priceInput = document.getElementById("priceInput");
const createBtn = document.getElementById("createBTN");
const updateBtn = document.getElementById("updateBTN");
const deleteBtn = document.getElementById("deleteBTN");
const ERRORSTRING = document.getElementById("ERRORSTRING");

logoutBtn.addEventListener("click", logout);
getBtn.addEventListener("click", getProducts);
createBtn.addEventListener("click", createProduct);
updateBtn.addEventListener("click", updateProduct);
deleteBtn.addEventListener("click", deleteProduct);

var prodID;
var vertion;
var stable;
var depricated;
var os;
var desc;
var price;

function getValues(){
    prodID = idInput.value;
    vertion = versionInput.value;
    stable = stableInput.checked;
    depricated = depricatedInput.checked;
    os = osInput.value;
    desc = descInput.value;
    price = priceInput.value;
}

function getProducts(){
    console.log("Geting products values")
    
    const token = localStorage.getItem("token");
    
    fetch("/api/umlGenVertion", {
        method: 'Get',
        headers: {
                    "Authorization": "Bearer " + token
                 }
    }).then(res=>res.json()).then(data=>{
        const container = document.getElementById('productList');
        if (data.length === 0) {
            container.innerHTML = '<p>No products found.</p>';
            return;
        }
        let html = '<ul>';
        data.forEach(product => {
            html += `<li>
                <strong>${product.vertion}</strong>
                — Stable: ${product.stable}<br/>
                — OS: ${product.os}<br/>
                — Depricated: ${product.depricated}<br/>
                — Description: ${product.description}<br/>
                — Price: $${product.price}<br/>
                — <small>_id: ${product._id}</small>
            </li>`;
        });
        html += '</ul>';
        container.innerHTML = html;
    })
    .catch(err => {
        document.getElementById('productList').innerHTML = '<p>Error fetching Products.</p>' + err;
    });
    
}

function createProduct(){
    getValues();

    if (!vertion||!os||!desc||!price) {
                ERRORSTRING.textContent = 'All fields but ID are required.';
                return;
            }

            const token = localStorage.getItem("token");
            
            fetch('/api/umlGenVertion', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                 },
                body: JSON.stringify({ vertion, stable, os, depricated, description:desc, price:Number(price) })
            })
            .then(res => res.json())
            .then(data => {
                ERRORSTRING.textContent = 'product added!';
                idInput.value='';
                versionInput.value='';
                stableInput.checked=false;
                depricatedInput.checked=false;
                osInput.value='';
                descInput.value='';
                priceInput.value='';

                prodID = null;
                vertion = null;
                stable = null;
                depricated = null;
                os = null;
                desc = null;
                price = null;
            })
            .catch(err => {
                ERRORSTRING.textContent = 'Error adding product.' + err;
            });

            getProducts();
}
function updateProduct(){
    getValues()
    if (!prodID) {
                ERRORSTRING.textContent = 'product _id is required.';
                return;
            }

            const updates = {};

            if (vertion) updates.vertion = vertion;
            if (stable) updates.stable = stable;
            if (depricated) updates.depricated = depricated;
            if (os) updates.os = os;
            if (desc) updates.description = desc;
            if (price) updates.price = Number(price);

            if (Object.keys(updates).length === 0) {
                document.getElementById('updateMessage').textContent = 'Provide at least one field to update.';
                return;
            }

            const token = localStorage.getItem("token");

            fetch(`/api/umlGenVertion/${prodID}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token
                 },
                body: JSON.stringify(updates)
            })
            .then(res => res.json())
            .then(data => {
                ERRORSTRING.textContent = 'product updated!';
                idInput.value='';
                versionInput.value='';
                stableInput.checked=false;
                depricatedInput.checked=false;
                osInput.value='';
                descInput.value='';
                priceInput.value='';

                prodID = null;
                vertion = null;
                stable = null;
                depricated = null;
                os = null;
                desc = null;
                price = null;
            })
            .catch(err => {
                ERRORSTRING.textContent = 'Error updating book.';
            });

            getProducts();
}
function deleteProduct(){
    getValues()
    if (!prodID) {
                ERRORSTRING.textContent = 'product _id is required.';
                return;
            }

            const token = localStorage.getItem("token");
            
            fetch(`/api/umlGenVertion/${prodID}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": "Bearer " + token
                 }
            })
            .then(res => res.json())
            .then(data => {
                ERRORSTRING.textContent = 'product deleted!';
                idInput.value = '';
            })
            .catch(err => {
                ERRORSTRING.textContent = 'Error deleting product.';
            });


            getProducts();
}

function logout(){
    localStorage.removeItem("token");
    window.location.replace("/login.html");
}

getProducts()