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
 * Get the connections of the logged-in user
 * @param access_token
 * @returns {Promise<Array|string>}
 */
async function getLoggedInUserConnections(access_token) {
    const response = await fetch('https://discord.com/api/users/@me/connections', {
        headers: {
            authorization: `Bearer ${access_token}`,
        },
    });
    if (response.ok) {
        return await response.json();
    } else {
        console.error("getLoggedInUserConnections api request failed: " + response.status + " " + response.statusText +
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

async function getGuildInfo(access_token, guild_id) {
    const userGuildsArray = await getCurrentUserGuilds(access_token)
    if(userGuildsArray instanceof Array){
        const guild = userGuildsArray.find((guild) => guild.id === guild_id);
        if(guild){
            return guild;
        } else {
            return "Error: getGuildInfo did not find the guild in the array that matches the provided id!\n Your ID is probably invalid. Please check it.";
        }

    } else {
        return "Error: getCurrentUserGuilds did not return an array so something went wrong!";
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

/**
 * Get the full guild object ofa guild by its id
 * You need to provide a bot token for this to work and the bot has to be in the server you are trying to fetch
 * @NOTE This is a bot only endpoint!
 * @param guild_id
 * @param bot_token
 * @returns {Promise<Object|String>}
 * @constructor
 */
async function getGuildById(guild_id, bot_token) {
    let response = await fetch(`https://discord.com/api/guilds/${guild_id}`, {
        headers: {
            authorization: `Bot ${bot_token}`,
        }
    });
    response = await response.json();

    if(response instanceof Object){
        return response;
    }

    if(response.message.includes("401: Unauthorized")) {
        return "Error: The bot token you provided is invalid. Please check it.";
    } else if (response.message.includes("Unknown Guild")) {
        return "Error: The guild id you provided is invalid or the bot is not in that guild. Please check it.";
    } else {
        return "Unknown Error: " + response.message;
    }
}

/**
 * Join the OAUTH2 user to a guild by their user id
 * If join is successful it will return a server member object
 * If the user is already in the guild it will return User is already in the guild!
 * @note This is a bot only endpoint!
 * @note The bot has to be in the guild you are trying to join and has to have create instant invite permissions
 * @param bot_token
 * @param user_id
 * @param guild_id
 * @param access_token
 * @param nick (optional)
 * @returns {Promise<Object|string>}
 */
async function joinGuildByUserId(bot_token, user_id, guild_id, access_token, nick) {
    if(!nick){
        nick = null;
    }
    let response = await fetch(`https://discord.com/api/guilds/${guild_id}/members/${user_id}`, {
        method: "PUT",
        headers: {
            authorization: `Bot ${bot_token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            access_token: access_token,
            nick: nick
        }),
    });
    if(response.status === 201){
        return await response.json();
    } else if (response.status === 204) {
        return "User is already in the guild!";
    } else {
        return "Error: " + response.status + " " + response.statusText;
    }

}

/**
 * Returns an array of voice region objects that can be used when setting a voice or stage channel's rtc_region.
 * @param bot_token
 * @returns {Promise<Array|string>}
 * @see https://discord.com/developers/docs/resources/voice#list-voice-regions
 */
async function listVoiceRegions(bot_token) {
    const response = await fetch("https://discord.com/api/voice/regions", {
        headers: {
            authorization: `Bot ${bot_token}`,
        }
    });

    if(response.ok){
        return await response.json();
    } else {
        return "Error: " + response.status + " " + response.statusText;
    }
}

/**
 * Creates a new webhook and returns a webhook object on success. Requires the MANAGE_WEBHOOKS permission.
 * @note This is a bot only endpoint!
 * @note An error will be returned if a webhook name (name) is not valid. A webhook name is valid if:
 *       It does not contain the substring 'clyde' (case-insensitive)
 *       It follows the nickname guidelines in the Usernames and Nicknames documentation, with an exception that webhook names can be up to 80 characters
 * @param bot_token
 * @param channel_id
 * @param name
 * @param reason
 * @returns {Promise<Object|string>}
 */
async function createWebhook(bot_token, channel_id, name, reason) {
    if(!reason){
        reason = "No reason provided";
    }
    const response = await fetch(`https://discord.com/api/channels/${channel_id}/webhooks`, {
        method: "POST",
        headers: {
            authorization: `Bot ${bot_token}`,
            "Content-Type": "application/json",
            "X-Audit-Log-Reason": reason
        },
        body: JSON.stringify({
            name: name
        })
    });

    if(response.ok){
        return await response.json();
    } else {
        return "Error: " + response.status + " " + response.statusText;
    }
}

/**
 * @description Returns a list of channel webhook objects. Requires the MANAGE_WEBHOOKS permission.
 * @note This is a bot only endpoint!
 * @note If no webhooks are found, an empty array is returned.
 * @param bot_token
 * @param channel_id
 * @returns {Promise<Array|string>}
 */
async function getChannelWebhooks(bot_token, channel_id) {
    const response = await fetch(`https://discord.com/api/channels/${channel_id}/webhooks`, {
        headers: {
            authorization: `Bot ${bot_token}`,
        }
    });

    if(response.ok){
        return await response.json();
    } else {
        return "Error: " + response.status + " " + response.statusText;
    }
}

async function getGuildWebhooks(bot_token, guild_id) {
    const response = await fetch(`https://discord.com/api/guilds/${guild_id}/webhooks`, {
        headers: {
            authorization: `Bot ${bot_token}`,
        }
    });

    if(response.ok){
        return await response.json();
    } else {
        return "Error: " + response.status + " " + response.statusText;
    }
}

module.exports = {
    exchangeAccessToken: exchangeAccessToken,
    refreshAccessToken: refreshAccessToken,
    getLoggedInUserInformation: getLoggedInUserInformation,
    getCurrentUserGuilds: getCurrentUserGuilds,
    getCurrentUserGuildMembers: getCurrentUserGuildMembers,
    getGuildIcon: getGuildIcon,
    getAvatar: getAvatar,
    getGuildInfo: getGuildInfo,
    getLoggedInUserConnections: getLoggedInUserConnections,
    getGuildById: getGuildById,
    joinGuildByUserId: joinGuildByUserId,
    listVoiceRegions: listVoiceRegions,
    createWebhook: createWebhook,
    getChannelWebhooks: getChannelWebhooks,
    getGuildWebhooks: getGuildWebhooks
};