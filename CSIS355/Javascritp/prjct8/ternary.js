//ternart ops

//old way
// let message;
let age=10;
// if(age>=18){
//     message="adult";
// }else{
//     message="minor";
// }

// console.log(message);

//new way

// condition ? "value is true" : "value if false"

let message = age>=18 ? "adult" : "minor";

console.log(message)

//Short circut eval

// && || left to right

// true && "hello"
// false && "hello"
// 0 && "hello"
// "hi" && "hello"

let username = null;
let displayname = username || "guest";

console.log(displayname);

username = "disname1";
displayname = username || "guest";

console.log(displayname);

// || for fallback

// user.isadmin && console.log("admin panel");

// try catch

try{
    //code that might fail
    const data = JSON.parse("pars this string");
}catch(error){
    //what to do when it fails

    console.log(error.message);
}finally{
    //run always
    console.log("allways running");
}