import express from "express";
const app = express();
import configRoutes from "./routes/index.js";
import cors from "cors";
import redis from "redis";
const client = redis.createClient();
client.connect().then(() => {});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/auth/account/recentlyPlayed/:token", async (req, res, next) => {
    if (await client.hExists("recentlyPlayed", "recentlyPlayed")) {
        const data = await client.hGet("recentlyPlayed", "recentlyPlayed");
        const jsonData = JSON.parse(data);

        return res.json(jsonData);
    } else {
        next();
    }
});

app.get("/auth/account/friends/:token", async (req, res, next) => {
    if (await client.hExists("friends", "friends")) {
        const data = await client.hGet("friends", "friends");
        const jsonData = JSON.parse(data);

        return res.json(jsonData);
    } else {
        next();
    }
});

configRoutes(app);

app.listen(3030, () => {
    console.log("Your routes will be running at http://localhost:3030");
});
