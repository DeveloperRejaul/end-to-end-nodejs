import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
dotenv.config()

const requiredEnvs = ["DB_URL", "PORT"]
const envs = new Set(Object.keys(process.env));

const allEnxExists = requiredEnvs.every((env) => envs.has(env));
if(allEnxExists) console.log("environment variable loaded successfully");
if(!allEnxExists) console.log("environment variable not loaded successfully"), process.exit(1);

const PORT = process.env.PORT || 3000

const app = express();

app.get("/", (req:Request, res:Response)=> {
    res.status(200).send("Hello world")
})
app.get("/buy", (req:Request, res:Response)=> {
    res.status(200).send("I'm from buy")
})
app.get("/sell", (req:Request, res:Response)=> {
    res.status(200).send("I'm from sell")
})


app.listen(PORT, ()=> console.log(`App listening on ${PORT}`))
