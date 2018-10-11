const run = module.exports = async () => {
  console.log('Logged in as ' + client.user.tag + '!');
  client.user.setActivity(client.config.activity || `with ${client.users.size} users.`);
  require('../modules/reminderModule.js')();
}
