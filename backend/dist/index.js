import app from "./app.js";
import ConnectDatabase from './db/connection.js';
//connection and listeners
const PORT = process.env.PORT || 5000;
ConnectDatabase().then(() => {
    app.listen(PORT, () => console.log("server And Database Connected"));
})
    .catch((err) => console.log(err));
