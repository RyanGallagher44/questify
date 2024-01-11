import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import {useAuth} from "./AuthContext";

const OtherProfile = () => {
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(undefined);
    const [primaryColor, setPrimaryColor] = useState("");
    const { id } = useParams();
    const { authToken } = useAuth();

    useEffect(() => {
        async function fetchData () {
            try {
                const { data } = await axios.get(`/auth/account/${id}/${authToken}`);

                const colorUrl = data.profileUsers[0].settings.find(
                    (element) => element.id === "PreferredColor"
                ).value;
                const colorsResponse = await axios.post('/auth/profileColors', { url: colorUrl});
                setPrimaryColor(`#${colorsResponse.data.primaryColor}`);
                const primaryColor = colorsResponse.data.primaryColor;

                console.log(primaryColor);
                setProfileData(data);
                setLoading(false);
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        }

        if (authToken) {
            fetchData();
        }
    }, [authToken, id]);

    if (loading) {
        return(
            <div>Loading...</div>
        );
    } else {
        const profileImageUrl = profileData.profileUsers[0].settings.find(
            (element) => element.id === 'GameDisplayPicRaw'
        ).value;

        const gamertag = profileData.profileUsers[0].settings.find(
            (element) => element.id === 'Gamertag'
        ).value;

        const realName = profileData.profileUsers[0].settings.find(
            (element) => element.id === 'RealName'
        ).value;

        const bio = profileData.profileUsers[0].settings.find(
            (element) => element.id === 'Bio'
        ).value;

        const location = profileData.profileUsers[0].settings.find(
            (element) => element.id === 'Location'
        ).value;

        const gamerscore = profileData.profileUsers[0].settings.find(
            (element) => element.id === 'Gamerscore'
        ).value;

        const accountTier = profileData.profileUsers[0].settings.find(
            (element) => element.id === 'AccountTier'
        ).value;

        return (
            <section
                className="p-4 sm:ml-64 relative pt-16 bg-black flex flex-col items-center"
            >
                <div
                    className="w-72 h-72 mb-4 border-4 rounded-full overflow-hidden"
                    style={{
                        background: `url(${profileImageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderColor: primaryColor
                    }}
                ></div>

                <div className="flex flex-col items-center text-white">
                    <h2 className="text-2xl font-bold mb-2">
                        {gamertag}
                    </h2>
                    <p className="mb-4">
                        {realName}
                    </p>
                </div>

                <div className="flex-grow"></div>

                <div className="text-white">
                    <div className="mb-4">
                        <p className="font-bold">Bio:</p>
                        <p>{profileData?.profileUsers[0]?.settings.find(
                            (element) => element.id === 'Bio'
                        ).value}</p>
                    </div>

                    <div className="mb-4">
                        <p className="font-bold">Location:</p>
                        <p>{profileData?.profileUsers[0]?.settings.find(
                            (element) => element.id === 'Location'
                        ).value}</p>
                    </div>

                    <div className="mb-4">
                        <p className="font-bold">Gamerscore:</p>
                        <p>{profileData?.profileUsers[0]?.settings.find(
                            (element) => element.id === 'Gamerscore'
                        ).value}</p>
                    </div>

                    <div className="mb-4">
                        <p className="font-bold">Account Tier:</p>
                        <p>{profileData?.profileUsers[0]?.settings.find(
                            (element) => element.id === 'AccountTier'
                        ).value}</p>
                    </div>
                </div>
            </section>
        );
    }
};

export default OtherProfile;