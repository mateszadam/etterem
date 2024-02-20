"use strict";
function ISBN10(st) {
    let n = st.toLocaleLowerCase().replaceAll("-", "").split("").map(x => (x == "x") ? parseInt("10") : parseInt(x));
    if (n.length != 10) {
        return false;
    }
    console.log(n);
    if ((n[0] * 10 + n[1] * 9 + n[2] * 8 + n[3] * 7 + n[4] * 6 + n[5] * 5 + n[6] * 4 + n[7] * 3 + n[8] * 2 + n[9] * 1) % 11 == 0) {
        return true;
    }
    else {
        return false;
    }
}
console.log(ISBN10("359-82-1-5-0-7-X"));
