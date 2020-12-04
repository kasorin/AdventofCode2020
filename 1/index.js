"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var data = fs_1.default.readFileSync(path_1.default.join(process.cwd(), 'data.txt'), 'utf-8')
    .split('\n')
    .map(function (item) {
    return parseInt(item);
});
var result = 0;
// SIDE-A
// data.forEach((item1,index1,array) => {
//     array.forEach((item2,index2,array) => {
//       if (item1 + item2 === 2020) {
//         console.log(`Found! ${item1} + ${item2} = 2020!`);
//         result = item1 * item2;
//       }
//     })
//   })
// SIDE-B
data.forEach(function (item1, index1, array) {
    array.forEach(function (item2, index2, array) {
        array.forEach(function (item3, index3, array) {
            if (item1 + item2 + item3 === 2020) {
                console.log("Found! " + item1 + " + " + item2 + " + " + item3 + " = 2020!");
                result = item1 * item2 * item3;
            }
        });
    });
});
console.log("result is " + result + ".");
