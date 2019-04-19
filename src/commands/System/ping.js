exports.run = async (msg, args) => {
  let m = await msg.channel.send('🏓 Ping?');
  m.edit(`🏓 **Pong!** (Roundtrip: ${m.createdTimestamp - msg.createdTimestamp}ms | One-way: ${~~client.ping}ms)`);
}

exports.meta = {
  aliases: ['ping', 'pong'],
  ownerOnly: false,
  description: 'Ping, pong!',
  usage: ''
}