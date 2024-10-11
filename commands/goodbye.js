const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'goodbye',
    execute(member) {
        const channel = member.guild.channels.cache.find(channel => channel.name === 'welcome-masbro');
        if (!channel) return;

        const goodbyeEmbed = new EmbedBuilder()
            .setColor('#FF0000') // Warna merah
            .setTitle('👋 Selamat Tinggal!')
            .setDescription(`Selamat tinggal, ${member}!`)
            .addFields(
                { name: '😢 Kami akan merindukanmu!', value: 'Kami harap kamu kembali lagi!' }
            )
            .setTimestamp()
            .setFooter({ text: 'Sampai jumpa lagi!' });

        channel.send({ embeds: [goodbyeEmbed] });
    },
};
