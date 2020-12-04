import fs from 'fs';
import path from 'path';

const regexp = / /g

const data = fs
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
  });

console.log(data.length)

const checkPassportData = (data: any) => {
  let result = true;
  const props = ['byr','iyr','eyr','hgt','hcl','ecl','pid']
  props.forEach(prop => {
    if (!(prop in data)) {result = false}
  })
  return result;
}

let answer = 0;
data.forEach(passport => {
  if (checkPassportData(passport) === true) {answer = answer + 1}
})

console.log(`${answer} passports are correct.`)