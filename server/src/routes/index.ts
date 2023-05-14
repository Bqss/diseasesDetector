import { Router } from "express";
import { IndexController } from "../controllers";

export const mainRoute = Router();


mainRoute.get("/penyakit",IndexController.getPenyakit);
mainRoute.get("/gejala",IndexController.getGejala);
mainRoute.post("/penyakit",IndexController.addPenyakit);
mainRoute.post("/gejala",IndexController.addGejala);
mainRoute.put("/penyakit/:id_penyakit",IndexController.bindGejala);
mainRoute.get("/diagnosa",IndexController.diagnosa);
mainRoute.get("/qs",IndexController.getQs)