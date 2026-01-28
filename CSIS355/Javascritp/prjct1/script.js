console.log("helloo pt2")

const mename="erik"
const lastname="barker"
let age=19
let gender="male"
const biogender="male"
let sexuality="straight"

age=20

const fullnamefunc = (fname, lname) => fname + " " + lname;


// mename="hell"

print("name", mename, lastname, "age", age, "gender",gender,"bio",biogender, "sexuality",sexuality);
print(`My name is ${fullname(mename, lastname)}`);
print(`My name is ${fullnamefunc(mename, lastname)}`);
isadult(age)

function print(txt) {
    console.log(txt);
}

function fullname(fname, lname){
    return fname + " " + lname;
}


function isadult(age){
    if(age>=18){
        print("adult");
    }else{
        print("is not adult");
    }
}