function dbConnection() {
    const mongoose = require('mongoose');
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => {
            console.log('Database connection is fine')
        })
}

module.exports = dbConnection;