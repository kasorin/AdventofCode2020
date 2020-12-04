"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var regexp = / /g;
var FILE = 'data.txt';
var getData = function (filename) {
    return fs_1.default
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
};
var data = getData(FILE);
// console.log(data);
// console.log(`data has ${data.length} passports.`);
var checkPassportData = function (data) {
    var result = true;
    var props = [
        {
            field: 'byr',
            validator: function (item) {
                if (item.length !== 4)
                    return false;
                if (parseInt(item) < 1920) {
                    // console.log(`${item} is incorrect. it's lower than 1920.`)
                    return false;
                }
                ;
                if (parseInt(item) > 2002) {
                    // console.log(`${item} is incorrect. its higher than 2002.`);
                    return false;
                }
                return true;
            },
        },
        {
            field: 'iyr',
            validator: function (item) {
                if (item.length !== 4)
                    return false;
                if (parseInt(item) < 2010) {
                    // console.log(`${item} is incorrect. it's lower than 2010.`)
                    return false;
                }
                if (parseInt(item) > 2020) {
                    // console.log(`${item} is incorrect. it's higher than 2020.`)
                    return false;
                }
                return true;
            }
        },
        {
            field: 'eyr',
            validator: function (item) {
                if (item.length !== 4)
                    return false;
                if (parseInt(item) < 2020)
                    return false;
                if (parseInt(item) > 2030)
                    return false;
                return true;
            }
        },
        {
            field: 'hgt',
            validator: function (item) {
                if (!(item.includes('cm') || item.includes('in'))) {
                    console.log("item is " + item + ". it's incorrect.");
                    return false;
                }
                ;
                switch (item.includes('cm')) {
                    case true:
                        // console.log(`item is ${item}. number is ${item.substring(0,item.indexOf('cm'))}.`)
                        if (parseInt(item.substring(0, item.indexOf('cm'))) < 150) {
                            console.log("item is " + item + ". it's incorrect.");
                            return false;
                        }
                        if (parseInt(item.substring(0, item.indexOf('cm'))) > 193) {
                            console.log("item is " + item + ". it's incorrect.");
                            return false;
                        }
                        ;
                        break;
                    case false:
                        if (parseInt(item.substring(0, item.indexOf('in'))) < 59) {
                            console.log("item is " + item + ". it's incorrect.");
                            return false;
                        }
                        ;
                        if (parseInt(item.substring(0, item.indexOf('in'))) > 76) {
                            console.log("item is " + item + ". it's incorrect.");
                            return false;
                        }
                        ;
                        break;
                }
                return true;
            }
        },
        {
            field: 'hcl',
            validator: function (item) {
                // console.log(`${item}`);
                if (item.length !== 7) {
                    // console.log(`${item} is not 7 digit.`);
                    return false;
                }
                if (!(item.startsWith('#'))) {
                    // console.log(`${item} is not started "#".`);
                    return false;
                }
                ;
                var reg = new RegExp('[a-f_0-9]{6}');
                if (!(reg.test(item.substring(1)))) {
                    console.log("item is " + item + ". its note correct hcl value.");
                    return false;
                }
                ;
                return true;
            }
        },
        {
            field: 'ecl',
            validator: function (item) {
                if (item.length !== 3) {
                    return false;
                }
                ;
                var reg = new RegExp('(amb|blu|brn|gry|grn|hzl|oth)');
                if (!(reg.test(item))) {
                    // console.log(`${item} is incorrect.`)
                    return false;
                }
                ;
                return true;
            }
        },
        {
            field: 'pid',
            validator: function (item) {
                var reg = new RegExp('[0-9]{9}');
                if (!(reg.test(item))) {
                    // console.log(`${item} is incorrect pid value.`)
                    return false;
                }
                ;
                return true;
            }
        }
    ];
    props.forEach(function (prop) {
        if (!(prop.field in data)) {
            // console.log(`${prop.field} is undefined.`)
            result = false;
            return result;
        }
        else {
            if ((prop.validator(data[prop.field])) === false) {
                result = false;
                return result;
            }
        }
    });
    return result;
};
var checkedPassport = 0;
var answer = 0;
data.forEach(function (passport) {
    checkedPassport = checkedPassport + 1;
    if (checkPassportData(passport) === true) {
        answer = answer + 1;
    }
});
console.log("Checked " + checkedPassport + " passports. " + answer + " are correct.");
