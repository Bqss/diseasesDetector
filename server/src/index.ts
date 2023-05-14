import express from "express";
import http from  "http";
import { PrismaClient } from "@prisma/client";
import { mainRoute } from "./routes";
import cors from "cors"


const app = express();
const httpServer = http.createServer(app);

export const prisma = new PrismaClient();

app.use(express.json())
app.use(cors({
  origin : ["http://localhost:5173"]
}))
app.use(mainRoute);

prisma.$connect().then(() => {
  httpServer.listen(5000,()=> {
    console.log("listening on port 5000");
  })
})






