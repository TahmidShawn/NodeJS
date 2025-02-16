require("dotenv").config();

const app = require("./app.js");
const PORT = process.env.PORT || 3000;
const connectToDb = require("./db/db.js");

const startServer = () =>
    app.listen(PORT, () => {
        console.log("server is running");
    });

// connectToDb()
//     .then(() => {
//         startServer();
//     })
//     .catch((error) => {
//         console.log(error);
//     });

const connection = async () => {
    try {
        await connectToDb();
        startServer();
    } catch (error) {
        console.log(error);
    }
};
connection();
