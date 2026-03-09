//object destructuring
// old way
// const person = {
//     name: "Alice",
//     age: 25,
//     city: "Saginaw"

// }

// const name = person.name;
// const age = person.age;
// const city = person.city;

// new way
// const {name, age, city} = person;

// console.log(name);
// console.log(age);

// const {name: firstname} = person;

// console.log(firstname);

// const {name, country = "USA"} = person;

// console.log(country);

//Modual code

const {add,sub} = require("./mathUtils");

console.log(add(2,3));
console.log(sub(5,3));