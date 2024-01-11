import React, { useEffect, useState } from "react";
import axios from "axios";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {useAuth} from "./AuthContext";
TimeAgo.addDefaultLocale(en);

const Profile = () => {
    const [recentlyPlayed, setRecentlyPlayed] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const timeAgo = new TimeAgo("en-US");
    const { authToken } = useAuth();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(
                    `/auth/account/recentlyPlayed/${authToken}`
                );
                setRecentlyPlayed(data.titles);
                console.log(data.titles.slice(0, 10));
                setLoading(false);
            } catch (e) {
                setLoading(false);
                console.log(e);
            }
        }

        if (authToken) {
            fetchData();
        }
    }, [authToken]);

    if (loading) {
        <div>Loading...</div>;
    } else {
        return (
            <div>
                <div className="p-4 sm:ml-64 relative pt-16 bg-prim-black">
                    <h2 className="text-white font-bold text-left mb-4 text-2xl">Recently Played</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {recentlyPlayed.map((game) => (
                            <div
                                key={game.titleId}
                                className="relative group overflow-hidden rounded-lg"
                            >
                                <img
                                    src={game.displayImage}
                                    alt={`Image ${game.titleId}`}
                                    className="object-cover w-full h-full transition-transform transform scale-100 group-hover:scale-105 rounded-lg"
                                />
                                <div
                                    className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-50">
                                    <p className="text-white text-lg font-bold">
                                        {game.name}
                                    </p>
                                    <p className="text-white text-sm">
                                        {game.achievement.progressPercentage}%
                                    </p>
                                    <p className="text-white text-sm">
                                        {timeAgo.format(
                                            new Date(
                                                game.titleHistory.lastTimePlayed
                                            )
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
};

export default Profile;
