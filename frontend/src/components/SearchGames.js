import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchGames = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (localStorage.getItem('recentSearch') !== null) {
            setSearchTerm(localStorage.getItem('recentSearch'));
            setSearchData(JSON.parse(localStorage.getItem('recentResults')));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.get(`/games/search/${searchTerm}`);
            localStorage.setItem('recentSearch', searchTerm);
            localStorage.setItem('recentResults', JSON.stringify(data));
            setSearchData(data);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
    };

    return(
        <div>
            <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <a href="https://flowbite.com/" class="flex items-center ps-2.5 mb-5">
                    <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-7" alt="Flowbite Logo" />
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">BitBinder</span>
                </a>
                <ul class="space-y-2 font-medium">
                    <li>
                        <a href="/home" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                            <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                        </svg>
                        <span class="ml-3">Home</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                        </svg>
                        <span class="ml-3 whitespace-nowrap">Sign In</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                            <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                            <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                        </svg>
                        <span class="ml-3 whitespace-nowrap">Sign Up</span>
                        </a>
                    </li>
                </ul>
            </div>
            </aside>
            <div className="grid justify-items-center p-4 sm:ml-64">
                <form onSubmit={handleSubmit}>   
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input type="search" onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} id="default-search" className="block mt-16 w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-50 dark:text-white" placeholder="Search for a game..." required />
                        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
            </div>
                {loading &&
                    <div class="p-4 sm:ml-64 mt-96 spinner-border animate-spin inline-block w-16 h-16 border-4 rounded-full text-gray-50" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                }
                {searchData.length > 0 && !loading &&
                    <section class="p-4 sm:ml-64 overflow-hidden text-gray-700">
                        <div class="container px-5 py-2 mx-auto lg:pt-12 lg:px-32">
                            <div class="flex flex-wrap -m-1 md:-m-2">
                                {searchData.map((game) => {
                                    if (game.imageUrl) {
                                        return(
                                            <div class="flex flex-wrap w-1/3 mb-16">
                                                <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-500 m-2 transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300">
                                                    <Link to={`/game/${game.guid}`}>
                                                    <img alt="gallery" class="w-full align-middle rounded-t-lg"
                                                            src={game.imageUrl}/>
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
                }
        </div>
    );
};

export default SearchGames;