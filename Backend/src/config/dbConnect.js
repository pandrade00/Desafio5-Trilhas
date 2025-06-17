import mongoose, { mongo } from "mongoose";

async function conectaNaDatabase() {
  mongoose.set('strictQuery', true);
  await mongoose.connect(process.env.DB_CONNECTION_STRING);
  return mongoose.connection;
};

export default conectaNaDatabase;
