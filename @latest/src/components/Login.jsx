import { useState } from 'react';

function Login({ setUser, onSwitch }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('token', data.token);
                setUser({ email: data.email, token: data.token });
            } else {
                setError(data.error);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Inloggen</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Wachtwoord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Inloggen</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
            <p>Nog geen account? <button onClick={onSwitch}>Registreren</button></p>
        </div>
    );
}

export default Login;