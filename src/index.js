import express from "express";
import connect from "./database/connect.js"
import routes from "./routes/index.js"

const app = express();
app.use(express.json());
connect();


app.get("/",(req,res)=>{
    res.send("Aplicacion iniciada");
});

app.use('/api', routes);

const PORT = process.env.PORT_SD;
const server = app.listen(PORT, (req,res)=>{
    console.log(`Aplicacion iniciada en http://localhost:${PORT}`);
})