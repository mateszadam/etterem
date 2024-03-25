interface Kosar {
  id: string;
  etelid: string;
  db: number;
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

let ordered: Rendeles[] = [];

fetchDataFromMenü();
function fetchDataFromMenü() {
  fetch("http://localhost:3000/rendeles")
    .then((response) => response.json())
    .then((data) => {
      ordered = data;
      main();
    });
}

function main() {
  console.log(ordered);
    // itt van az ordered tömböd amiben a rendelések vannak
    // ide ird azt amivel valahogy megjeleníted őket.


    // Ezt a két paranyot irt be két külőn terminalba:
    // npx json-server -w ./etterem.json
    // npx tsc -w 


}
