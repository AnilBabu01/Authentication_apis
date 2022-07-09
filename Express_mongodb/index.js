const connectoMongo = require("./config/db");
connectoMongo();
const express = require('express');
const cors = require('cors')
const app = express();
const port = 8080;
app.use(express.json());
app.use(cors())

const path = require('path');
require('dotenv').config({
    path:path.join(__dirname,'.env')
})

const userRoutes = require("./routes/users");
console.log(process.env.HOST)

//it is compulsary to use of .api/auth before use any root

app.use('/api/auth',userRoutes);

app.get("/api", (req, res) => {
    res.send("Api is working on Port " + port);
  });

app.listen(port,()=>{
    console.log(`backend listening at http://localhost:${port}`);
})

