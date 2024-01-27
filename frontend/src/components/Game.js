import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import moment from "moment";

const Game = () => {
    const [gameData, setGameData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const {data} = await axios.get(`/games/${id}`);
                setGameData(data);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        }

        if (id) {
            fetchData();
        }
    }, [id]);

    if (loading) {
        return (<div
            class="mt-96 spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full text-gray-50"
            role="status"
        >
            <span class="visually-hidden">Loading...</span>
        </div>);
    } else {
        return (<section class="p-4 sm:ml-64 relative pt-16 bg-blueGray-50">
            <div class="container mx-auto">
                <div class="flex flex-wrap items-center">
                    <div class="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-78">
                        <div
                            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-questify-purple">
                            <img
                                alt="..."
                                src={gameData.imageUrl}
                                class="w-full align-middle rounded-t-lg"
                            />
                            <blockquote class="relative p-8 mb-4">
                                <svg
                                    preserveAspectRatio="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 583 95"
                                    class="absolute left-0 w-full block h-95-px -top-94-px"
                                >
                                    <polygon
                                        points="-30,95 583,95 583,65"
                                        class="text-questify-purple fill-current"
                                    ></polygon>
                                </svg>
                                <h4 class="text-xl font-bold text-white">
                                    {gameData.title}
                                </h4>
                                <p class="text-md font-light mt-2 text-white">
                                    {gameData.shortDesc}
                                </p>
                            </blockquote>
                        </div>
                    </div>

                    <div class="w-full md:w-6/12 px-4">
                        <div class="flex flex-wrap">
                            <div class="w-full md:w-6/12 px-4">
                                <div class="relative flex flex-col mt-4">
                                    <div class="px-4 py-5 flex-auto">
                                        <div
                                            class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <i class="fas fa-clock"></i>
                                        </div>
                                        {gameData.releaseDate && (<div>
                                            <h6 class="text-xl mb-1 font-semibold">
                                                Release Date
                                            </h6>
                                            <p class="mb-4 text-blueGray-500">
                                                {moment(gameData.releaseDate).format("MMMM DD, YYYY")}
                                            </p>
                                        </div>)}
                                        {!gameData.releaseDate && (<div>
                                            <h6 class="text-xl mb-1 font-semibold">
                                                Expected Release Date
                                            </h6>
                                            <p class="mb-4 text-blueGray-500">
                                                {gameData.expectedReleaseDate}
                                            </p>
                                        </div>)}
                                    </div>
                                </div>
                                <div class="relative flex flex-col min-w-0">
                                    <div class="px-4 py-5 flex-auto">
                                        <div
                                            class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <i class="fas fa-gamepad"></i>
                                        </div>
                                        <h6 class="text-xl mb-1 font-semibold">
                                            Genres
                                        </h6>
                                        <ul>
                                            {gameData.genres.map((genre) => {
                                                return (<li class="text-blueGray-500">
                                                    {genre}
                                                </li>);
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="w-full md:w-6/12 px-4">
                                <div class="relative flex flex-col min-w-0 mt-4">
                                    <div class="px-4 py-5 flex-auto">
                                        <div
                                            class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <i class="fas fa-newspaper"></i>
                                        </div>
                                        <h6 class="text-xl mb-1 font-semibold">
                                            Developers
                                        </h6>
                                        <ul>
                                            {gameData.developers.map((developer) => {
                                                return (<li class="text-blueGray-500">
                                                    {developer}
                                                </li>);
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div class="relative flex flex-col min-w-0">
                                    <div class="px-4 py-5 flex-auto">
                                        <div
                                            class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white">
                                            <i class="fas fa-file-alt"></i>
                                        </div>
                                        <h6 class="text-xl mb-1 font-semibold">
                                            Publishers
                                        </h6>
                                        <ul>
                                            {gameData.publishers.map((publisher) => {
                                                return (<li class="text-blueGray-500">
                                                    {publisher}
                                                </li>);
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>);
    }
};

export default Game;
