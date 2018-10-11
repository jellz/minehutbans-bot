const run = module.exports.run = async (msg, args) => {
  let m = await msg.channel.send('🏓 Ping?');
  m.edit(`🏓 **Pong!** (Roundtrip: ${m.createdTimestamp - msg.createdTimestamp}ms | One-way: ${~~client.ping}ms)`);
  m.delete({ timeout: 10000 });
  msg.delete();
}

const meta = module.exports.meta = {
  aliases: ['ping', 'pong'],
  ownerOnly: false,
  description: 'Ping, pong!',
  usage: ''
}