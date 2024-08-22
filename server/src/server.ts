import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./database";
import { company_list_router } from "./company.routes";

dotenv.config();

const { ATLAS_URI } = process.env;

if (!ATLAS_URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(ATLAS_URI)
  .then(() => {
    const app = express();
    app.use(cors());
    app.use("/company-list", company_list_router);
    // start the Express server
    app.listen(8080, () => {
      console.log(`Server running at http://localhost:8080`);
    });
  })
  .catch((error) => console.error(error));