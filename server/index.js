import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/products.js";
import transactionRoutes from "./routes/transaction.js";
import Product from "./models/Product.js";
import KPI from "./models/KPI.js";
import Transaction from "./models/Transaction.js";
import { kpis, products, transactions } from "./data/data.js";

/*Configurations*/
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/*Route Configuration*/

app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

/*Mongoose Setup*/

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // await mongoose.connection.db.dropDatabase();
    // await KPI.insertMany(kpis);
    // await Product.insertMany(products);
    // await Transaction.insertMany(transactions);
  })
  .catch((err) => console.log(`${err} did not connect`));
