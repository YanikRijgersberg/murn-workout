import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Maakt een JWT token aan met het user ID erin
const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d' // Token geldig voor 7 dagen
    });
};

// REGISTER - nieuwe gebruiker aanmaken
export const register = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Controleer of velden zijn ingevuld
        if (!email || !password) {
            return res.status(400).json({ error: 'Vul alle velden in' });
        }

        // Controleer wachtwoord lengte
        if (password.length < 6) {
            return res.status(400).json({ 
                error: 'Wachtwoord moet minimaal 6 karakters zijn' 
            });
        }

        // Controleer of email al bestaat
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ error: 'Email is al in gebruik' });
        }

        // Maak gebruiker aan (wachtwoord wordt automatisch gehashed via pre save)
        const user = await User.create({ email, password });

        // Maak token aan en stuur terug
        const token = createToken(user._id);
        res.status(201).json({ email: user.email, token });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// LOGIN - bestaande gebruiker inloggen
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Controleer of velden zijn ingevuld
        if (!email || !password) {
            return res.status(400).json({ error: 'Vul alle velden in' });
        }

        // Zoek gebruiker op email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                error: 'Email of wachtwoord incorrect' // Vaag om veiligheidsredenen
            });
        }

        // Vergelijk ingevoerd wachtwoord met database
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ 
                error: 'Email of wachtwoord incorrect'
            });
        }

        // Maak token aan en stuur terug
        const token = createToken(user._id);
        res.status(200).json({ email: user.email, token });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};