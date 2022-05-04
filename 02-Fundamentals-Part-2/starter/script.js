// const andy = [
//     'Andy',
//     'Wong',
//     2022-1992,
//     'no',
//     ['a','b','c']
// ]
// const types = [];


// for(let i = 0; i < andy.length;i++){
//     console.log(andy[i])
//     types.push(typeof andy[i]);
// }

// const years = [1992,2007,1969,2020];
// const ages = [];
// console.log('push all the ages')
// for(let i = 0; i < years.length; i++){
//     ages.push(2022 - years[i])
// }
// console.log(ages)
// //

// console.log('---only stirngs---')
// for(let i = 0; i < andy.length;i++){
//     if(typeof andy[i] !== 'string') continue;
//     console.log(`these are strings: ${andy[i]}`)
// }

// console.log('--- break scenario ---')
// for(let i = 0; i < andy.length; i++){
//     if(typeof andy[i] === 'number') break;
//     console.log(andy[i])
// }

// const andy = [
//     'andy',
//     'wong',
//     2022-1992,
//     'no',
//     ['a','b','c']
// ]

// for(let i = andy.length-1; i >=0;i--){
//     console.log(andy[i])
// }

// for( let exercise = 1; exercise < 4; exercise++ ){
//     console.log(`--- Starting Excercise ${exercise}`)
//     for(let rep = 1; rep <6; rep++){
//         console.log(`lifting weight repetition ${rep} 😎`)
//     }
// }

// Video 49 //

// for(let rep = 1; rep <=10; rep++){
//     console.log(`lifting weights repetition ${rep}`)
// }

// let rep = 1;
// while (rep <= 10){
//     console.log(`lifting weight repetition ${rep}`);
//     rep++;
// }

// let dice = Math.trunc(Math.random() * 6) +1;
// console.log(dice);
// let counter = 1;
// while(dice !== 5){
//     console.log(`You've rolled an ${dice} this is your ${counter} try`)
//     dice = Math.trunc(Math.random() * 6) +1;
//     if (dice === 5) console.log(`you've rolled an 5!`)
//     counter++ 
    
// }

// Coding Challenge #4 //

const bills = [22,295,176,440,37,105,10,1100,86,52];
const tips = [];
const total = [];

const calcTips = function(bill){
    // if(bill >= 50 && bill <= 300){
    //     return bill*.2;
    // }else{
    //     return bill *.15
    // }
    return bill >= 50 && bill <= 300 ? bill *.15 : bill *.2
}
for(let i = 0; i < bills.length; i++){
     tips.push(calcTips(bills[i]))
     total.push(calcTips(bills[i])+bills[i])
}
console.log(tips)
console.log(total)

calcAvg = function(arr){
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        // sum = sum + arr[i];
        sum += arr[i];
    }
    return sum / arr.length
}
const test = [1,2,3,4,5,6,7]
console.log(calcAvg(tips))
console.log(calcAvg(total))