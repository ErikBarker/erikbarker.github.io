1. Given this object, use object destructuring to extract title and author into
variables in a single line. Also give pages a default value of 200.

const book = { title: "Dune", author: "Frank Herbert" };

2. Given two arrays, use the spread operator to create a new array
called allFruits that combines both and adds "mango" at the end.

const tropical = ["pineapple", "papaya"];
const berries = ["strawberry", "blueberry"];

3. Write a function called introduce that takes an object with name and role properties.
Use destructuring in the function parameter to log "Hi, I'm Alice and I'm a
Developer".

4. Use array destructuring with the rest operator to grab the first item into a variable
called winner and everything else into runnerUps.

const rankings = ["Gold", "Silver", "Bronze", "4th", "5th"];

5. Write a single line using the ternary operator that assigns "Even" or "Odd" to a
variable called type based on whether num is even.

const num = 7;

6. A variable nickname might be null. Using the ?? operator, write one line that
assigns nickname to displayName if it exists, or "Anonymous" if it's null or undefined.

const nickname = null;

7. Using short-circuit evaluation with &&, write one line that
calls console.log("Access granted") only if isAdmin is true. No if statement allowed.

const isAdmin = true;

8. Write a try...catch block that attempts to parse the string jsonString. If it succeeds,
log the parsed object. If it fails, log "Invalid JSON".

const jsonString = "{bad data}";

9. Write a function called withdraw that takes balance and amount. If amount is greater
than balance, throw a custom error with the message "Insufficient funds". Then
call the function inside a try...catch and log the error message if it fails.

10. Write a try...catch...finally block that tries to access user.address.city. If it
fails, log "Could not get city". In the finally block, log "Lookup complete".

const user = null;