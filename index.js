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
        return response.status + " " + response.statusText;
    }
}

/**
 * Get the guilds of the authorized user
 * @param access_token
 * @returns {Promise<List|any>}
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
        return response.status + " " + response.statusText;
    }
}


module.exports = {
    exchangeAccessToken: exchangeAccessToken,
    refreshAccessToken: refreshAccessToken,
    getLoggedInUserInformation: getLoggedInUserInformation,
    getCurrentUserGuilds: getCurrentUserGuilds
};