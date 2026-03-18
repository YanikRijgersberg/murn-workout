import express from 'express';
import {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  deleteWorkout
} from '../controllers/workoutController.js';

const router = express.Router();

// READ
router.get('/', getAllWorkouts);
router.get('/:id', getWorkoutById);

// CREATE
router.post('/', createWorkout);

// UPDATE
router.patch('/:id', updateWorkout);

// DELETE
router.delete('/:id', deleteWorkout);

export default router;