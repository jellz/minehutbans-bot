module.exports = async (msg) => {
  if (msg.author.bot || !msg.guild) return;

  /* If command intent, call the command module. */
  if (msg.content.toLowerCase().trim().startsWith(process.env.DISCORD_PREFIX)) {
    await require('../modules/commandModule.js')(msg);
  }

  /* Do other stuff here */
}
