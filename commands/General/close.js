const run = module.exports.run = async (msg, args) => {
    if (args.length < 2) return await client.invalidCommandUsage(msg, meta);
    // close the case here
}

const meta = module.exports.meta = {
    aliases: ['close', 'mark'],
    ownerOnly: false,
    description: 'Close a case',
    usage: '<id> <reason>'
}