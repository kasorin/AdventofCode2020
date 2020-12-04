"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var data = fs_1.default
    .readFileSync(path_1.default.join(process.cwd(), 'data.txt'), 'utf8')
    .split('\r\n')
    .map(function (item) {
    return item.split('');
});
// console.log(data);
var isTree = function (char) {
    return char === '#';
};
var getPosition = function (down, rightPerDown, lengthTreePattern) {
    return ((down * rightPerDown) % lengthTreePattern);
};
// let result = 0;
// data.forEach((row,down) => {
//   // console.log(`checking down[${down}]. `)
//   const position = getPosition(down,3,row.length);
//   // console.log(`position is ${position}, row[positon] is "${row[position]}".`)
//   if (isTree(row[position])) {result = result + 1}
// })
var stepRules = [
    {
        right: 1,
        down: 1,
    },
    {
        right: 3,
        down: 1,
    },
    {
        right: 5,
        down: 1,
    },
    {
        right: 7,
        down: 1,
    },
    {
        right: 1,
        down: 2,
    },
];
var results = [];
stepRules.forEach(function (stepRule) {
    // data.forEach((row,down) => {
    //   const position = getPosition(down,3,row.length);
    //   if (isTree(row[position])) {result = result + 1}
    // })
    var result = 0;
    for (var step = 0; step < data.length; step = step + stepRule.down) {
        if (isTree(data[step][getPosition(step, stepRule.right, data[step].length)])) {
            result = result + 1;
        }
    }
    results.push(result);
});
var answer = 1;
results.forEach(function (result) {
    answer = answer * result;
});
console.log("answer is  " + answer + ".");
