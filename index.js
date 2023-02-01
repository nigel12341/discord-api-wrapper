/**
 * Function to exchange the authorization code for an access token using the authorization code grant
 * @param client_id
 * @param client_secret
 * @param code
 * @param redirect_uri
 * @returns {Promise<object|null>}
 * @see https://discord.com/developers/docs/topics/oauth2#authorization-code-grant
 */
async function exchangeAccessToken(client_id, client_secret, code, redirect_uri) {
    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: client_id,
            client_secret: client_secret,
            code: code,
            grant_type: 'authorization_code',
            redirect_uri: redirect_uri,
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        console.error("exchangeAccessToken api request failed: " + response.status + " " + response.statusText +
        "\nThis is probably because your access token is invalid. Try to refresh it.");
        return response.status + " " + response.statusText;
    }
}

/**
 * Refresh the access token using the refresh token
 * @param client_id
 * @param client_secret
 * @param refresh_token
 * @returns {Promise<object|null>}
 * @see https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-refresh-token-exchange-example
 */
async function refreshAccessToken(client_id, client_secret, refresh_token) {
    const response = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: client_id,
            client_secret: client_secret,
            grant_type: 'refresh_token',
            refresh_token: refresh_token,
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        console.error("refreshAccessToken api request failed: " + response.status + " " + response.statusText +
            "\nThis is probably because your access token is invalid. Try to refresh it.");
        return response.status + " " + response.statusText;
    }
}

/**
 * Get information about the logged in user
 * @param access_token
 * @returns {Promise<object|null>}
 * @see https://discord.com/developers/docs/resources/user#get-current-user
 */
async function getLoggedInUserInformation(access_token) {
    const response = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `Bearer ${access_token}`,
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        console.error("getLoggedInUserInformation api request failed: " + response.status + " " + response.statusText +
            "\nThis is probably because your access token is invalid. Try to refresh it.");
        return response.status + " " + response.statusText;
    }
}

/**
 * Get the guilds of the authorized user
 * @param access_token
 * @returns {Promise<Array|any>}
 */
async function getCurrentUserGuilds(access_token) {
    const response = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: {
            authorization: `Bearer ${access_token}`,
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        console.error("getCurrentUserGuilds api request failed: " + response.status + " " + response.statusText +
            "\nThis is probably because your access token is invalid. Try to refresh it.");
        return response.status + " " + response.statusText;
    }
}

/**
 * Get the guild member object of the authorized user for a specific server
 * @param access_token
 * @param guild_id
 * @returns {Promise<Object|string>}
 */
async function getCurrentUserGuildMembers(access_token, guild_id) {
    const response = await fetch(`https://discord.com/api/users/@me/guilds/${guild_id}/member`, {
        headers: {
            authorization: `Bearer ${access_token}`,
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        console.error("getCurrentUserGuildMembers api request failed: " + response.status + " " + response.statusText +
            "\nThis is probably because your access token is invalid. Try to refresh it.");
        return response.status + " " + response.statusText;
    }
}

/**
 * Get the icon url of a guild from its icon hash
 * @param guild_id
 * @param icon_hash
 * @returns {Promise<string>}
 * @see https://discord.com/developers/docs/reference#image-formatting
 */
async function getGuildIcon(guild_id, icon_hash) {
    const response = await fetch(`https://cdn.discordapp.com/icons/${guild_id}/${icon_hash}.png`);
    if (response.ok) {
        return response.url;
    } else{
        console.error("getGuildIcon api request failed: " + response.status + " " + response.statusText +
            "\nThis is probably because the guildID or iconHash is invalid.");
        return response.status + " " + response.statusText;
    }
}

/**
 * Get the avatar url of a user from its avatar hash
 * @param user_id
 * @param avatar_hash
 * @returns {Promise<string>}
 * @see https://discord.com/developers/docs/reference#image-formatting
 */
async function getAvatar(user_id, avatar_hash) {
    const response = await fetch(`https://cdn.discordapp.com/avatars/${user_id}/${avatar_hash}.png`);
    if (response.ok) {
        return response.url;
    } else{
        console.error("getAvatar api request failed: " + response.status + " " + response.statusText +
            "\nThis is probably because the user_id or avatar_hash is invalid.");
        return response.status + " " + response.statusText;
    }
}


module.exports = {
    exchangeAccessToken: exchangeAccessToken,
    refreshAccessToken: refreshAccessToken,
    getLoggedInUserInformation: getLoggedInUserInformation,
    getCurrentUserGuilds: getCurrentUserGuilds,
    getCurrentUserGuildMembers: getCurrentUserGuildMembers,
    getGuildIcon: getGuildIcon,
    getAvatar: getAvatar
};