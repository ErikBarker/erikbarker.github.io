// rest ops : ...

// const [first, second, ...rem] = [10,20,30,40,50];

// console.log(first);
// console.log(rem);

function addAll(...nums){
    let total=0;
    for(let num of nums){
        total += num;
    }

    return total;
}

console.log(addAll(1,2,3,4));