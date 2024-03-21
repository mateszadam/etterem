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
map();
function map() {
    console.log("fut a map");
    // <iframe width="520" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Szent%20Isv%C3%A1n%20%C3%BAt%20%20Gy%C5%91r+(P)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe> <a href='https://freehitcounters.org/'>https://freehitcounters.org</a> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=cb77449ec774dad2b05fb1ee5895f11f2cadff8b'></script>
    const iframe = document.createElement("iframe");
    console.log(document.querySelector("#map").innerHTML);
    document.querySelector("#map").innerHTML = '<iframe width="520" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" id="gmap_canvas" src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=Szent%20Isv%C3%A1n%20%C3%BAt%20%20Gy%C5%91r+(P)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>';
    // https://www.google.com/maps/place/47%C2%B040'57.7%22N+17%C2%B037'56.4%22E
}
