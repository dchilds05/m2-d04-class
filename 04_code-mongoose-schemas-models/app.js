/**
 * TOC
 * 1 - connect to database
 * 2 - create JS objects or arrays for the data
 * 3 - perform crud operations
 * 4 - check in Compass if it works
 * 5 - create models with data validation
 */

const mongoose = require('mongoose');
//const data = require('./data.js');

const DB_NAME = 'mongoose-example-bank';

mongoose
    .connect(`mongodb://localhost:27017/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then((x) =>
    console.log(
        `Connected to Mongo! Database name: "${x.connections[0].name}" coming from the .then() of the conneciton promise`
    ))
    .catch((err) => console.error('Error connecting to mongo', err));


const client1 = {
    name: 'Alberto Marcos',
    age: 60,
    accountActive: true,
    balance: 31218.56,
    payments: []
};

const Client = require("./models/client-model")

Client.create(client1)
    .then((createdClient) => console.log(createdClient))
    .catch(err => console.log(err))

Client.findOneAndUpdate({name: "Albert Marcos"}, {age: 50})
    .then( (updatedClient) => console.log(updatedClient))
    .catch( error => console.log(error))

Client.deleteOne({name: "Alberto Marcos"}
    .then(() => console.log("element deletred correctly"))
    .catch((error) => console.log(error))


const data = require("./data.js");

Client.insertMany(data)
    .then((createdClients) => console.log(createdClients))
    .catch((err) => console.log(err));
