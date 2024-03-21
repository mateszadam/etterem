interface Kosar {
  id: string;
  etelid: string;
  db: number;
}
interface Menu {
  id: string;
  name: string;
  kepURL: number;
  leiras: string;
  ar: number;
}
interface Rendeles {
  id?: string;
  date: string;
  nev: string;
  cim: string;
  tel: string;
  email: string;
  etelek: Kosar[];
}

let Rkosar: Kosar[] = [];
let Rmenu: Menu[] = [];

getKosar();

function getKosar() {
  fetch("http://localhost:3000/kosar")
    .then((response) => response.json())
    .then((data) => {
      Rkosar = data;
      console.log(Rkosar);
      getMenu();
    });
}
function getMenu() {
  fetch("http://localhost:3000/menu")
    .then((response) => response.json())
    .then((data) => {
      Rmenu = data;
      console.log(Rmenu);
      genItems();
    });
}

function genItems() {
  console.log("fut");

  let s: string = "";
  for (let i = 0; i < Rkosar.length; i++) {
    console.log(Rkosar[i]);
    console.log(Rkosar[i].etelid);

    let item = Rmenu.filter((x) => x.id == Rkosar[i].etelid)[0];
    console.log(item);

    s += `
        <div class="item">
        <img src="${item.kepURL}" alt="">
        <div class="itemDesc">
           <p>${item.name}</p>
           <p>${item.leiras}</p>
        </div>

        <p class="price">${item.ar} Ft</p>
        <input class="quantity" type="number" min="1" max="9" step="1" value="${Rkosar[i].db}" data-id="${Rkosar[i].id}">
        <button class="btn btn-delete btm-main" data-id="${Rkosar[i].id}">
           <span class="mdi mdi-delete mdi-24px"></span>
           <span class="mdi mdi-delete-empty mdi-24px"></span>
           <span>Delete</span>
        </button>
     </div>
        `;
    console.log(s);
  }
  console.log("futw");

  console.log(s);
  console.log(document.querySelector(".kosar") as HTMLDivElement);

  (document.querySelector(".kosar") as HTMLDivElement).innerHTML = s;
  makeClickEvents();
}

function makeClickEvents() {
  let buttons = document.querySelectorAll(".btn-delete");
  for (let i = 0; i < buttons.length; i++) {
    let button = buttons[i] as HTMLButtonElement;

    button.addEventListener("click", () => {
      console.log(button);
      console.log(button.dataset.id);
      fetch(`http://localhost:3000/kosar/${button.dataset.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          getKosar();
          console.log("deleted");
        });
    });
  }
  let inputs = document.querySelectorAll(".quantity");
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i] as HTMLInputElement;
    input.addEventListener("change", (e) => {
      e.preventDefault();
      console.log(input);
      console.log(input.value);
      fetch(`http://localhost:3000/kosar/${input.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ db: input.value }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // getKosar();
          console.log("patched");
        });
    });
  }
  let allFilled = true;
  document
    .querySelector(".button-50")
    ?.addEventListener("click", (e: Event) => {
      e.preventDefault();

      document.querySelectorAll(".rendeles input").forEach((e: Element) => {
        if ((e as HTMLInputElement).value == "") {
          (e as HTMLInputElement).style.border = "2px solid red";
          allFilled = false;
        } else {
          (e as HTMLInputElement).style.border = "none";
          allFilled = true;
        }
      });

      if (allFilled) {
        let inputs = document.querySelectorAll(".rendeles input");
        let nev = (inputs[0] as HTMLInputElement).value;
        let cím = (inputs[1] as HTMLInputElement).value;
        let tel = (inputs[2] as HTMLInputElement).value;
        let email = (inputs[3] as HTMLInputElement).value;
        let date = new Date();
        let cDate: string = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        let order: Rendeles = {
          nev: nev,
          date: cDate,
          cim: cím,
          tel: tel,
          email: email,
          etelek: Rkosar,
        };
        fetch("http://localhost:3000/rendeles", {
          method: "POST",
          body: JSON.stringify(order),
        }).then((response) => {
          if (response.ok) {
            console.log("Data posted successfully");
            window.location.href = "siker.html";
          } else {
            console.error("Failed to post data");
          }
        });
      }
    });
}
