import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,      // Elk email maar 1x
        lowercase: true    // Altijd kleine letters opslaan
    },
    password: {
        type: String,
        required: true,
        minlength: 6       // Minimaal 6 karakters
    }
}, {
    timestamps: true       // Maakt createdAt en updatedAt aan
});

// Draait automatisch VOOR opslaan in database
userSchema.pre('save', async function() {
    if (!this.isModified('password')) {
        return; // Wachtwoord niet veranderd? Sla over
    }
    this.password = await bcrypt.hash(this.password, 10); // Hash het wachtwoord
});

// Vergelijkt ingevoerd wachtwoord met gehashte wachtwoord in database
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;