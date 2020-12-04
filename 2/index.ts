import fs from 'fs';
import path from 'path';

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
const data = fs
  .readFileSync(path.join(process.cwd(),'data.txt'),'utf-8')
  .split('\n')
  .map((item) => {
    const row = item.split(' ');
    const first: number = parseInt(row[0].split('-')[0])
    const second: number = parseInt(row[0].split('-')[1])
    return {
      first,
      second,
      char: row[1].substr(0,1),
      password: row[2]
    }
  }
)

const validator = (arg: dataType) => {
  return (
    checkPosition(arg.password, arg.char, arg.first)
    !==
    checkPosition(arg.password, arg.char, arg.second)
  )
}

type dataType = {
  first: number,
  second: number,
  char: string,
  password: string
}

const checkPosition = (target: string, char: string, position: number) => {
  return (target.substr(position - 1, 1) === char)
}

const result = data.map(item => {
    return validator(item)
  }).filter(item => item === true)

console.log(`${result.length} passwords are correct.`)