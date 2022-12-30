const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Secret chat website server is running...");
});

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.uhbaknf.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// connect with database
const dbConnect = async () => {
  try {
    await client.connect();
  } catch (error) {
    console.error(error);
  }
};
dbConnect();

// database collection
const postCollection = client.db("secretChat").collection("post");
app.get("/post", async (req, res) => {
  try {
    const query = {};
    const result = await postCollection.find(query).toArray();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

app.post("/post", async (req, res) => {
  try {
    const post = req.body;
    const result = await postCollection.insertOne(post);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Initialize server
app.listen(port, () => {
  console.log("Server is running on port", port);
});
