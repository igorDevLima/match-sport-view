import app from "./src/app.js";
import connectToDatabase from "./src/app/database/connection.js";

const PORT = process.env.PORT || 8081;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(() =>
    console.error("Error initializing the application:", err.message)
  );
