import express from "express";
import {
  searchPerson,
  searchMovie,
  searchTv,
  getSearchHistory,
  removeItemFromSearchHistory,
} from "../controllers/search.controller.js";

const router = express.Router();

router.get("/person/:personQuery", searchPerson);
router.get("/movie/:movieQuery", searchMovie);
router.get("/tv/:tvQuery", searchTv);
router.get("/history", getSearchHistory);
router.delete("/history/:id", removeItemFromSearchHistory);

export default router;
