const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'welcome',
    execute(member) {
        const channel = member.guild.channels.cache.find(channel => channel.name === 'welcome-masbro');
        if (!channel) return;

        const welcomeEmbed = new EmbedBuilder()
            .setColor('#00FF00') 
            .setTitle('🎉 Selamat Datang! 🎉')
            .setDescription(`Selamat datang di server, ${member}!`)
            .addFields(
                { name: '👋 Perkenalan', value: 'Kami harap kamu merasa betah di sini! Jangan ragu untuk memperkenalkan diri.' },
                { name: '📜 Aturan', value: 'Aturanya kamu sopan kami segan' },
                { name: '💬 Chat', value: 'Selamat bergabung, mari main bersama' }
            )
            .setTimestamp()
            .setFooter({ text: 'Kami senang kamu ada di sini!' });

        channel.send({ embeds: [welcomeEmbed] });
    },
};
