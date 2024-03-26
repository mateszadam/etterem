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
login();
function login() {
  var question = prompt("Hogy hívnak kutya?");
  var response = "admin";
  if(question === response) {
    fetchDataFromMenü2().then(() => {
      generateStatistics();
    });
  }
  else {
    location.href = 'index.html';
  }
}

fetchDataFromMenü2();
async function fetchDataFromMenü2(): Promise<void> {
  return fetch("http://localhost:3000/rendeles")
    .then((response) => response.json())
    .then((data) => {
      ordered = data;
      main();
    });
}

async function fetchEtelDetails(id: string): Promise<string> {
  const response = await fetch(`http://localhost:3000/menu/${id}`);
  const data = await response.json();
  return data.name;  
}

async function main() {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');


  const headerRow = document.createElement('tr');
  ['ID', 'Dátum', 'Név', 'Cím', 'Telefonszám', 'Email', 'Ételek'].forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);


  for (const rendeles of ordered) {
    const row = document.createElement('tr');
    const columns = [
      rendeles.id || '',
      rendeles.date,
      rendeles.nev,
      rendeles.cim,
      rendeles.tel,
      rendeles.email,
      await Promise.all(rendeles.etelek.map(async (etel) => {
        const etelName = await fetchEtelDetails(etel.etelid);
        return `${etelName} (${etel.db} db)`;
      })).then(etelNames => etelNames.join(', '))
    ];

    columns.forEach(columnText => {
      const td = document.createElement('td');
      td.textContent = columnText;
      row.appendChild(td);
    });

    tbody.appendChild(row);
  }

  table.appendChild(tbody);


  const container = document.getElementById('table-container');
  
  if (container) {
    container.innerHTML = ''; 
    container.appendChild(table);
  } else {
    console.error('Nem található a "table-container" azonosítóval rendelkező elem.');
  }
}
async function generateStatistics() {
  const etelStatistics: { [etelName: string]: number } = {};

  for (const rendeles of ordered) {
    for (const etel of rendeles.etelek) {
      const etelName = await fetchEtelDetails(etel.etelid);
      if (!etelStatistics[etelName]) {
        etelStatistics[etelName] = 0;
      }
      etelStatistics[etelName] += etel.db;
    }
  }

  console.log('Etel Statistics:', etelStatistics); 


  const digitSumStatistics: { [etelName: string]: number } = {};

  for (const [etelName, db] of Object.entries(etelStatistics)) {
    let digitSum = 0;
    const dbStr = db.toString();
    for (let i = 0; i < dbStr.length; i++) {
      digitSum += parseInt(dbStr[i], 10);
    }
    digitSumStatistics[etelName] = digitSum;
  }

  console.log('Digit Sum Statistics:', digitSumStatistics); 


  const statTable = document.createElement('table');
  const statThead = document.createElement('thead');
  const statTbody = document.createElement('tbody');

  const statHeaderRow = document.createElement('tr');
  ['Étel Név', 'Darabszám'].forEach(headerText => {
    const th = document.createElement('th');
    th.textContent = headerText;
    statHeaderRow.appendChild(th);
  });
  statThead.appendChild(statHeaderRow);
  statTable.appendChild(statThead);

  for (const [etelName, digitSum] of Object.entries(digitSumStatistics)) {
    const statRow = document.createElement('tr');
    const statColumns = [
      etelName,
      digitSum.toString()
    ];

    statColumns.forEach(columnText => {
      const td = document.createElement('td');
      td.textContent = columnText;
      statRow.appendChild(td);
    });

    statTbody.appendChild(statRow);
  }

  statTable.appendChild(statTbody);

  const statContainer = document.getElementById('statistics-container');
  
  if (statContainer) {
    statContainer.innerHTML = '';
    statContainer.appendChild(statTable);
  } else {
    console.error('Nem található a "statistics-container" azonosítóval rendelkező elem.');
  }
}