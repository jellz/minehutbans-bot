require('dotenv').config();

const { Client, MessageEmbed } = require('discord.js');
const client = new Client({ disableEveryone: true });
client.login(process.env.DISCORD_TOKEN);

const r = require('rethinkdbdash')({ db: process.env.DATABASE_NAME });

require('./modules/eventModule.js')();

/**
 * 
 * @param {Message} msg The command message
 * @param {Object} meta The command meta
 */
client.invalidCommandUsage = async (msg, meta) => {
  let m = await msg.channel.send(new MessageEmbed().setDescription([
    '**Invalid usage!** Try this instead...',
    '```',
    `${process.env.DISCORD_PREFIX}${meta.aliases[0]} ${meta.usage}`,
    '```'
  ].join('\n')).setColor('RED'));
  return m;
}

global.client = client;
global.r = r;