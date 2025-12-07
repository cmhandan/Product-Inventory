const mongoose = require('mongoose');

const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URL); // you must mention the dbName in the url as well else you got error while connecting to db     
        console.log("Database connected successfully!!");
    } catch (error) {        
        console.log("Error connecting db", error);
    }
}
module.exports = {
    connectDb
}