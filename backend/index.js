import express from "express";
import mongoose from "mongoose";
import router from "./Routes/router.js";

const PORT = process.env.PORT || 3001;
const DB_URL = "mongodb+srv://admin:admin@cluster0.dxbaizi.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use("/api", router);

async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));
  } catch(err) {
    console.error(err);
  }
}

startApp();
