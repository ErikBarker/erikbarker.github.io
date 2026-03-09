// //array destructering


// const colours = ['red', 'green', 'yellow'];

//old way

// const first = colours[1];
// const second = colours[2];
// const third = colours[3];



//new way

// const [first, , third] = colours;

// console.log(first);
// console.log(third);

//spread ops : ...

// const arr1 = [1,2,3];
// const arr2 = [4,5,6];

//old way
// const combined = arr1 + arr2;
// const combinedcorrect = arr1.concat(arr2);

// console.log(combinedcorrect)

// new way
// const combined = [...arr1, ...arr2]
// console.log(combined);

const orig = {name: "Alice", age:25, gpa:3.9};

// const copy = Object.assign({},orig);

const copy = {...orig}; //creates a copy

console.log(copy);

const updated = {...orig, gpa:4.0};

console.log(updated);