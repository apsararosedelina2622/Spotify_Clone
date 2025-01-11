import { addSong,listSong,removeSong,searchBox } from "../controllers/songController.js";
import express from 'express'
import upload from "../middleware/multer.js";

const songRouter = express.Router();

songRouter.post('/add', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1}]), addSong);

songRouter.get('/list', listSong);
songRouter.get('/search/:name', searchBox);

songRouter.post('/remove', removeSong);

export default songRouter;