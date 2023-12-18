import { Router } from 'express';
const router = Router();
import axios from 'axios';

const apiKey = '871dd9aecdc7c167115f448dcc395bbd78c6437b';

router.get('/:guid', async (req, res) => {
    const { data } = await axios.get(`https://www.giantbomb.com/api/game/${req.params.guid}/?api_key=${apiKey}&format=json&field_list=expected_release_quarter,expected_release_day,expected_release_month,expected_release_year,deck,original_release_date,image,name,platforms,similar_games,publishers,developers,genres,original_game_rating`);

    let platforms = [];
    if (data.results.platforms) {
        data.results.platforms.forEach((platform) => {
            platforms.push(platform.name);
        });
    }

    let developers = [];
    if (data.results.developers) {
        data.results.developers.forEach((developer) => {
            developers.push(developer.name);
        });
    }

    let publishers = [];
    if (data.results.publishers) {
        data.results.publishers.forEach((publisher) => {
            publishers.push(publisher.name);
        });
    }

    let genres = [];
    if (data.results.genres) {
        data.results.genres.forEach((genre) => {
            genres.push(genre.name);
        });
    }

    let similarGames = [];
    if (data.results.similar_games) {
        data.results.similar_games.forEach((similarGame) => {
            similarGames.push({ title: similarGame.name, guid: similarGame.api_detail_url.split("/")[similarGame.api_detail_url.split("/").length-2]});
        });
    }

    let expectedReleaseDate = "";
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    if (!data.results.original_release_date) {
        if (data.results.expected_release_month) {
            expectedReleaseDate += `${months[data.results.expected_release_month-1]} `;
        }
        if (data.results.expected_release_day) {
            expectedReleaseDate += `${data.results.expected_release_day}, `;
        }
        if (data.results.expected_release_year) {
            expectedReleaseDate += data.results.expected_release_year;
        }
    }

    let gameObject = {
        title: data.results.name,
        releaseDate: data.results.original_release_date,
        guid: req.params.guid,
        platforms: platforms,
        developers: developers,
        publishers: publishers,
        genres: genres,
        shortDesc: data.results.deck,
        imageUrl: data.results.image.original_url,
        similarGames: similarGames,
        expectedReleaseDate: expectedReleaseDate
    };

    res.json(gameObject);
});

router.get('/search/:term', async (req, res) => {
    const { data } = await axios.get(`https://www.giantbomb.com/api/search/?api_key=${apiKey}&format=json&resources=game&query=${req.params.term}`);

    let games = [];
    data.results.forEach((game) => {
        let platforms = [];
        if (game.platforms) {
            game.platforms.forEach((platform) => {
                platforms.push(platform.name);
            });
        }

        let gameObject = {
            title: game.name,
            releaseDate: game.original_release_date,
            guid: game.guid,
            platforms: platforms,
            shortDesc: game.deck,
            imageUrl: game.image.original_url
        };
        games.push(gameObject);
    });
    
    res.json(games);
});

export default router;