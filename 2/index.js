"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
// SIDE-A
// const charCount = (target: string, char: string) => {
//   return (target.match(new RegExp(char,'g')) || []).length;
// }
// type dataType = {
//   lowest: number,
//   highest: number,
//   char: string,
//   password: string
// }
// const validator = (arg: dataType) => {
//   let result = false;
//   if (charCount(arg.password, arg.char) < arg.lowest) return result;
//   if (charCount(arg.password, arg.char) > arg.highest) return result;
//   return true;
// }
// const data = fs
//   .readFileSync(path.join(process.cwd(),'data.txt'),'utf-8')
//   .split('\n')
//   .map((item) => {
//     const row = item.split(' ');
//     const lowest: number = parseInt(row[0].split('-')[0])
//     const highest: number = parseInt(row[0].split('-')[1])
//     return {
//       lowest,
//       highest,
//       char: row[1].substr(0,1),
//       password: row[2]
//     }
//   }
// )
// let result = data.map(item => {
//   return validator(item)
// }).filter(item => item === true)
// SIDE-B
var data = fs_1.default
    .readFileSync(path_1.default.join(process.cwd(), 'data.txt'), 'utf-8')
    .split('\n')
    .map(function (item) {
    var row = item.split(' ');
    var first = parseInt(row[0].split('-')[0]);
    var second = parseInt(row[0].split('-')[1]);
    return {
        first: first,
        second: second,
        char: row[1].substr(0, 1),
        password: row[2]
    };
});
var validator = function (arg) {
    return (checkPosition(arg.password, arg.char, arg.first)
        !==
            checkPosition(arg.password, arg.char, arg.second));
};
var checkPosition = function (target, char, position) {
    return (target.substr(position - 1, 1) === char);
};
var result = data.map(function (item) {
    return validator(item);
}).filter(function (item) { return item === true; });
console.log(result.length + " passwords are correct.");
