import mongoose, { connection } from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("Connected", () => {
      console.log("MongoDB connected Successfully");
    });

    connection.on("error", (err) => {
      console.log("Something went wrong with MongoDB ", +err);
      process.exit();
    });
  } catch (error) {
    console.log("Something Went Wrong");
    console.log(error);
  }
}
