interface Kosar {
    id: string;
    db: number;
}

interface History {
    id: string;
    date: string;
    items: Kosar[];
}

let kosar: Kosar[] = [];
let menu: Menu[] = [];
let ohistory: History[] = [];



