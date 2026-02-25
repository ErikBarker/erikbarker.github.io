// Q1
// Given this array, use `map()` to create a new array of just the course codes and print it.
// const courses = [
// { code: "CIS 355", name: "Server Side Web Development", credits: 3 },
// { code: "CIS 356", name: "Advanced Web Development", credits: 3 },
// { code: "CIS 210", name: "Database Management", credits: 4 }
// ];
//
//My answer
// const courses = [
// { code: "CIS 355", name: "Server Side Web Development", credits: 3 },
// { code: "CIS 356", name: "Advanced Web Development", credits: 3 },
// { code: "CIS 210", name: "Database Management", credits: 4 }
// ];

// const array = courses.map("code");

// for(var i = 0, i < courses, i++){

// console.log(array[i]);

// }

//Answer analises:map takes a arrow function, and do not need to iterate over the array
//Redo answer

/*
    const courses = [
    { code: "CIS 355", name: "Server Side Web Development", credits: 3 },
    { code: "CIS 356", name: "Advanced Web Development", credits: 3 },
    { code: "CIS 210", name: "Database Management", credits: 4 }
    ];

    console.log(courses.map((course)=>{
        return course.code;
    }));
*/ 


//Actual answer

//Q2
// Create a constructor function called `Student` that takes `name` and `gpa`.
// Create one object with `"John"` and `3.8`. Print the name and gpa using dot notation.

//my answer
// class Student{

//     var name;

//     var gpa;

//     const Student(name, gpa) =>{

//        this.name=name;

//        this.gpa=gpa;

//     }



//     function display(){

//         console.log("Name:", name,"GPA:", gpa);

//     }

// };



// const student1 = Student("John",3.8);

// student1.display();

//Answer analises: needs to be a constructer function not a class
//Redo answer

/*
function Student(name, gpa){
    this.name = name;
    this.gpa = gpa;
    this.display = function(){
        console.log("Name:",name," GPA:",gpa);
    }
}
    var stu = new Student("John", 3.8);
    stu.display();
*/

//Actual answer

//Q3
//Create a class called `Product` with a constructor that takes `name` and `price`.
//Add a method `getInfo()` that returns a string in this format: `"Product: Laptop | Price: $999"`.
//Create one object with `"Laptop"` and `999`, call `getInfo()` and print it.

//my answer
// class Product{

//     var name;

//     var price;

//     const Product(name,price) =>{

//         this.name = name;

//         this.price = price;

//     }

//     function getinfo(){

//         return "Product: " + name + " | Price: $" + price;

//     }

// }



// const prod = Product("Laptop",999);

// console.log(prod.getinfo());

//Answer analises: dont need to declare vars outside of the constructor when making a class
//Redo answer

/*
    class Product{
        constructor(name, price){
            this.name = name;
            this.price = price;
        }

        getInfo(){
            return "Product: " + this.name + " | Price: $" + this.price;
        }
    }

    var prd = new Product("laptop",999);
    console.log(prd.getInfo());
*/

//Actual answer

//Q4
//Given this HTML, write JavaScript so that when each button is clicked, the `<div>`
//background color changes to match the button's text.

//<div id="colorBox" style="width:200px; height:200px; border:1px solid black;"></div>
//<button id="redBtn">Red</button>
//<button id="blueBtn">Blue</button>

//my answer
// const div = document.getelementbyid("colorbox");

// const redbtn= document.getelementbyid("redbtn");

// const bluebtn= document.getelementbyid("bluebtn");

// redbtn.addeventlistener(MouseEvent.click, ()=>{

//     div.background_color = "red";

// });

 

// bluebtn.addeventlistener(MouseEvent.click, ()=>{

//     div.background_color = "blue";

// });

//Answer analises: event listener needs to be "click" not MouseEvent.click
//Redo answer

/*
    const div = document.getElementbyId("colorbox");
    const redbtn = document.getElementbyId("redbtn");
    const bluebtn = document.getElementbyId("bluebtn");

    redbtn.addeventlistener("click", ()=>{
        div.background_color="red";    
    });

    bluebtn.addeventlistener("click", ()=>{
        div.background_color="blue";    
    });
*/


//Actual answer

//Q5

// Write a JavaScript program using nested for loops that prints the following pattern to the console:

// 1
// 12
// 123
// 1234
// 12345

//my answer

// for(var i = 1; i<5;i++){

//     for(var j = 1; j<=i;j++){

//         console.log(j);

//     }

//     console.log("\n");

// }

//Answer analises:
//Redo answer


/*
    for(var i=1;i<=5;i++){
        var row = "";
        for(var j=1;j<=i;j++){
            row+=j;
        }

        console.log(row);
    }
*/

//Actual answer

//Q6
//Given this HTML, write JavaScript that listens for a click on the button and 
//changes the `<h1>` text to `"Welcome to CIS 355!"` when clicked.
//<h1 id="title">Hello</h1>
//<button id="myBtn">Click Me</button>

//my answer

// const title = document.getelementbyid("title");

// const btn= document.getelementbyid("mybtn");

// btn.addeventlistener("click", ()=>{

//     title.textcontent="Welcome to CIS 355!";

// });

//Answer analises:capitlize the c in textcontent, and follow camel cassing structure
//Redo answer

/*
    const title = document.getElementById("title");
    const btn = document.getElementById("mybtn");

    btn.addEventListener("click",()=>{
        title.textcontent="Welcome to CIS 355!";
    });
*/

//Actual answer

//Q7
//Write an arrow function called `getDiscount` that takes a `price` and `percent` as 
//parameters and returns the price after the discount is applied. Call it with `200` 
//and `10` and print the result.

//my answer
// const getDiscount(price,percent)=>{

//     return price-(price*(percent/100));

// }

// console.log(getDiscount(200,10));

//Answer analises:just need to set the const equal to the arrow function
//Redo answer

    /*
        const getDiscount = (price,percent)=>{
            return price-(price*(percent/100));
        }

        console.log(getDiscount(200,10));

    */

//Actual answer

//Q8
//Add a method called `getSummary` to this object that returns `
// "Alice is enrolled in 4 courses"`. Then call it and print the result.
// const student = {
// name: "Alice",
// courses: ["CIS 355", "CIS 356", "CIS 210", "CIS 357"]
// };
//my answer
// const student = {
// name: "Alice",
// courses: ["CIS 355", "CIS 356", "CIS 210", "CIS 357"]
// };
// function getSummary(stu){
//     var coursecount = stu.courses.size();
//     return stu.name + " is entolled in" + coursecount + " courses";
// }
// console.log(getSummary(student));

//Answer analises: function needs to be inside the constructer function
//Redo answer

/*
const student = {
    name: "Alice",
    courses: ["CIS 355", "CIS 356", "CIS 210", "CIS 357"],
    getSummary(){
        return this.name + " is enrolled in " + this.courses.length; 
    }
};

console.log(student.getSummary());

*/



//Actual answer

//Q9
//Using this array, use a `for...of` loop to print only the names of students whose GPA is `3.8` or higher.

// const students = [
// { name: "Alice", gpa: 3.9 },
// { name: "Bob", gpa: 3.2 },
// { name: "Carol", gpa: 3.8 },
// { name: "Dan", gpa: 3.5 }
// ];

//my answer

// const students = [
// { name: "Alice", gpa: 3.9 },
// { name: "Bob", gpa: 3.2 },
// { name: "Carol", gpa: 3.8 },
// { name: "Dan", gpa: 3.5 }
// ];
// for(student of students){
//     if(student.gpa>=3.8){
//         console.log(student.name);
//     }
// }

//Answer analises: not any distinct issues here
//Redo answer

/*
    const students = [
        { name: "Alice", gpa: 3.9 },
        { name: "Bob", gpa: 3.2 },
        { name: "Carol", gpa: 3.8 },
        { name: "Dan", gpa: 3.5 }
    ];

    for(student of students){
        if(student.gpa>=3.8){
//         console.log(student.name);
//     }
    }
*/

//Actual answer

//Q10

//Using the same `courses` array, use `filter()` to get only courses with 3 credits and print the result.
// const courses = [
// { code: "CIS 355", name: "Server Side Web Development", credits: 3 },
// { code: "CIS 356", name: "Advanced Web Development", credits: 3 },
// { code: "CIS 210", name: "Database Management", credits: 4 }
// ];

//expected
// { code: 'CIS 355', name: 'Server Side Web Development', credits: 3 },
// { code: 'CIS 356', name: 'Advanced Web Development', credits: 3 }

//my answer
// const courses = [
// { code: "CIS 355", name: "Server Side Web Development", credits: 3 },
// { code: "CIS 356", name: "Advanced Web Development", credits: 3 },
// { code: "CIS 210", name: "Database Management", credits: 4 }
// ];

// const filtered courses.filter((course)=>{
//     if(credits==3){
//         return course;
//     }
// }
// console.log(filtered);

//Answer analises: uses === instead of ==
//Redo answer

/*
const courses = [
    { code: "CIS 355", name: "Server Side Web Development", credits: 3 },
    { code: "CIS 356", name: "Advanced Web Development", credits: 3 },
    { code: "CIS 210", name: "Database Management", credits: 4 }
];

const filtered = courses.filter((course)=>{
        if(course.credits===3){
            return course;
        }
    });

    console.log(filtered);

*/

//Actual answer

//Q11

//Declare `let score = "85"`. Write an `if/else` that checks `score === 85` and 
// prints `"Match"` if true or `"No Match"` if false. Then on the next line, convert 
// `score` using `Number()` and check again with `===`, printing the same way.

//my answer

// let score = "85"

// if(score===85){

// console.log("Match");

// }else{
// console.log("No Match");

// }

// console.log("\n");

// if(score.Number() === 85){

// console.log("Match");

// }else{
// console.log("No Match");

// }

//Answer analises: Number() is its own function in js not a function in a var
//Redo answer

/*
    let score = "85";

    if(score===85){
        console.log("Match");
    }else{
        console.log("No Match");    
    }

    if(Number(score)===85){
        console.log("Match");
    }else{
        console.log("No Match");    
    }
*/

//Actual answer

//Q12
//Given this HTML, write JavaScript so that clicking "Show" makes the paragraph 
// visible and clicking "Hide" makes it disappear.
//
//<p id="message" style="display:none;">This is a secret message!</p>
//<button id="showBtn">Show</button>
//<button id="hideBtn">Hide</button>

//my answer:dnf

//Answer analises: ran out of time to finish question
//Redo answer

/*
    const msg = document.getElementById("message");
    const showbtn = document.getElementById("showBtn");
    const hidebtn = document.getElementById("hideBtn");

    showbtn.addEventListener("click",()=>{
            msg.style.display = "block";
        });

    showbtn.addEventListener("click",()=>{
            msg.style.display = "none";
        });
*/

//Actual answer

