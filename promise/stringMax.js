let str = "aaasdfdsfewfew";
const json = {};
for (let i = 0;i < str.length;i++) {
    if (!json[str.charAt(i)]) {
        json[str.charAt(i)] = 1;
    } else {
        json[str.charAt(i)] ++;
    }
}

let Max = 0;
let index = 0;
for (let i in json) {
    if (json[i] > Max) {
        Max = json[i]
        index = i
    }
}

console.log('出现次数最多的是:'+index+'出现'+Max+'次')
