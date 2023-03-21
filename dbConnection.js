require('dotenv').config();
const mongoose = require('mongoose');


async function Connect() {
    await mongoose.connect(process.env.MONGODBURI);
}

module.exports = Connect();