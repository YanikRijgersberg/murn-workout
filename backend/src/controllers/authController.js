import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Maakt een JWT token aan met het user ID erin
const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

// REGISTER
export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Vul alle velden in' });
        }

        if (password.length < 6) {
            return res.status(400).json({ 
                error: 'Wachtwoord moet minimaal 6 karakters zijn' 
            });
        }

        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ error: 'Email is al in gebruik' });
        }

        const user = await User.create({ email, password });
        const token = createToken(user._id);
        res.status(201).json({ email: user.email, token });

    } catch (error) {
        console.log(error); // Nieuw
        res.status(500).json({ error: error.message }); // Aangepast
    }
};

// LOGIN
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'Vul alle velden in' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Email of wachtwoord incorrect' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Email of wachtwoord incorrect' });
        }

        const token = createToken(user._id);
        res.status(200).json({ email: user.email, token });

    } catch (error) {
        console.log(error); // Nieuw
        res.status(500).json({ error: error.message }); // Aangepast
    }
};