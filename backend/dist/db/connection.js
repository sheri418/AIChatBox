import { connect } from "mongoose";
const ConnectDatabase = async () => {
    const mongoDbUrl = process.env.MONGODB_URL;
    if (!mongoDbUrl) {
        throw new Error("Url not provide");
    }
    try {
        await connect(mongoDbUrl);
        console.log("Database connected");
    }
    catch (error) {
        console.error("Connecting Error:", error);
        throw new Error("Database Not Connected");
    }
};
export default ConnectDatabase;
