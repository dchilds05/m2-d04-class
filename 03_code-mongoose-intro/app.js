/**
 *  TOC
 */

const mongoose = require("mongoose")

const DB_NAME = "mongoose-intro"

mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`,
{useNewUrlParser: true, useUnifiedTopology: true}
)
.then(x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
.catch(err => console.error('Error connecting to mongo', err));


//In Mongoose, "models" are Classes for creating documents. A document is one entry in the database. Schema is a configuration object 
//This is the minimum that each document must have. See below
const Cat = mongoose.model(
    "Cat",  //Name of the collection where we will put entries. Mongo will convert it to lower case and will add an "s" at the end. This will become "cats"
    {
    name: String,
    color: String,
    age: Number
    } //THESE ARE NOT JS PRIMITIVES. THEY ARE MONGOOSE CLASSES, WHICH HAVE DIFFERENT BEHAVIOR
)

const Dog = mongoose.model(
    "Dog",  
    {
    name: String,
    color: String,
    age: Number
    } 
)

const createCatPromise = Cat.create(
    {
      name: "Marco",
      color: "carrot",
      age: 3,
      meowsLoudly: true,
      sex: "M"
    }
  )
  
  const createDogPromise =  Dog.create(
    {
      name: "Fuffy",
      color: "white",
      age: 2,
      barksLoudly: false,
      sex: "M"
    }
  )

  Promise.all([createDogPromise, createCatPromise])
  .then(catsAndDogsArray => console.log("These are the cats and dogs I have created:", catsAndDogsArray))

  const catFindPromise = Cat.find(
      {
          name: "Marco"
      }
  )

  const dogFindPromise = Dog.find(
      {
          name: "Fuffy"
      }
  )

  Promise.all([catFindPromise, dogFindPromise])
  .then(catsAndDogsArray => console.log("This is all the cats and dogs I have found", catsAndDogsArray))


/*
Cat.create(
    {
        name: "Marco", 
        color: "carrot", 
        age: 0, 
        meowsLoudly: true
    }
)
.then(cat => console.log(cat))   // In this callback you will do some thing meaningful for your app, i.e. ires.render() a new template that contains the new cat data
.catch(err => console.log(err))

Cat.find(
    {
        name: "Marco"
    }
)
.then(cats => console.log("Cat.find() results: ", cats))
.catch( (err) => console.log("Cat.find() returned an error: ", err))
*/

mongoose.connection.on("connected", () => console.log("Mongoose connected (coming from the connection event listener)"))

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
  });