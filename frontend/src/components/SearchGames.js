import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const SearchGames = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const { authToken, userProfile, setAuthData, clearAuthData } = useAuth();

    useEffect(() => {
        const initializeContext = async () => {
            let tokenFromParams = searchParams.get("token");
            let token = tokenFromParams || authToken;

            if (!authToken || !userProfile) {
                try {
                    if (token) {
                        const { data } = await axios.get(
                            `/auth/account/${token}`
                        );
                        setAuthData(token, data);
                    }
                } catch (error) {
                    console.error("Error initializing context:", error);
                }
            }

            // Update the search params to remove the token
            if (tokenFromParams) {
                setSearchParams({});
            }

            if (localStorage.getItem("recentSearch") !== null) {
                setSearchTerm(localStorage.getItem("recentSearch"));
                setSearchData(
                    JSON.parse(localStorage.getItem("recentResults"))
                );
            }
        };

        initializeContext();
    }, [authToken, userProfile, searchParams, setAuthData, setSearchParams]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.get(`/games/search/${searchTerm}`);
            localStorage.setItem("recentSearch", searchTerm);
            localStorage.setItem("recentResults", JSON.stringify(data));
            setSearchData(data);
        } catch (error) {
            console.error("Error fetching search results:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="grid justify-items-center p-4 sm:ml-64">
                <form onSubmit={handleSubmit}>
                    <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </div>
                        <input
                            type="search"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            id="default-search"
                            className="block mt-16 w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-50 dark:text-white"
                            placeholder="Search for a game..."
                            required
                        />
                        <button
                            type="submit"
                            className="text-white absolute right-2.5 bottom-2.5 bg-questify-purple-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-questify-purple dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
            {loading && (
                <div
                    class="p-4 sm:ml-64 mt-96 spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full text-gray-50"
                    role="status"
                >
                    <span class="visually-hidden">Loading...</span>
                </div>
            )}
            {searchData.length > 0 && !loading && (
                <div class="p-4 sm:ml-64 relative pt-16 bg-prim-black">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {searchData.map((game) => {
                            if (game.imageUrl) {
                                return (
                                    <div
                                        key={game.guid}
                                        className="relative group overflow-hidden rounded-lg"
                                    >
                                        <Link to={`/game/${game.guid}`}>
                                            <img
                                                src={game.imageUrl}
                                                alt={`Image ${game.guid}`}
                                                className="object-cover w-full h-full transition-transform transform scale-100 group-hover:scale-105 rounded-lg"
                                            />
                                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                                                <p className="text-white text-lg font-bold">
                                                    {game.title}
                                                </p>
                                            </div>
                                        </Link>
                                    </div>
                                );
                            } else {
                                return <div></div>;
                            }
                        })}
                    </div>
                </div>
            )}
            {/* {searchData.length > 0 && !loading &&
                    <section class="p-4 sm:ml-64 overflow-hidden text-gray-700">
                        <div class="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                            <div class="flex flex-wrap -m-1 md:-m-2">
                                {searchData.map((game) => {
                                    if (game.imageUrl) {
                                        return(
                                            <div class="flex flex-wrap w-1/3 mb-16">
                                                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-500 m-2 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300">
                                                    <Link to={`/game/${game.guid}`}>
                                                        <img alt="gallery" class="w-full align-middle rounded-t-lg" src={game.imageUrl}/>
                                                        <blockquote class="relative p-8 mb-4">
                                                            <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" class="absolute left-0 w-full block h-95-px -top-94-px">
                                                                <polygon points="-30,95 583,95 583,65" class="text-gray-500 fill-current"></polygon>
                                                            </svg>
                                                            <h4 class="text-xl font-bold text-white">
                                                                {game.title}
                                                            </h4>
                                                        </blockquote>
                                                    </Link>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return(<div></div>)
                                    }
                                })}
                            </div>
                        </div>
                    </section>
                } */}
        </div>
    );
};

export default SearchGames;
