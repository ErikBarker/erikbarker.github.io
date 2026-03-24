//connect to mongodb

const {MongoClient} = require('mongodb');

//console.log(MongoClient);



async function main(){
    const uri = "mongodb+srv://HttpServer:Password@ebrker355.hgjj1vy.mongodb.net/?appName=ebrker355";

    const client = new MongoClient(uri);
    //handel errors
    try {
        await client.connect();
        console.log("connection established")
    } catch (error) {
        console.log(error);
    }finally{
        client.close();
    }
}

main();