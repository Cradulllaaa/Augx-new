const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { MongoClient, ServerApiVersion } = require('mongodb');
const { kMaxLength } = require("buffer");
const mongoose = require("mongoose");
const cors = require("cors");
const Image = require('./Image');


const imageSchema = require('./Image'); 

const app = express();
app.use(cors(
    {
        origin: '*', // Change this to the specific origin you want to allow
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });


const uri = "mongodb+srv://admin:testing123@image-catalog.f3kizhp.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(uri, {
        useNewUrlParser: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

connectDB();


app.post("/api/upload", upload.single("image"), async (req, res) => {
    // res.setHeader("Content-Type", "multipart/form-data");
    // res.setHeader("Accept", "multipart/form-data")
    // res.setHeader("Access-Control-Allow-Origin", "*")
    try {
        const metadata = req.body; // Assuming metadata is sent as JSON in the request body

        const newImage = new Image({
            data: req.body.path.toString(),
            title: 'new sjnkjn',
            Favourite: false,
            contentType: 'png'
        });
        console.log(newImage)

        await newImage.save()
            .then((item,err)=> {
                if(err) {
                    console.log(err)
                    res.status(500).send(err)
                }
                else {
                    res.status(201).send('Image and metadata saved successfully');
        
                }
            })

        // const { originalname, buffer, mimetype } = req.file;
    
        // const image = new Image({
        // name: originalname,
        // data: buffer,
        // title: originalname,
        // contentType: mimetype,
        // });

        // await image.save();

        res.status(201).send('Image uploaded successfully');
        } 
    catch (error) {
        console.error(error);
        res.status(500).send('An error occurred');
    }
});


app.get("/api/images", async(req, res) => {
    const images = await Image.find();
    // Image.deleteMany({});
    console.log(images);
    res.json(images)
    // cb.find({})
    // .then((err, images) => {
    //     if (err) {
    //         console.log(err);
    //         res.status(500).send("An error occurred", err);
    //     } else {
    //         res.send({ images: images });
    //     }
    // });
});

app.listen(5000, () => {
  console.log("Server is listening on Port 5000");
});