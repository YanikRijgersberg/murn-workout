import Workout from '../models/Workout.js';
import mongoose from 'mongoose';

// Haal alleen workouts op van ingelogde user
export const getAllWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.user._id })
            .sort({ createdAt: -1 });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Haal één workout op
export const getWorkoutById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: 'Geen geldige workout ID' });
    }

    try {
        const workout = await Workout.findOne({ _id: id, userId: req.user._id });

        if (!workout) {
            return res.status(404).json({ error: 'Workout niet gevonden' });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Maak nieuwe workout aan met userId
export const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;

    try {
        const workout = await Workout.create({ 
            title, 
            reps, 
            load,
            userId: req.user._id // Koppel aan ingelogde user
        });
        res.status(201).json(workout);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update alleen als workout van jou is
export const updateWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: 'Geen geldige workout ID' });
    }

    try {
        const workout = await Workout.findOneAndUpdate(
            { _id: id, userId: req.user._id }, // Dubbele check: ID + eigenaar
            { ...req.body },
            { new: true }
        );

        if (!workout) {
            return res.status(404).json({ error: 'Workout niet gevonden' });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Verwijder alleen als workout van jou is
export const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: 'Geen geldige workout ID' });
    }

    try {
        const workout = await Workout.findOneAndDelete({ 
            _id: id, 
            userId: req.user._id // Dubbele check: ID + eigenaar
        });

        if (!workout) {
            return res.status(404).json({ error: 'Workout niet gevonden' });
        }

        res.status(200).json(workout);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};