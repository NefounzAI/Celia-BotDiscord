const { EmbedBuilder } = require('discord.js'); 

module.exports = {
    name: 'ping',
    description: 'Menampilkan sinyal (latensi) dari bot.',
    async execute(message, args, client) {
        const sentMessage = await message.channel.send('Menghitung latensi...');

        const latency = sentMessage.createdTimestamp - message.createdTimestamp;
        const apiLatency = Math.round(client.ws.ping); 

        const embed = new EmbedBuilder()
            .setColor('#14e9d6')
            .setTitle('🏓 Pong!')
            .setDescription(`Latensi: **${latency}ms**\nLatensi API: **${apiLatency}ms**`)
            .setFooter({ text: 'Nikmati! 💖' })
            .setTimestamp(); 

        await message.channel.send({ embeds: [embed] });
    }
};
