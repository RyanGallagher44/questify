import axios from "axios";
import React, { useState, useEffect } from "react";
import {useAuth} from "./AuthContext";

const Friends = () => {
    const [loading, setLoading] = useState(true);
    const [friendsData, setFriendsData] = useState(undefined);
    const { authToken } = useAuth();

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get(
                    `/auth/account/friends/${authToken}`
                );
                console.log(data);
                setFriendsData(data.people);
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

    if (loading) {
        return <div>Loading...</div>;
    } else {
        // Sorting friendsData by presenceState ("Online" first, "Offline" second)
        const sortedFriends = friendsData.sort((friendA, friendB) => {
            const presenceOrder = {
                Online: 0,
                Offline: 1,
            };
            return (
                presenceOrder[friendA.presenceState] -
                presenceOrder[friendB.presenceState] ||
                friendA.displayName.localeCompare(friendB.displayName)
            );
        });

        return (
            <div>
                <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                    {sortedFriends.map((friend) => (
                        <li key={friend.xuid}>
                            <a
                                href={`/profile/${friend.xuid}`}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <img
                                    src={friend.displayPicRaw}
                                    className="rounded-lg flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    alt="friend-avatar"
                                />
                                <span className="ml-3">
                                    {friend.displayName}
                                </span>
                                <span
                                    className={`w-3 h-3 rounded-full ${
                                        friend.presenceState === "Online"
                                            ? "bg-green-500 animate-glow"
                                            : "bg-gray-500"
                                    } ml-3`}
                                ></span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default Friends;
