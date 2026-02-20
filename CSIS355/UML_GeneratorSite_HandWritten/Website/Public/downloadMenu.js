const osMenucontainer = document.getElementById("OSMenucontainer");
const versionMenucontainer = document.getElementById("versionMenucontainer");
const downloadMenucontainer = document.getElementById("downloadMenucontainer");

async function getProducts() {
    //Get the dat
    const response = await fetch("http://erikbarker.github.io/CSIS355/UML_GeneratorSite_HandWritten/Website/Public/db.json");

    const data = await response.json();

    return data;
}

async function processProducts() {
    const data = await getProducts();

    const productList = data.UMLGenversions;

    console.log(data)
    console.log(productList)

    const osList = [];

    //Retreave each os
    for (let i = 0; i < productList.length; i++) {
        const product = productList[i];
        console.log(product)

        if (!osList.includes(product.os)) {
            osList.push(product.os);
        }
    }

    genMenuItems(osList,osMenucontainer)

    console.log(osList)

    //Get version list for default (first occuring)

    const versionList = [];
    const productListFiltered = productList.filter((product)=>{
        if(product.os === osList[0]){
            return product.version;
        }
    });

    console.log(productListFiltered)

    for (let i = 0; i < productListFiltered.length; i++) {
        const product = productListFiltered[i];
        console.log(product.version)

        if (!versionList.includes(product.version)) {
            let extra = ""
            if (product.stable) {
                extra = " stable"
            }
            versionList.push(product.version + extra);
        }
    }

    genMenuItems(versionList, versionMenucontainer);

    //Get download list for default (first occuring)
    
    const downloadData = productListFiltered.filter((product)=>{
        if (product.version === versionList[0].split(' ')[0]) {
            return product;
        }
    });

    

    genDownloadsection(downloadData[0]);
}

function genMenuItems(itemsArr, menuContainer) {
    const menuList = menuContainer.querySelector('.listselection');
    menuList.innerHTML = "";

    for (const itemind in itemsArr) {        
        const item = itemsArr[itemind];
        
        const listelement = document.createElement("a");

        listelement.innerHTML = `
        <p>${item}</p>
        <span></span>`;
        
        console.log(listelement)
        //add click event to set atribute on menucontainer
        listelement.addEventListener("click",()=>{
            menuList.setAttribute("selection", `${item}`)
            updateMenu();
        });

        menuList.appendChild(listelement)

    }
}

function genDownloadsection(data){
    console.log("download data");
    console.log(data);

    let extra = ""
            if (data.stable) {
                extra = " stable"
            }

    const menu = downloadMenucontainer.querySelector(".menu");
    menu.innerHTML=`<div class="buttoncontainer">
                        <a href="">
                            <div>
                                <p>Download</p>
                            </div>
                        </a>
                    </div>
                    <div class="textcontainer">
                            <h4>${data.version + extra}</h4>
                        </div>
                    <div class="titleabovecontainer">
                        <div class="textcontainer">
                            <p>Description</p>
                        </div>
                        <div class="textcontainer">
                            <p>${data.description}</p>
                        </div>
                    </div>
                    <div class="buttoncontainer">
                        <a href="">
                            <div>
                                <p>Docs</p>
                            </div>
                        </a>
                    </div>`
}

async function updateMenu(){
    const data = await getProducts();
    const productList = data.UMLGenversions;

    

    //Get version list for current selection value
    const menuList = osMenucontainer.querySelector('.listselection');

    const versionList = [];
    const productListFiltered = productList.filter((product)=>{
        console.log(menuList.getAttribute("selection"))
        if(product.os === menuList.getAttribute("selection")){
            return product.version;
        }
    });

    console.log(productListFiltered)

    for (let i = 0; i < productListFiltered.length; i++) {
        const product = productListFiltered[i];
        console.log(product.version)

        if (!versionList.includes(product.version)) {
            let extra = ""
            if (product.stable) {
                extra = " stable"
            }
            versionList.push(product.version + extra);
        }
    }

    genMenuItems(versionList, versionMenucontainer);

    //Get download list for current slection or default
    console.log("productListFiltered")
    console.log(productListFiltered)

    const versionMenuList = versionMenucontainer.querySelector('.listselection');
    let downloadData = null;
    if (versionList.includes(versionMenuList.getAttribute("selection"))) {
        console.log("has version")
        downloadData = productListFiltered.filter((product)=>{
            if (product.version === versionMenuList.getAttribute("selection").split(' ')[0]) {
                return product;
            }
        });
    } else{
        console.log("does not have version reverting to defualt")
        downloadData = productListFiltered.filter((product)=>{
            if (product.version === versionList[0].split(' ')[0]) {
                return product;
            }
        });
    }
    
    

    
    console.log("Update menu")
    genDownloadsection(downloadData[0]);
}

processProducts();