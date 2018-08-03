# reportbot

Manage Minecraft reports in Discord, easily.

## Usage

> reportbot acts invisible to your players. You don't to create any additional channels to accomodate reportbot. Players can simply use the report command in any channel, and reportbot will give feedback and delete the message after a few seconds.

> reportbot utilizes many different Discord permissions. I recommend just giving reportbot Administrator privileges, as not even I know all the permissions reportbot needs.

There are multiple ways to use reportbot. 
- If you have a separate Discord server for your Staff, you could add the bot there and your main server - then set the report channel config option to a channel in your Staff server.
- If you only use one Discord server for all your operations, reportbot supports that too. Just set the report channel to a channel in your main server.

## Prerequisites

- A server to host the bot (Tested with Ubuntu 16.04)
- A Discord server + bot user
- RethinkDB running locally, on default host settings
- Node.js 8.9.4 or higher

## Installation

- Clone the repository.
- Install dependencies (`npm install` or `yarn`).
- Create a Rethink database called **`reportbot`**.
- Rename `config.js.example` to `config.js`, and populate the required fields.
- Start the bot (`node .` or with PM2 `pm2 start index.js --name="reportbot"`).

## Contributing

If you have any ideas or suggestions, [tell me here!](https://github.com/jellz/reportbot/issues)  
If you encounter any bugs, [tell me here!](https://github.com/jellz/reportbot/issues)   
If you appreciate my work, let me know by [starring the repo <3](https://github.com/jellz/reportbot/stargazers)

I am also accepting Pull Requests [here.](https://github.com/jellz/reportbot/pulls)