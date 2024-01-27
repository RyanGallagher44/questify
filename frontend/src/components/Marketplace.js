import React, {useEffect, useState} from 'react';
import {useAuth} from "./AuthContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Marketplace = () => {
    const [loading, setLoading] = useState(true);
    const [newData, setNewData] = useState(undefined);
    const [topPaidData, setTopPaidData] = useState(undefined);
    const [bestRatedData, setBestRatedData] = useState(undefined);
    const [comingSoonData, setComingSoonData] = useState(undefined);
    const [topFreeData, setTopFreeData] = useState(undefined);
    const [mostPlayedData, setMostPlayedData] = useState(undefined);
    const {authToken} = useAuth();
    const [activeTab, setActiveTab] = useState('new');
    const navigate = useNavigate();

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'new':
                return marketplaceTab(newData, 'New');
            case 'topPaid':
                return marketplaceTab(topPaidData, 'Top Paid');
            case 'bestRated':
                return marketplaceTab(bestRatedData, 'Best Rated');
            case 'comingSoon':
                return marketplaceTab(comingSoonData, 'Coming Soon');
            case 'topFree':
                return marketplaceTab(topFreeData, 'Top Free');
            case 'mostPlayed':
                return marketplaceTab(mostPlayedData, 'Most Played');
            default:
                return null;
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const {data} = await axios.get(`/auth/account/marketplace/${authToken}`);
                setNewData(data.new);
                setTopPaidData(data.topPaid);
                setBestRatedData(data.bestRated);
                setComingSoonData(data.comingSoon);
                setTopFreeData(data.topFree);
                setMostPlayedData(data.mostPlayed);
                setLoading(false);
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        }

        if (authToken) {
            fetchData();
        }
    }, [authToken]);

    const findId = async (title) => {
        try {
            const {data} = await axios.get(`/games/search/${title}`);
            navigate(`/game/${data[0].guid}`);
        } catch (e) {
            console.log(e);
        }
    };

    const marketplaceTab = (data, title) => {
        return (<div>
                <h2 className="text-white font-bold text-left mb-4 text-2xl">{title}</h2>
                <div className="flex-grow h-[100vh] overflow-y-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.map((game) => (<div
                                key={game.ProductId}
                                className="relative group overflow-hidden rounded-lg"
                            >
                                <a onClick={() => findId(game.LocalizedProperties[0].ProductTitle)}>
                                    {game.LocalizedProperties[0].Images.find((element) => element.ImagePurpose === 'BoxArt') &&
                                        <img
                                            src={`https:${game.LocalizedProperties[0].Images.find((element) => element.ImagePurpose === 'BoxArt').Uri}`}
                                            alt={`Image ${game.ProductId}`}
                                            className="object-cover w-full h-full transition-transform transform scale-100 group-hover:scale-105 rounded-lg"
                                        />}
                                    <div
                                        className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                                        <p className="text-white text-lg font-bold">
                                            {game.LocalizedProperties[0].ProductTitle}
                                        </p>
                                        <p className="text-white text-sm">
                                            {game.LocalizedProperties[0].DeveloperName}
                                        </p>
                                    </div>
                                </a>
                            </div>))}
                    </div>
                </div>
            </div>);
    };

    if (loading) {
        return (<div>Loading...</div>);
    } else {
        return (<div>
                <div className="p-4 sm:ml-64 relative pt-16 bg-prim-black">
                    <div className="md:flex">
                        <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
                            <li className="mr-3">
                                <a
                                    href="#"
                                    className={`inline-flex items-center px-12 py-3 rounded-lg ${activeTab === 'new' ? 'text-white bg-blue-700' : 'hover:text-gray-900 bg-gray-50 hover:bg-gray-100'} dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                                    onClick={() => handleTabClick('new')}
                                >
                                    New
                                </a>
                            </li>
                            <li className="mr-3">
                                <a
                                    href="#"
                                    className={`inline-flex items-center px-12 py-3 rounded-lg ${activeTab === 'topPaid' ? 'text-white bg-blue-700' : 'hover:text-gray-900 bg-gray-50 hover:bg-gray-100'} dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                                    onClick={() => handleTabClick('topPaid')}
                                >
                                    Top Paid
                                </a>
                            </li>
                            <li className="mr-3">
                                <a
                                    href="#"
                                    className={`inline-flex items-center px-12 py-3 rounded-lg ${activeTab === 'bestRated' ? 'text-white bg-blue-700' : 'hover:text-gray-900 bg-gray-50 hover:bg-gray-100'} dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                                    onClick={() => handleTabClick('bestRated')}
                                >
                                    Best Rated
                                </a>
                            </li>
                            <li className="mr-3">
                                <a
                                    href="#"
                                    className={`inline-flex items-center px-12 py-3 rounded-lg ${activeTab === 'comingSoon' ? 'text-white bg-blue-700' : 'hover:text-gray-900 bg-gray-50 hover:bg-gray-100'} dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                                    onClick={() => handleTabClick('comingSoon')}
                                >
                                    Coming Soon
                                </a>
                            </li>
                            <li className="mr-3">
                                <a
                                    href="#"
                                    className={`inline-flex items-center px-12 py-3 rounded-lg ${activeTab === 'topFree' ? 'text-white bg-blue-700' : 'hover:text-gray-900 bg-gray-50 hover:bg-gray-100'} dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                                    onClick={() => handleTabClick('topFree')}
                                >
                                    Top Free
                                </a>
                            </li>
                            <li className="mr-3">
                                <a
                                    href="#"
                                    className={`inline-flex items-center px-12 py-3 rounded-lg ${activeTab === 'mostPlayed' ? 'text-white bg-blue-700' : 'hover:text-gray-900 bg-gray-50 hover:bg-gray-100'} dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white`}
                                    onClick={() => handleTabClick('mostPlayed')}
                                >
                                    Most Played
                                </a>
                            </li>
                        </ul>
                        <div
                            className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full overflow-y-auto">
                            {renderTabContent()}
                        </div>
                    </div>
                </div>
            </div>);
    }
};

export default Marketplace;