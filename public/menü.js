"use strict";
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
function clearDataFromKosar() {
    fetch("http://localhost:3000/kosar", {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
        if (response.ok) {
            console.log("Data posted successfully");
        }
        else {
            console.error("Failed to post data");
        }
    })
        .catch(error => {
        console.error("Error posting data:", error);
    });
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
postDataToKosar({ id: "1", db: 2 });
function main() {
    // ide hívd meg a függvényeidet aminek kellenek az adatok
}
