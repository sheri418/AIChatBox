// server.js
import app from "./app.js";
import ConnectDatabase from './db/connection.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

ConnectDatabase().then(() => {
    app.listen(PORT, () => console.log("Server and Database Connected"));
}).catch((err) => console.log(err));
