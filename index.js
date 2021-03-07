const Discord = require('discord.js');
const mc = require('minepm')
const client = new Discord.Client();
const prefix = '!';
const { ip, status_id, player_id, server_name } = require('./config.json')

client.on('message', (message) => { 
    if (message.content === prefix + 'ping') {
        message.channel.send(':ping_pong: pong!');
    }
});

client.on('ready', async () => { 
    console.log(`${client.user.username} est en ligne !`);
        const stats = client.channels.cache.get(status_id)
        const player = client.channels.cache.get(player_id)
        const res = await mc.ping(ip);
        setInterval(() => {
        client.user.setActivity(`${server_name} avec ${res.players.online} joueurs`, {type: 'WATCHING'});
            if(res.other.players === 'online') {
                stats.setName('🔓 • Status: En ligne')
            } else {
                stats.setName('🔒 • Status: Hors ligne')
            }
        player.setName(`👤 • Joueur: ${res.players.online}`)
        }, 5000);
});

client.login('DISCORD_TOKEN');
