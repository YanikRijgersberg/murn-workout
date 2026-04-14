import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    // Geen token meegestuurd
    if (!authorization) {
        return res.status(401).json({ error: 'Je moet ingelogd zijn' });
    }

    // Haal token uit "Bearer <token>"
    const token = authorization.split(' ')[1];

    try {
        // Controleer of token geldig is
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);

        // Zet user in request zodat controllers erbij kunnen
        req.user = await User.findById(userId).select('_id email');

        // Ga door naar controller
        next();

    } catch (error) {
        res.status(401).json({ error: 'Token is niet geldig' });
    }
};