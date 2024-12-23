const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");

// initialize the environmnet variables
dotenv.config();

// initialize the the 
const app = express();

const PORT = process.env.PORT; //we are fetching the port number from the .env file

//middlware to parse the json body
app.use(bodyParser.json());

// mongodb connection
mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("MongoDb successfully connected"))
.catch(() => console.log("failed to connect to mongodb"))

// define the schema and model
const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true}
});

const Item = mongoose.model("item", itemSchema); //here item nothing but document(table)
// while storing the document here is ITEM(singular), Items

// right now we dont know have data...
app.post('/api/items', async (req, res) => {
    try {
        const postItem = new Item(req.body);;
        await postItem.save();
        res.status(201).json(postItem);
    } catch (error){
        res.status(400).json({error: error.message})
    }

})

// logic to get the items from the api 
app.get("/api/items", async (req, res) => {
    try {
        const items = await Item.find(); 
        res.status(200).json(items)
    } catch(error){
        res.status(500).json({error: error.message})
    }
});

// listening the server
app.listen(PORT, () => {
    console.log(`server is runnning at this url http://localhost:${PORT}`)
})


// database -> document(Item) (Items)-> collection of data