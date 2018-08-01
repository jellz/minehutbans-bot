const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

const run = module.exports.run = async (msg, args) => {
    if (args.length < 2 || args[0].length > 16) {
        msg.delete({ reason: 'invalid report command usage' });
        const m = await client.invalidCommandUsage(msg, meta);
        return m.delete({ timeout: 5000 });
    }

    const uuidRes = await fetch('https://api.mojang.com/users/profiles/minecraft/' + args[0]);
    if (uuidRes.status == 204) { // not a real player
        msg.delete({ reason: 'invalid report command usage' });
        const m = await msg.channel.send(client.config.emoji.fail + ' The player you have specified is not real.');
        return m.delete({ timeout: 5000 });
    }
    const json = await uuidRes.json();
    
    msg.delete({ reason: 'valid report command usage' });

    const id = (await r.table('reports').count().run()) + (await r.table('appeals').count().run()) + 1;
    await r.table('reports').insert({
        id,
        offender: json.name,
        reporter: {
            id: msg.author.id,
            tag: msg.author.tag
        },
        offence: args.slice(1).join(' '),
        submittedAt: Date.now(),
        closedAt: null,
        closedBy: {
            id: null,
            tag: null
        },
        messageId: null
    }).run();

    const channel = client.channels.get(client.config.channels.report);
    const embed = new MessageEmbed();

    embed.setTitle(json.name);
    embed.setDescription(`A report was filed for **${json.name}** by **${msg.author.tag}**.\nStaff can use **\`!close ${id} <reason>\`** to close this report.`);
    embed.setColor('GREEN');
    embed.addField('Report reason', args.slice(1).join(' '), true);
    embed.setThumbnail(`https://visage.surgeplay.com/full/${json.id}?tilt=0`);
    embed.setTimestamp();
    embed.setFooter(`Case #${id}`);

    const reportMessage = await channel.send(embed);

    await r.table('reports').get(id).update({ messageId: reportMessage.id });

    const m = await msg.channel.send(client.config.emoji.success);
    return m.delete({ timeout: 5000 });
}

const meta = module.exports.meta = {
    aliases: ['report'],
    ownerOnly: false,
    description: 'Report a player',
    usage: '<player> <evidence + offence>'
}