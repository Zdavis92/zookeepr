const express = require('express');
const app = express();
const {animals} = require('./data/animals.json');

function filterByQyery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResultes = animalsArray;
    if (query.personalityTraits) {
        //Save personalityTraits as a dedicated array.
        // If personalityTraits is a string, place it into a new array and save.
        if (typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personalityTraits array:
        personalityTraitsArray.forEach(trait => {
            // Check the trait against each animal in the filteredResults array.
            // Remember, it is initially a copy of the animalArray,
            // but here we're updating it for each trait in the .forEach() loop.
            // For each trait being targeted by the filter, the filteredResults
            // array will then contain only the entries that contain the trait,
            // so at the end we'll have an array of animals that have every one
            // of the traits when the .forEach() loop is finished.
            filteredResultes = filteredResultes.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if (query.diet) {
        filteredResultes = filteredResultes.filter(animal => animal.diet === query.diet);
    }
    if (query.species) {
        filteredResultes = filteredResultes.filter(animal => animal.species === query.species);
    }
    if (query.name) {
        filteredResultes = filteredResultes.filter(animal => animal.name === query.name);
    }
    return filteredResultes;
}

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQyery(req.query, results);
    }
    res.json(results);
})


app.listen(3001, () => {
    console.log('API server now on port 3001!')
});