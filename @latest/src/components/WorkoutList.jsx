import WorkoutItem from './WorkoutItem';

function WorkoutList({ workouts, setWorkouts }) {
  if (workouts.length === 0) {
    return <p>Geen workouts gevonden</p>;
  }

  return (
    <div>
      {workouts.map(workout => (
        <WorkoutItem 
          key={workout._id}
          workout={workout}
          setWorkouts={setWorkouts}
        />
      ))}
    </div>
  );
}

export default WorkoutList;