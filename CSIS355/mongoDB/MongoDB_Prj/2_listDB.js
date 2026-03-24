//connect to mongodb

const {MongoClient} = require('mongodb');

//console.log(MongoClient);

async function getListOfDB(client){
    dblist = await client.db().admin().listDatabases();
    console.log("here is our db list");
    console.log(dblist["databases"]);
}

async function main(){
    const uri = "mongodb+srv://HttpServer:Password@ebrker355.hgjj1vy.mongodb.net/?appName=ebrker355";

    const client = new MongoClient(uri);
    //handel errors
    try {
        await client.connect();
        console.log("connection established")

        //whatever we do afer connected, we do here
        //get the list of db in our cluster
        await getListOfDB(client);

    } catch (error) {
        console.log(error);
    }finally{
        client.close();
    }
}

main();