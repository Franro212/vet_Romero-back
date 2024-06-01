const Pet = require('../src/models/Pet');

// Get all pets
exports.getAllPets = async (req, res) => {
    try {
        const pets = await Pet.find();
        res.json(pets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new pet
exports.addPet = async (req, res) => {
    const pet = new Pet({
        name: req.body.name,
        species: req.body.species,
        age: req.body.age,
        owner: req.body.owner,
    });

    try {
        const newPet = await pet.save();
        res.status(201).json(newPet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get a pet by ID
exports.getPetById = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Pet not found' });
        res.json(pet);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a pet
exports.updatePet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Pet not found' });

        if (req.body.name) pet.name = req.body.name;
        if (req.body.species) pet.species = req.body.species;
        if (req.body.age) pet.age = req.body.age;
        if (req.body.owner) pet.owner = req.body.owner;

        const updatedPet = await pet.save();
        res.json(updatedPet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a pet
exports.deletePet = async (req, res) => {
    try {
        const pet = await Pet.findById(req.params.id);
        if (!pet) return res.status(404).json({ message: 'Pet not found' });

        await pet.remove();
        res.json({ message: 'Pet deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
