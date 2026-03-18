import mongoose from 'mongoose';
import Workout from '../models/workout.js';

// GET alle workouts
export const getAllWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET één workout
export const getWorkoutById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Ongeldige workout ID' });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: 'Workout niet gevonden' });
  }

  res.status(200).json(workout);
};

// POST nieuwe workout
export const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PATCH workout (UPDATE)
export const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Ongeldige workout ID' });
  }

  try {
    const workout = await Workout.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ error: 'Workout niet gevonden' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE workout
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Ongeldige workout ID' });
  }

  try {
    const workout = await Workout.findByIdAndDelete(id);

    if (!workout) {
      return res.status(404).json({ error: 'Workout niet gevonden' });
    }

    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};