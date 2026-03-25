import { useEffect, useState } from 'react';
import WorkoutList from './components/WorkoutList';
import WorkoutForm from './components/WorkoutForm';

function App() {
  const [workouts, setWorkouts] = useState([]);

  const fetchWorkouts = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/workouts');
      const data = await res.json();
      setWorkouts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div>
      <h1>Workouts</h1>
      <WorkoutForm setWorkouts={setWorkouts} workouts={workouts} />
      <WorkoutList workouts={workouts} setWorkouts={setWorkouts} />
    </div>
  );
}

export default App;