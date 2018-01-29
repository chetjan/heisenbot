const Discord = require('discord.js');
const Auth = require('./auth.json');

const client = new Discord.Client();

client.on('ready', () => {
  console.log('I am ready!');
});
 
client.on('message', message => {
    if (message.content.substring(0,3) === '!h ') {
        var args = message.content.substring(3).split(' ');
        var cmd = args[0];
        args = args.splice(1);

        if (cmd === 'ping') {
            message.reply('pong');
        }

        if (cmd === 'rustle' && args[0] === 'ostentatiously') {
            var voiceChannel = message.member.voiceChannel;
            if (!voiceChannel) {
                message.reply('Sorry, you are not in a voice channel.');
                return;
            }

            voiceChannel.join()
                .then(connection => {
                    const dispatcher = connection.playFile('./sounds/RustlingPaper.mp3');
                    dispatcher.on('end', end => {
                        voiceChannel.leave();
                    });
                })
                .catch(console.error);
        }
    }
});

client.login(Auth.token);
