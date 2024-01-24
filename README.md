<p align="center">
  <img src="https://media.discordapp.net/attachments/774290264764055582/1093484780525469757/A_banner_for_a_discord_bots_template_made_using_discord.js.png" height="200" width="400"><br>
  <img src="https://img.shields.io/badge/version-1.0.0-05122A?style=for-the-badge">
  <a href="https://discord.gg/VStdRr8nP2"><img src="https://img.shields.io/badge/discord-invite-5865f2?style=for-the-badge&logo=discord&logoColor=white"></a>
  <img src="https://img.shields.io/github/issues/RileCraft/DiscordBot-Template-ts.svg?style=for-the-badge">
  <img src="https://img.shields.io/github/forks/RileCraft/DiscordBot-Template-ts.svg?style=for-the-badge">
  <img src="https://img.shields.io/github/stars/RileCraft/DiscordBot-Template-ts.svg?style=for-the-badge">
</p>

# Discord Bot Template TS

The Discord Bot Template provides a solid foundation for creating feature-rich Discord bots using Discord.js. It includes various managers for handling message commands, buttons, select menus, slash commands, context menus, and modal forms. The template offers customization options, colorful logging, and a simple code structure.

## Changelog

- Latest Discord.js adaptation.
- Following JavaScript Naming Convention.
- Removed `node-recursive-directory` dependency.
- Converted from `CommonJS` to `ESM Module`.
- Improved handling of all events, commands with lower memory usage.
- Main file `Bot.ts` has been shifted to `Src`.
- Config file has been shifted to `Src`.
- Moved from `Collections` to `Map`.
- `messageCommandsAliases` has been renamed to `messageCommands_Aliases`
- `Quick.DB` has been removed and instead all cooldowns data will be now stored in `CooldownDB.txt` in the root directory using `fs`.
- Refactored command options.
- `chalk` has been replaced with `tasai`.
- Extended all command options support to interactions.
- All custom types and interfaces are exported from `./Src/Types.ts`.
- `SlashCommands` and `ContextMenus` has been seperated into different folders and managed differently.
- `SlashCommands` have been simplified as now instead of `Guilds/<GuildID>/<Files Here>`, you can use `guilds: ["GUILD ID"]` property to easier manage your code and `type` property is not required as the handlers automatically assigns the `ChatInput` type.

## Documentation

For detailed documentation on command options and managers, please refer to the following links:

### Command Options

- [ReturnErrors](/.github/Docs/CMDOptions/ReturnErrors.md)
- [Ignore](/.github/Docs/CMDOptions/Ignore.md)
- [AllClientPermissions](/.github/Docs/CMDOptions/AllClientPermissions.md)
- [AllowBots](/.github/Docs/CMDOptions/AllowBots.md)
- [AllowInDms](/.github/Docs/CMDOptions/AllowInDms.md)
- [AllUserPermissions](/.github/Docs/CMDOptions/AllUserPermissions.md)
- [AnyClientPermissions](/.github/Docs/CMDOptions/AnyClientPermissions.md)
- [AnyUserPermissions](/.github/Docs/CMDOptions/AnyUserPermissions.md)
- [ChannelCooldown](/.github/Docs/CMDOptions/ChannelCooldown.md)
- [GlobalCooldown](/.github/Docs/CMDOptions/GlobalCooldown.md)
- [GuildCooldown](/.github/Docs/CMDOptions/GuildCooldown.md)
- [OnlyChannels](/.github/Docs/CMDOptions/OnlyChannels.md)
- [OnlyGuilds](/.github/Docs/CMDOptions/OnlyGuilds.md)
- [OnlyRoles](/.github/Docs/CMDOptions/OnlyRoles.md)
- [OnlyUsers](/.github/Docs/CMDOptions/OnlyUsers.md)
- [OwnerOnly](/.github/Docs/CMDOptions/OwnerOnly.md)

### Managers

- [MessageCommands](/.github/Docs/Managers/MessageCommands.md)
- [SelectMenus](/.github/Docs/Managers/SelectMenus.md)
- [Buttons](/.github/Docs/Managers/Buttons.md)
- [Events](/.github/Docs/Managers/Events.md)
- [SlashCommands](/.github/Docs/Managers/SlashCommands.md)
- [ModalForms](/.github/Docs/Managers/ModalForms.md)

## Features

- Colorful and organized logging.
- Customization options to suit your needs.
- Supports management of message commands, buttons, select menus, slash commands, context menus, and modal forms.
- Includes a variety of commonly used command options (not applicable to events).
- Supports management of custom events.
- Simple and understandable code structure.

## Notes

- Recommended Node.js version: 16 and above.
- Global slash commands and context menus may take time to refresh as it is controlled by Discord.
- Guild commands may take time to refresh if there are a large number of different guild commands.
- Collections where command and event data is stored and used:
  - `<Client>.messageCommands`: Message commands cache
  - `<Client>.messageCommands_Aliases`: Message command aliases cache
  - `<Client>.events`: Client events cache
  - `<Client>.buttonCommands`: Button interactions cache
  - `<Client>.selectMenus`: Select menu interactions cache
  - `<Client>.modalForms`: Modal form interactions cache
  - `<Client>.slashCommands`: Slash commands cache
  - `<Client>.contextMenus`: ContextMenus commands cache

## Installation

To get started with the Discord Bot Template, follow these steps:

1. Clone the repository by downloading it as a ZIP file or running the command `git clone https://github.com/rilecraft/discordbot-template-ts`.
2. Navigate to the template's directory and run the command `npm install` (make sure npm is installed).
3. Once all the required modules are installed, open the `Src/Config.ts` file and fill in the necessary information.
4. Run the command `npm run build && npm run start` to start the bot.

## Contribution

Contributions to the Discord Bot Template are welcome. To contribute, please follow these guidelines:

1. Fork the `Unstable` branch. **Important: All changes must be made to the Unstable branch.**
2. Make your changes in your forked repository.
3. Open a pull request to the `Unstable` branch, and it will be reviewed promptly.
4. If everything checks out, the pull request will be merged.
