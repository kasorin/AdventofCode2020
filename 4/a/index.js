"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var regexp = / /g;
var data = fs_1.default
    .readFileSync(path_1.default.join(process.cwd(), 'data.txt'), 'utf8')
    .replace(regexp, '\r\n')
    .split('\r\n\r\n')
    .map(function (item) {
    var splitField = item.split('\r\n');
    var passportData = {};
    splitField.forEach(function (field) {
        var keyAndValue = field.split(':');
        passportData[keyAndValue[0]] = keyAndValue[1];
    });
    return passportData;
});
console.log(data.length);
var checkPassportData = function (data) {
    var result = true;
    var props = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
    props.forEach(function (prop) {
        if (!(prop in data)) {
            result = false;
        }
    });
    return result;
};
var answer = 0;
data.forEach(function (passport) {
    if (checkPassportData(passport) === true) {
        answer = answer + 1;
    }
});
console.log(answer + " passports are correct.");
