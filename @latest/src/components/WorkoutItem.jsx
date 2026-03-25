import UpdateWorkout from './UpdateWorkout';

function WorkoutItem({ workout, setWorkouts }) {

  const handleDelete = async () => {
    if (!confirm('Weet je het zeker?')) return;

    try {
      const res = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setWorkouts(prev => prev.filter(w => w._id !== workout._id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
      <h3>{workout.title}</h3>
      <p>Reps: {workout.reps}</p>
      <p>Load: {workout.load} kg</p>

      <button onClick={handleDelete}>Verwijderen</button>

      <UpdateWorkout 
        workout={workout} 
        setWorkouts={setWorkouts}
      />
    </div>
  );
}

export default WorkoutItem;