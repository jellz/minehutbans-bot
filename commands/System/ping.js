const run = module.exports.run = async (msg, args) => {
    const m = await msg.channel.send('🏓 Ping?');
    m.edit(`🏓 **Pong!** (Roundtrip: ${m.createdTimestamp - msg.createdTimestamp}ms | One-way: ${~~client.ping}ms)`);
}

const meta = module.exports.meta = {
    aliases: ['ping', 'pong'],
    ownerOnly: false,
    description: 'Ping, pong!',
    usage: ''
}