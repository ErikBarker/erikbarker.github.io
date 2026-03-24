//10--display on success

const user = null;

try{
    var city = user.address.city;
    console(city);
}catch(e){
    console.log("Could Not Get City");
}finally{
    console.log("Lookup complete");
}

//9-- return in function, and display on success

function withdraw(balance, amount){
    if(amount > balance){
            throw new Error("Insufficient funds");
    }

    return balance - amount;
}

try{
    console.log(withdraw(10,20));
}catch(e){
    console.log(e.message);
}

//8 -- display on success
const jsonString = "{bad data}";

try{
    const obj = JSON.stringify(jsonString);
    console.log(obj);
}catch(e){
    console.log("Invalid JSON");
}

//7 -- perfect
const isAdmin = true;

isAdmin && console.log("Access granted");

//6 -- assing to new const not the same one

const nickname = null;

const displayname = nickname ?? "Anonymous";

//5 - ternary op

const num = 7;

//4-- add spread op to get the rest of the values
const rankings = ["Gold", "Silver", "Bronze", "4th", "5th"];

var [winner, ...runnerups] = rankings;
console.log(winner)
console.log(runnerups)

//3-- add function call
function introduce({name, role}){
    console.log(`Hi, I'm ${name} and I'm a ${role}`);
}

introduce({name: "alice", role: "developer"})

//2 -- ... in front not back

const tropical = ["pineapple", "papaya"];
const berries = ["strawberry", "blueberry"];

var allFruits = [...tropical, ...berries, "mango"]

//1 -- dont redeclare book

const book = { title: "Dune", author: "Frank Herbert" };
const {title, author, pages = 200} = book;