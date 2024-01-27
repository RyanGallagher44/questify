import React from "react";
import gamerscoreIcon from "../images/gamerscore.png";
import logo from "../images/questifylogo.png";
import {useAuth} from "./AuthContext";
import Friends from "./Friends";

const Navigation = () => {
    const {authToken, userProfile, clearAuthData} = useAuth();

    return (<aside
        id="logo-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
    >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <div class="flex items-center ps-2.5 mb-5">
                <img
                    src={logo}
                    class="h-12 mr-3 sm:h-12"
                    alt="Flowbite Logo"
                />
                <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                        Questify
                    </span>
            </div>
            <ul class="space-y-2 font-medium">
                <li>
                    <a
                        href="/home"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                        <svg
                            class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 21"
                        >
                            <path
                                d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                            <path
                                d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                        </svg>
                        <span class="ml-3">Home</span>
                    </a>
                </li>
                {!userProfile && (<li>
                    <a
                        href="https://xbl.io/app/auth/8eb21ce2-72c1-f878-9c0a-2fcb135178eb"
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                        <svg
                            class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 16"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                            />
                        </svg>
                        <span class="ml-3 whitespace-nowrap">
                                    Sign In
                                </span>
                    </a>
                </li>)}
                {userProfile && (<li>
                    <a
                        onClick={clearAuthData}
                        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                    >
                        <svg
                            class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 16"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                            />
                        </svg>
                        <span class="ml-3 whitespace-nowrap">
                                    Logout
                                </span>
                    </a>
                </li>)}
            </ul>
            {authToken && userProfile && (<div>
                <ul class="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                    <li>
                        <a
                            href="/me"
                            class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                        >
                            <img
                                src={userProfile.profileUsers[0].settings.find((element) => element.id === "GameDisplayPicRaw").value}
                                class="rounded-lg flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 17 20"
                            />
                            <span class="ml-3">
                                        {userProfile.profileUsers[0].settings.find((element) => element.id === "Gamertag").value}
                                    </span>
                        </a>
                    </li>
                </ul>
                <ul class="space-y-2 font-medium">
                    <li>
                        <div class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white group">
                            <img
                                src={gamerscoreIcon}
                                class="rounded-lg object-cover flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 17 20"
                            />
                            <span class="ml-3">
                                        {userProfile.profileUsers[0].settings.find((element) => element.id === "Gamerscore").value}
                                    </span>
                        </div>
                    </li>
                </ul>
                <div class="flex-grow h-[400px] overflow-y-auto">
                    <Friends/>
                </div>
            </div>)}
        </div>
    </aside>);
};

export default Navigation;
