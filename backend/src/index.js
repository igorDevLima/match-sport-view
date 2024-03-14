const mongoose = require("mongoose");

const port = process.env.PORT || 8081

const app = express();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ukpj5ch.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        );

        console.log("Connected to database!");
    } catch (err) {
        console.error("Error connecting to database:", err.message);
        process.exit(1);
    }
};

const startServer = () => {
    app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
const initializeApp = async () => {
    try {
        await connectToDatabase();
        startServer();
    }
    catch (err) {
        console.error("Error initializing the application:", err.message)
        process.exit(1);
    }
}

initializeApp();
