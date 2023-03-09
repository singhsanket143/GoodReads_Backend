const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "can't be blank"]
    },
    books: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ]
}, {timestamps: true});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;