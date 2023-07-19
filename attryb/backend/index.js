const express=require("express")
const app=express()
app.use(express.json())
const cors=require("cors")
const { connection } = require("./config/db")
app.use(cors())
require("dotenv").config()

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to database")
        console.log(`server is running at port ${process.env.port}`)
    } catch (error) {
        console.log(error.message)
    }
})