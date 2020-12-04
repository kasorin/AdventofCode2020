import fs from 'fs';
import path from 'path';

const data = fs
  .readFileSync(path.join(process.cwd(),'data.txt'),'utf8')
  .split('\r\n')
  .map(item => {
    return item.split('');
  });

// console.log(data);
const isTree = (char: string) => {
  return char === '#';
}

const getPosition = (down: number, rightPerDown: number, lengthTreePattern: number) => {
  return ((down * rightPerDown) % lengthTreePattern)
}

// let result = 0;

// data.forEach((row,down) => {
//   // console.log(`checking down[${down}]. `)
//   const position = getPosition(down,3,row.length);
//   // console.log(`position is ${position}, row[positon] is "${row[position]}".`)
//   if (isTree(row[position])) {result = result + 1}
// })

const stepRules = [
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
]

let results:number[] = []

stepRules.forEach(stepRule => {
  // data.forEach((row,down) => {
  //   const position = getPosition(down,3,row.length);
  //   if (isTree(row[position])) {result = result + 1}
  // })
  let result = 0;
  for (let step = 0; step < data.length; step = step + stepRule.down) {
    if (isTree(data[step][getPosition(step,stepRule.right,data[step].length)])) {result = result + 1}
  }
  results.push(result)
});


let answer = 1;
results.forEach(result => {
    answer = answer * result
})

console.log(`answer is  ${answer}.`)