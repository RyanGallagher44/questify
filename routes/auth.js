import {Router} from "express";

const router = Router();
import {config} from "dotenv";
import axios from "axios";
import redis from "redis";

const client = redis.createClient();
client.connect(() => {
});

config();

const xblioKey = process.env.xblioKey;

router.get("/callback", async (req, res) => {
    const code = req.query.code || null;

    try {
        const tokenResponse = await axios.post("https://xbl.io/app/claim", {
            code: code, app_key: xblioKey,
        });

        const accessToken = tokenResponse.data.app_key;

        res.redirect(`http://localhost:3000/home?token=${accessToken}`);
    } catch (error) {
        console.error("Error exchanging code for access token:", error.message);
        res.status(500).send("Error during authentication");
    }
});

router.post("/profileColors", async (req, res) => {
    const {url} = req.body;

    try {
        const {data} = await axios.get(url);

        return res.json(data);
    } catch (e) {
        return res.json({error: e});
    }
});

router.get("/account/marketplace/:token", async (req, res) => {
    const token = req.params.token;

    console.log('in /auth/account/marketplace');

    try {
        const newResponse = await axios.get("https://xbl.io/api/v2/marketplace/new", {
            headers: {
                "X-Authorization": token, "X-Contract": 100,
            },
        });
        const topPaidResponse = await axios.get("https://xbl.io/api/v2/marketplace/top-paid", {
            headers: {
                "X-Authorization": token, "X-Contract": 100,
            },
        });
        const bestRatedResponse = await axios.get("https://xbl.io/api/v2/marketplace/best-rated", {
            headers: {
                "X-Authorization": token, "X-Contract": 100,
            },
        });
        const comingSoonResponse = await axios.get("https://xbl.io/api/v2/marketplace/coming-soon", {
            headers: {
                "X-Authorization": token, "X-Contract": 100,
            },
        });
        const topFreeResponse = await axios.get("https://xbl.io/api/v2/marketplace/top-free", {
            headers: {
                "X-Authorization": token, "X-Contract": 100,
            },
        });
        const mostPlayedResponse = await axios.get("https://xbl.io/api/v2/marketplace/most-played", {
            headers: {
                "X-Authorization": token, "X-Contract": 100,
            },
        });

        const responseObject = {
            new: newResponse.data.Products,
            topPaid: topPaidResponse.data.Products,
            bestRated: bestRatedResponse.data.Products,
            comingSoon: comingSoonResponse.data.Products,
            topFree: topFreeResponse.data.Products,
            mostPlayed: mostPlayedResponse.data.Products
        };

        const jsonData = JSON.stringify(responseObject);
        await client.hSet("marketplace", "marketplace", jsonData);

        return res.json(responseObject);
    } catch (e) {
        return res.json({error: e});
    }
});

router.get("/account/friends/:token", async (req, res) => {
    const token = req.params.token;

    try {
        const {data} = await axios.get("https://xbl.io/api/v2/friends", {
            headers: {
                "X-Authorization": token, "X-Contract": 100,
            },
        });

        const jsonData = JSON.stringify(data);
        await client.hSet("friends", "friends", jsonData);

        return res.json(data);
    } catch (e) {
        console.log(e);
        return res.json({error: e});
    }
});

router.get("/account/recentlyPlayed/:token", async (req, res) => {
    const token = req.params.token;

    try {
        const {data} = await axios.get("https://xbl.io/api/v2/achievements", {
            headers: {
                "X-Authorization": token, "X-Contract": 100,
            },
        });

        const jsonData = JSON.stringify(data);
        await client.hSet("recentlyPlayed", "recentlyPlayed", jsonData);

        return res.json(data);
    } catch (e) {
        console.log(e);
        return res.json({error: e});
    }
});

router.get("/account/:id/:token", async (req, res) => {
    const id = req.params.id;
    const token = req.params.token;

    try {
        const {data} = await axios.get(`https://xbl.io//api/v2/account/${id}`, {
            headers: {
                "X-Authorization": token, "X-Contract": 100,
            },
        });

        const jsonData = JSON.stringify(data);
        await client.hSet("accounts", id, jsonData);

        return res.json(data);
    } catch (e) {
        return res.json({error: e});
    }
});
router.get("/account/:token", async (req, res) => {
    const token = req.params.token;

    try {
        const {data} = await axios.get("https://xbl.io//api/v2/account", {
            headers: {
                "X-Authorization": token, "X-Contract": 100,
            },
        });
        return res.json(data);
    } catch (e) {
        return res.json({error: e});
    }
});

export default router;
