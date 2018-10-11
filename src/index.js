const { Client, MessageEmbed } = require('discord.js');
const client = new Client({ disableEveryone: true });
const config = require('../config.js');
client.login(config.token);

const r = require('rethinkdbdash')({ db: 'minehutbans' });

require('./modules/eventModule.js')();
client.config = config;

/**
 * 
 * @param {Message} msg The command message
 * @param {Object} meta The command meta
 */
client.invalidCommandUsage = async (msg, meta) => {
  return msg.channel.send(new MessageEmbed().setDescription([
    '**Invalid usage!** Try this instead...',
    '```',
    `${client.config.prefix}${meta.aliases[0]} ${meta.usage}`,
    '```'
  ].join('\n')).setColor('RED'));
}

global.client = client;
global.r = r;