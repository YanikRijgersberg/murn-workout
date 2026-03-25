import { useState } from 'react';

function UpdateWorkout({ workout, setWorkouts }) {
  const [title, setTitle] = useState(workout.title);
  const [reps, setReps] = useState(workout.reps);
  const [load, setLoad] = useState(workout.load);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedWorkout = {
      title,
      reps: Number(reps),
      load: Number(load)
    };

    try {
      const res = await fetch(`http://localhost:4000/api/workouts/${workout._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedWorkout)
      });

      const data = await res.json();

      if (res.ok) {
        setWorkouts(prev =>
          prev.map(w => (w._id === workout._id ? data : w))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input value={reps} onChange={(e) => setReps(e.target.value)} />
      <input value={load} onChange={(e) => setLoad(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateWorkout;