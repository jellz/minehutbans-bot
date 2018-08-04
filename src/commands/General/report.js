const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

const run = module.exports.run = async (msg, args) => {
    if (args.length < 2 || args[0].length > 16) {
        msg.delete({ reason: 'invalid report command usage' });
        const m = await client.invalidCommandUsage(msg, meta);
        return m.delete({ timeout: 8000 });
    }

    if (args.slice(1).join(' ').length > 1000) {
        msg.delete({ reason: 'invalid report command usage' });
        const m = await msg.channel.send(client.config.emoji.fail + ' Your report is too long.');
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

    const id = (await r.table('cases').count()) + 1;
    await r.table('cases').insert({
        id,
        type: 'REPORT',
        at: Date.now(),
        subject: json.name,
        reason: args.slice(1).join(' '),
        message: null,
        submittedBy: {
            id: msg.author.id,
            tag: msg.author.tag
        },
        closed: {
            closed: false,
            at: null,
            by: {
                id: null,
                tag: null
            },
            reason: null
        }
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

    await r.table('cases').get(id).update({ message: reportMessage.id });

    const m = await msg.channel.send(client.config.emoji.success);
    return m.delete({ timeout: 5000 });
}

const meta = module.exports.meta = {
    aliases: ['report'],
    ownerOnly: false,
    description: 'Report a player',
    usage: '<player> <evidence + offence>'
}