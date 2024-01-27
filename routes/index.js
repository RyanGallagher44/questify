import gameRoutes from "./games.js";
import authRoutes from "./auth.js";

const constructorMethod = (app) => {
    app.use("/games", gameRoutes);
    app.use("/auth", authRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "This endpoint does not exist!"});
    });
};

export default constructorMethod;
