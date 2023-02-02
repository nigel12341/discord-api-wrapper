<h1 align="center">Welcome to discord-api-wrapper 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/discord-api-wrapper" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/discord-api-wrapper.svg">
  </a>
  <a href="https://github.com/nigel12341/discord-api-wrapper/#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/nigel12341/discord-api-wrapper//graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/nigel12341/discord-api-wrapper//blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/nigel12341/discord-api-wrapper" />
  </a>
</p>

> Interact with the discord API easier.

This is a wrapper for the discord API. It is still in development and not all endpoints are implemented yet. If you want to help, feel free to make a pull request.
Use the methods instead of manually making requests to the API. This will make it easier to use the API and you don't have to worry about the API changes.


### 🏠 [Homepage](https://github.com/nigel12341/discord-api-wrapper/)

### 📝 [Discord OAUTH2 API Documentation](https://discord.com/developers/docs/topics/oauth2)
### 📝 [Discord User API Documentation](https://discord.com/developers/docs/resources/user)
### 📝 [Discord Guild API Documentation](https://discord.com/developers/docs/resources/guild)

## Install

```sh
npm install discord-api-wrapper
```

## Usage

```sh
const discordApiWrapper = require('discord-api-wrapper');
```

### Methods

```js
// Get the access_token from the code you got from the discord oauth2 redirect
exchangeAccessToken(client_id, client_secret, code, redirect_uri)

// Refresh the access_token by using the refresh_token
refreshAccessToken(client_id, client_secret, refresh_token)

// Get the logged in user information using the access_token
getLoggedInUserInformation(access_token)

// Get all the guilds the logged in user is in using the access_token
getCurrentUserGuilds(access_token)

// Get the guild member object for the logged in user for a specific guild using the access_token and guild_id
getCurrentUserGuildMembers(access_token, guild_id)

// Get the guild icon url using the guild_id and icon_hash
// You get the guild icon hash from the getCurrentUserGuilds method and filtering the guilds
// NOTE: Future update to the package will include a method to get a specific guild so you dont have to filter
getGuildIcon(guild_id, icon_hash)

// Get the user avatar url using the user_id and avatar_hash
// You get the avatar hash from the getLoggedInUserInformation method
getAvatar(user_id, avatar_hash)

// Get the basic guild information using the access_token and guild_id
// NOTE you do not get the full guild object, only the basic information because of a discord limitation using the OAUTH2 access_code
getGuildInfo(access_token, guild_id)
```

## Author

👤 **Nigel Christiaans <nigel@nigelchristiaans.nl>**

* Github: [@nigel12341](https://github.com/nigel12341)
* LinkedIn: [@n-christiaans](https://linkedin.com/in/n-christiaans)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/nigel12341/discord-api-wrapper/issues). You can also take a look at the [contributing guide](https://github.com/nigel12341/discord-api-wrapper//blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

Copyright © 2023 [Nigel Christiaans <nigel@nigelchristiaans.nl>](https://github.com/nigel12341).<br />
This project is [MIT](https://github.com/nigel12341/discord-api-wrapper//blob/master/LICENSE) licensed.