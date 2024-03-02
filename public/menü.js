"use strict";
// npx json-server -w ./etterem.json
// npx tsc -w
async function fetchDataFromMenü() {
    try {
        const response = await fetch("http://localhost:3000/menu");
        const data = await response.json();
        // Process the fetched data here
        menu = data;
        main();
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
}
// Ez továbbra sem jó
function clearDataFromKosar() {
    let e = "";
    let i = 1;
    do {
        fetch("http://localhost:3000/kosar/" + String(i), {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(response => { e = response.ok ? "" : "failed"; }).catch(error => { console.error("Error deleting data:", error); e = "error"; });
        i++;
    } while (e != "");
}
function postDataToKosar(data) {
    clearDataFromKosar();
    fetch("http://localhost:3000/kosar", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
        if (response.ok) {
            // ide ha szeretél redirectelhetsz a fizetéses oldalra
            console.log("Data posted successfully");
        }
        else {
            console.error("Failed to post data");
            // ide irj egy error messaget
        }
    })
        .catch(error => {
        console.error("Error posting data:", error);
    });
}
let menu = [];
function main() {
    // ide hívd meg a függvényeidet aminek kellenek az adatok
}
