const connectoMysql = require("./db");
connectoMysql();
const express = require('express');
const app = express();
const port = 5000;
app.get('/',(req,res)=>{
    res.send('welcome learn express')
})

app.get('/api',(req,res)=>{
    res.send('api is working')
})

app.listen(port,()=>{
    console.log(`backend listening at http://localhost:${port}`);
})

