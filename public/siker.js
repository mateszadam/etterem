"use strict";
let Smenu = [];
function getMenu2() {
    fetch("http://localhost:3000/menu")
        .then((response) => response.json())
        .then((data) => {
        Smenu = data;
        console.log(Smenu);
        genItems2();
    });
}
let Srendeles = [];
getLastOrder();
function getLastOrder() {
    fetch("http://localhost:3000/rendeles")
        .then((response) => response.json())
        .then((data) => {
        Srendeles = data;
        console.log(Srendeles);
        getMenu2();
    });
}
function genItems2() {
    console.log("fut");
    let s = "";
    for (let i = 0; i < Srendeles[Srendeles.length - 1].etelek.length; i++) {
        let item = Smenu.filter(x => x.id == Srendeles[Srendeles.length - 1].etelek[i].etelid)[0];
        s += `
          <div class="item">
          <img src="${item.kepURL}" alt="">
          <div class="itemDesc">
             <p>${item.name}</p>
             <p>${item.leiras}</p>
          </div>
  
          <p class="price">${item.ar} Ft</p>
          <p>${Srendeles[Srendeles.length - 1].etelek[i].db} db</p>
       </div>
          `;
        console.log(s);
    }
    console.log("futw");
    console.log(s);
    console.log(document.querySelector(".kosar"));
    document.querySelector(".kosar").innerHTML = s;
}
