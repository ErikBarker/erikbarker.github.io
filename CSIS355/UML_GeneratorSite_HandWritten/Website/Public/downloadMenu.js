const osMenucontainer = document.getElementById("OSMenucontainer");
const vertionMenucontainer = document.getElementById("vertionMenucontainer");
const downloadMenucontainer = document.getElementById("downloadMenucontainer");

fetch("erikbarker.github.io/tree/main/CSIS355/UML_GeneratorSite_HandWritten/Website/Public/db.json").then(
    (response)=>{
        if (!response.ok) {
            throw new Error('Response not ok: ' + response.statusText)
        }

        return response.json();
    }
).then((data)=>{
    //Process data
    console.log(data)
});