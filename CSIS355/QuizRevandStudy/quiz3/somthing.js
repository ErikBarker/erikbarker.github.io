const arrowUser = ({name, age})=>{
    console.log(`name: ${name} age: ${age}`);
}

var users = [{name:"alice", age:"22"},{name:"bob", age:"21"},{name:"john", age:"28"}]
var [firstUser, ...others] = users;
arrowUser(firstUser);
console.log(others)

var overage = firstUser.age>18 ? "over 18" : "under 18";
console.log(overage)