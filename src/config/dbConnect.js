import mongoose from 'mongoose';


mongoose.connect("mongodb+srv://root:Passw0rd@cluster0.8jyjt.mongodb.net/db-atlas")


let db = mongoose.connection;

export default db;