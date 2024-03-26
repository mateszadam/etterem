"use strict";
// npx json-server -w ./etterem.json
// npx tsc -w
fetchDataFromMenü();
function fetchDataFromMenü() {
    fetch("http://localhost:3000/menu")
        .then((response) => response.json())
        .then((data) => {
        menu = data;
        main2();
    });
}
function clearDataFromKosar() {
    let e = "";
    let i = 1;
    fetch("http://localhost:3000/kosar")
        .then((response) => response.json())
        .then((data) => {
        data.forEach((element) => {
            console.log(element);
            console.log(element.id);
            fetch("http://localhost:3000/kosar/" + String(element.id), {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => { e = response.ok ? "" : "failed"; }).catch(error => { console.error("Error deleting data:", error); e = "error"; });
            i++;
        });
    });
}
function postDataToKosar(data) {
    console.log(data);
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
function main2() {
    console.log("fut");
    let s = "";
    for (let i = 0; i < menu.length; i++) {
        let item = menu[i];
        s += `
          <div class="item2">
          <img src="${item.kepURL}" alt="">
          <div class="itemDesc">
             <p>${item.name}</p>
             <p>${item.leiras}</p>
          </div>

          <p class="price">${item.ar} Ft</p>
          <input class="quantity" type="number" min="1" max="9" step="1" value="1" data-id="${item.id}">
          <button class="btn2 btn2-add btm-main" data-id="${item.id}" type="button">
             <span class="mdi mdi-delete mdi-24px"></span>
             <span class="mdi mdi-delete-empty mdi-24px"></span>
             <span>Add</span>
          </button>
       </div>
          `;
    }
    console.log("futw");
    console.log(s);
    console.log(document.querySelector(".kosar"));
    document.querySelector(".menu").innerHTML = s;
    addClickEvents();
}
function addClickEvents() {
    let buttons = document.querySelectorAll(".btn2-add");
    console.log(buttons);
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            console.log("okok");
            console.log(e.target.dataset.id);
            let id = e.target.dataset.id;
            let quantity = document.querySelector(`input[data-id="${id}"]`).value;
            let k = {
                etelid: id,
                db: quantity
            };
            postDataToKosar(k);
        });
    });
}
;
