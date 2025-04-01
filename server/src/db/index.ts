import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DATABASE_URI || 'mongodb://localhost:27017/meal-planner';
connect(uri)
  .then(() => console.log('db connected successfully'))
  .catch((err: { message: any; }) => console.log("db connection error", err.message));