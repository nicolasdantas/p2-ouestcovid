const countyList = require('./datas/countyList.json');
const countyPop = require('./datas/countyPop.json');
let fs = require('fs');

let newArray = countyList.map((item, index) => {
  return {
    ...item,
    pop: countyPop[index].pop,
  };
});

const newString = JSON.stringify(newArray);
fs.writeFileSync('countyListPop.json', newString);
