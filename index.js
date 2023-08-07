const mongoose = require('mongoose')
const Person = require('./models/person_schema');

//load environment variables from .env
require('dotenv').config()

const mongo_url = process.env.MONGO_URI

//Set up mongoose connection
mongoose.connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to mongodb"))
    .catch((error) => console.log(`Error connecting to MongoDB ${error}`));

//Create several people using Model.create() 
async function createArrayOfPeople() {
    try {
        const arrayOfPeople = [
            {
                name: 'Fatima Zahra',
                age: 24,
                favoriteFoods: ['Tagine', 'Za3za3']
            },
            {
                name: 'Mx',
                age: 28,
                favoriteFoods: ['Tagine', 'Couscous', 'Harira']
            },
            {
                name: 'Fatima Zahra',
                age: 18,
                favoriteFoods: ['Burger', 'PIZZA']
            },
        ]

        const peoplecreated = await Person.create(arrayOfPeople)
        console.log("People created :", peoplecreated);
        return
    }

    catch (error) {
        console.error('Error creating people:', error);
        return
    }
}


//Search for people by name using Model.find()
async function foundPeople() {
    try {
        const findpeople = await Person.find({ name: 'Fatima Zahra' })
        console.log('People found by name :', findpeople);
        return
    }
    catch (err) {
        console.error('Error finding by name', err);
        return
    }
}


// Find one person by food using Model.findOne()
async function foundFoods() {
    try {
        const findfoods = await Person.findOne({ favoriteFoods: 'Couscous' })
        console.log('Person found by foods :', findfoods);
        return
    }
    catch (err) {
        console.error('Error finding by foods', err);
        return
    }
}


// Function to find a person by _id
async function findPersonById(person) {
    try {
        const foundperson = await Person.findById(person)
        console.log('Person found by id :', foundperson);
        return
    }
    catch (err) {
        console.error('Error finding by id', err);
        return
    }
}
// Function to perform classic update by finding and saving



async function performClassicUpdate(personId) {
    try {
        const foundPerson = await Person.findById(personId);

        if (!foundPerson) {
            console.log('Person not found');
            return
        }

        foundPerson.favoriteFoods.push('Hamburger');
        try {
            const updatedPerson = await foundPerson.save()
            console.log('Updated and saved person:', updatedPerson);
            return;
        }
        catch (err) {
            console.error('Error updating and saving person:', err)
            return;
        }
    } catch (error) {
        console.error('Error finding person by _id:', error);
        return
    }
}
// Find and update a person's age using findOneAndUpdate()
async function FindAndUpdateData() {
    try {
        const updatedPerson = await Person.findOneAndUpdate(
            { name: 'Mx' },
            { age: 20 },
            { new: true },
        )
        console.log('Person age updated:', updatedPerson);
        return
    }
    catch (err) {
        console.error('Error updating person age:', err);
        return
    }
}

// Delete a person by _id using findByIdAndRemove()
async function DeletePersonbyId(personIdToDelete) {
    try {
        const removedPerson = await Person.findByIdAndRemove(personIdToDelete)
        console.log('Person removed:', removedPerson);
        return
    }
    catch (err) {
        console.error('Error deleting person by _id:', err);
        return
    }
}

// Delete many people by name using Model.remove()
async function RemovePeopleByName() {
    try {
        const removedPerson = await Person.remove({ name: 'Fatima Zahra' })
        console.log('People removed by name:', removedPerson);
        return
    }
    catch (err) {
        console.error('Error deleting people by name:', err);
        return
    }
}

// Chain search query helpers
async function filteredPeople() {
    try {
        const removedPerson = await Person.find({ favoriteFoods: 'Harira' })
            .sort({ name: 1 }) // Sorting by name
            .limit(2) // Limiting results to 2 documents
            .exec()
        console.log('Filtered people:', removedPerson);
        return
    }
    catch (err) {
        console.error('Error filtering people:', err);
        return
    }
}


// call the functions above one by one

//  createArrayOfPeople()
//  foundPeople()
//  foundFoods()
//  findPersonById("64d07c395a648195a7d1d8b6")
//  performClassicUpdate('64d077448ea5177155950a2c')
//  FindAndUpdateData()
//  DeletePersonbyId("64d077448ea5177155950a2d")
//  RemovePeopleByName()
filteredPeople()
