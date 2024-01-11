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

app.get("/auth/account/:id/:token", async (req, res, next) => {
    const id = req.params.id;

    console.log('in /auth/account/:id/:token middleware');

    if (await client.hExists("accounts", id)) {
        const data = await client.hGet("accounts", id);
        const jsonData = JSON.parse(data);

        return res.json(jsonData);
    } else {
        next();
    }
});
app.get("/auth/account/recentlyPlayed/:token", async (req, res, next) => {
    console.log('in /auth/account/recentlyPlayed/:token middleware');

    if (await client.hExists("recentlyPlayed", "recentlyPlayed")) {
        const data = await client.hGet("recentlyPlayed", "recentlyPlayed");
        const jsonData = JSON.parse(data);

        return res.json(jsonData);
    } else {
        next();
    }
});

app.get("/auth/account/friends/:token", async (req, res, next) => {
    console.log('in /auth/account/friends/:token middleware');

    if (await client.hExists("friends", "friends")) {
        const data = await client.hGet("friends", "friends");
        const jsonData = JSON.parse(data);

        return res.json(jsonData);
    } else {
        next();
    }
});

app.get("/auth/account/marketplace/:token", async (req, res, next) => {
    const id = req.params.id;

    console.log('in /auth/account/marketplace/:token middleware');

    if (await client.hExists("marketplace", "marketplace")) {
        const data = await client.hGet("marketplace", "marketplace");
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
