import fs from 'fs';
import path from 'path';

const data: number[] = 
  fs.readFileSync(path.join(process.cwd(),'data.txt'),'utf-8')
  .split('\n')
  .map((item) => {
    return parseInt(item);
  });

let result:number = 0;

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
data.forEach((item1,index1,array) => {
  array.forEach((item2,index2,array) => {
    array.forEach((item3,index3,array)=>{
      if (item1 + item2 + item3 === 2020) {
        console.log(`Found! ${item1} + ${item2} + ${item3} = 2020!`);
        result = item1 * item2 * item3;
      }
    })
  })
})

console.log(`result is ${result}.`)