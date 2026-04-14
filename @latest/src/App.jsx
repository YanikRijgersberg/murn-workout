import { useEffect, useState } from 'react';
import WorkoutList from './components/WorkoutList';
import WorkoutForm from './components/WorkoutForm';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    const [workouts, setWorkouts] = useState([]);
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(true);

    // Check of user al ingelogd is bij opstarten
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });
        }
    }, []);

    // Workouts ophalen met token
    const fetchWorkouts = async () => {
        const token = localStorage.getItem('token');

        try {
            const res = await fetch('http://localhost:4000/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (res.ok) {
                setWorkouts(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    // Workouts ophalen als user ingelogd is
    useEffect(() => {
        if (user) {
            fetchWorkouts();
        }
    }, [user]);

    // Uitloggen
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setWorkouts([]);
    };

    // Niet ingelogd? Toon login of register
    if (!user) {
        return showLogin 
            ? <Login setUser={setUser} onSwitch={() => setShowLogin(false)} />
            : <Register setUser={setUser} onSwitch={() => setShowLogin(true)} />;
    }

    // Ingelogd? Toon workouts
    return (
        <div>
            <div>
                <h1>Workouts</h1>
                <button onClick={handleLogout}>Uitloggen</button>
            </div>
            <WorkoutForm setWorkouts={setWorkouts} workouts={workouts} />
            <WorkoutList workouts={workouts} setWorkouts={setWorkouts} />
        </div>
    );
}

export default App;