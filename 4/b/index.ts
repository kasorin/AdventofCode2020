import fs from 'fs';
import path, { parse } from 'path';

const getData = (filename: string) => {
  const regexp = / /g
  return fs
  .readFileSync(path.join(process.cwd(),'data.txt'),'utf8')
  .replace(regexp,'\r\n')
  .split('\r\n\r\n')
  .map(item => {
    const splitField = item.split('\r\n');
    let passportData:any = {};
    splitField.forEach(field => {
      const keyAndValue = field.split(':');
      passportData[keyAndValue[0]] = keyAndValue[1];
    })
    return passportData
  })
}
  
const FILE = 'data.txt'
const data:{}[] = getData(FILE);
// console.log(data);
// console.log(`data has ${data.length} passports.`);

const checkPassportData = (data: any) => {
  let result = true;
  const props:{
    field: string,
    validator: (item: string) => boolean
    }[] = [
    {
      field:'byr',
      validator: (item:string) => {
        if (item.length !== 4) return false;
        if (parseInt(item) < 1920) {
          // console.log(`${item} is incorrect. it's lower than 1920.`)
          return false
        };
        if (parseInt(item) > 2002) {
          // console.log(`${item} is incorrect. its higher than 2002.`);
          return false;
        }
        return true;
      },
    },
    {
      field:'iyr',
      validator: (item:string) => {
        if(item.length !== 4) return false;
        if(parseInt(item) < 2010) {
          // console.log(`${item} is incorrect. it's lower than 2010.`)
          return false;
        }
        if(parseInt(item) > 2020){
          // console.log(`${item} is incorrect. it's higher than 2020.`)
          return false;
        }
        return true;
      }
    },
    {
      field:'eyr',
      validator: (item:string) => {
        if(item.length !== 4) return false;
        if(parseInt(item) < 2020) return false;
        if(parseInt(item) > 2030) return false;
        return true;
      }
    },
    {
      field:'hgt',
      validator: (item:string) => {
        if (!(item.includes('cm') || item.includes('in'))) {
          console.log(`item is ${item}. it's incorrect.`)
          return false
        };
        switch (item.includes('cm')) {
          case true:
            // console.log(`item is ${item}. number is ${item.substring(0,item.indexOf('cm'))}.`)
            if (parseInt(item.substring(0,item.indexOf('cm'))) < 150) {
              console.log(`item is ${item}. it's incorrect.`);
              return false;
            }
            if (parseInt(item.substring(0,item.indexOf('cm'))) > 193) {
              console.log(`item is ${item}. it's incorrect.`)
              return false
            };
          break;
          case false:
            if (parseInt(item.substring(0,item.indexOf('in'))) < 59) {
              console.log(`item is ${item}. it's incorrect.`);
              return false
            };
            if (parseInt(item.substring(0,item.indexOf('in'))) > 76) {
              console.log(`item is ${item}. it's incorrect.`);
              return false
            };
          break;
        }
        return true;
      }
    },
    {
      field:'hcl',
      validator: (item: string) => {
        // console.log(`${item}`);
        if (item.length !==7) {
          // console.log(`${item} is not 7 digit.`);
          return false;
        }
        if (!(item.startsWith('#'))) {
          // console.log(`${item} is not started "#".`);
          return false
        };
        const reg = new RegExp('[a-f_0-9]{6}')
        if (!(reg.test(item.substring(1)))) {
          console.log(`item is ${item}. its note correct hcl value.`)
          return false
        };
        return true;
      }
    },
    {
      field:'ecl',
      validator: (item:string) => {
        if(item.length !== 3) {
          return false
        };
        const reg = new RegExp('(amb|blu|brn|gry|grn|hzl|oth)');
        if(!(reg.test(item))) {
          // console.log(`${item} is incorrect.`)
          return false
        };
        return true;
      }
    },
    {
      field:'pid',
      validator: (item:string) => {
        const reg = new RegExp('[0-9]{9}');
        if(!(reg.test(item))) {
          // console.log(`${item} is incorrect pid value.`)
          return false
        };
        return true;
      }
    }
  ];

  props.forEach(prop => {
    if (!(prop.field in data)) {
      // console.log(`${prop.field} is undefined.`)
      result = false;
      return result;
    } else {
      if ((prop.validator(data[prop.field])) === false) {
        result = false;
        return result;
      }
    }
  })
  return result;
}

let checkedPassport = 0;
let answer = 0;
data.forEach(passport => {
  checkedPassport = checkedPassport + 1;
  if (checkPassportData(passport) === true) {
    answer = answer + 1
  }
})

console.log(`Checked ${checkedPassport} passports. ${answer} are correct.`)