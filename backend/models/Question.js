const mongoose = require('mongoose');

// Define the schema for a quiz question
const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true // Remove whitespace from both ends of a string
    },
    correctAnswers: {
        type: [String], // Array of strings for multiple correct variations
        required: true
    },
    hint: {
        type: String,
        default: '' // Optional hint
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically add a timestamp
    }
});

// Create a Mongoose model from the schema
const Question = mongoose.model('Question', questionSchema);

module.exports = Question; 