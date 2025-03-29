import { connect } from "mongoose";

const uri = 'mongodb://localhost:27017/meal-planner';
connect(uri)
  .then(() => console.log('db connected successfully'))
  .catch((err: { message: any; }) => console.log("db connection error", err.message));