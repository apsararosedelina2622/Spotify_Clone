import { v2 as cloudinary } from "cloudinary"
import songModel from "../models/songModel.js";


const addSong = async (req, res) => {
    
    try {

        const name = req.body.name;
        const desc = req.body.desc;
        const album = req.body.album;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];

        const audioUpload = await cloudinary.uploader.upload(audioFile.path, { resource_type: "video" });
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });        
        const duration = `${Math.floor(audioUpload.duration / 60)}:${Math.floor(audioUpload.duration % 60)}`;
        
        const songData = {
            name,
            desc,
            album,
            image: imageUpload.secure_url,
            file: audioUpload.secure_url,
            duration
        }

        const song = songModel(songData);
        await song.save();

        res.json({ success: true, message: "Song Added" })

    } catch (error) {
        res.json({ success: false, message: "Song List Failed" })
    }

}

const listSong = async (req, res) => {

    try {
        const allSongs = await songModel.find({});
        res.json({ success: true, songs: allSongs });
    } catch (error) {
        res.json({ success: false, message: "Song List Failed" })
    }

}

const removeSong = async (req, res) => {

    try {
        await songModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Song removed success" });
    } catch (error) {
        res.json({ success: false, message: "Song removed Failed" })
    }

}

const searchBox = async (req, res) => {
    const { name } = req.params; 

    if (!name || name.trim() === "") {
        return res.json([]); 
    }

    try {
        const songs = await songModel.find({
            name: { $regex: name, $options: 'i' } 
        });
        res.json(songs); 
    } catch (error) {
        console.error("Error occurred while searching:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export { addSong,listSong,removeSong,searchBox }